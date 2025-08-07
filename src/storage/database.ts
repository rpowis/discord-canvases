import sqlite3 from 'sqlite3';
import { DatabaseConfig } from '../../config/config';

/**
 * Database connection and initialization
 */
export class Database {
  private db: sqlite3.Database | null = null;
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  /**
   * Initialize database connection and create tables
   */
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.config.path, (err) => {
        if (err) {
          reject(new Error(`Failed to connect to database: ${err.message}`));
          return;
        }

        console.log('✅ Connected to SQLite database');
        
        // Enable foreign keys
        this.db!.run('PRAGMA foreign_keys = ON', (err) => {
          if (err) {
            console.warn('⚠️ Failed to enable foreign keys:', err.message);
          }
        });

        // Create tables
        this.createTables()
          .then(() => {
            console.log('✅ Database tables initialized');
            resolve();
          })
          .catch(reject);
      });
    });
  }

  /**
   * Create database tables
   */
  private async createTables(): Promise<void> {
    const tables = [
      // Canvases table
      `CREATE TABLE IF NOT EXISTS canvases (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_by TEXT NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        last_edited_by TEXT,
        last_edited_at DATETIME
      )`,

      // Edit sessions table
      `CREATE TABLE IF NOT EXISTS edit_sessions (
        id TEXT PRIMARY KEY,
        canvas_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        status TEXT NOT NULL,
        started_at DATETIME NOT NULL,
        last_activity_at DATETIME NOT NULL,
        expires_at DATETIME NOT NULL,
        FOREIGN KEY (canvas_id) REFERENCES canvases (id) ON DELETE CASCADE
      )`,

      // Indexes for better performance
      `CREATE INDEX IF NOT EXISTS idx_canvases_created_by ON canvases (created_by)`,
      `CREATE INDEX IF NOT EXISTS idx_canvases_updated_at ON canvases (updated_at)`,
      `CREATE INDEX IF NOT EXISTS idx_edit_sessions_canvas_id ON edit_sessions (canvas_id)`,
      `CREATE INDEX IF NOT EXISTS idx_edit_sessions_user_id ON edit_sessions (user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_edit_sessions_status ON edit_sessions (status)`,
    ];

    for (const table of tables) {
      await this.run(table);
    }
  }

  /**
   * Execute a query with parameters
   */
  async run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  /**
   * Execute a query and return a single row
   */
  async get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as T);
        }
      });
    });
  }

  /**
   * Execute a query and return all rows
   */
  async all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  /**
   * Begin a transaction
   */
  async beginTransaction(): Promise<void> {
    await this.run('BEGIN TRANSACTION');
  }

  /**
   * Commit a transaction
   */
  async commitTransaction(): Promise<void> {
    await this.run('COMMIT');
  }

  /**
   * Rollback a transaction
   */
  async rollbackTransaction(): Promise<void> {
    await this.run('ROLLBACK');
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Database connection closed');
          this.db = null;
          resolve();
        }
      });
    });
  }

  /**
   * Get database instance (for direct access if needed)
   */
  getDatabase(): sqlite3.Database | null {
    return this.db;
  }

  /**
   * Check if database is connected
   */
  isConnected(): boolean {
    return this.db !== null;
  }
}

/**
 * Database singleton instance
 */
let databaseInstance: Database | null = null;

/**
 * Get or create database instance
 */
export function getDatabase(config: DatabaseConfig): Database {
  if (!databaseInstance) {
    databaseInstance = new Database(config);
  }
  return databaseInstance;
}

/**
 * Initialize database singleton
 */
export async function initializeDatabase(config: DatabaseConfig): Promise<Database> {
  const db = getDatabase(config);
  await db.initialize();
  return db;
}

/**
 * Close database singleton
 */
export async function closeDatabase(): Promise<void> {
  if (databaseInstance) {
    await databaseInstance.close();
    databaseInstance = null;
  }
} 
import 'dotenv/config';

/**
 * Configuration interfaces for Discord Canvases Bot
 */
export interface DiscordConfig {
  token: string;
  clientId: string;
}

export interface DatabaseConfig {
  path: string;
}

export interface CanvasConfig {
  editTimeoutMinutes: number;
  autoSaveIntervalSeconds: number;
  maxContentLength: number;
  contentPreviewLength: number;
  titleMinLength: number;
  titleMaxLength: number;
}

export interface AppConfig {
  nodeEnv: string;
  logLevel: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export interface Config {
  discord: DiscordConfig;
  database: DatabaseConfig;
  canvas: CanvasConfig;
  app: AppConfig;
}

/**
 * Configuration object with environment variables
 */
const config: Config = {
  // Discord Configuration
  discord: {
    token: process.env.DISCORD_TOKEN || '',
    clientId: process.env.DISCORD_CLIENT_ID || '',
  },

  // Database Configuration
  database: {
    path: process.env.DATABASE_PATH || './data/canvases.db',
  },

  // Canvas Configuration
  canvas: {
    editTimeoutMinutes: parseInt(process.env.EDIT_TIMEOUT_MINUTES || '10'),
    autoSaveIntervalSeconds: parseInt(process.env.AUTO_SAVE_INTERVAL_SECONDS || '30'),
    maxContentLength: parseInt(process.env.MAX_CONTENT_LENGTH || '10000'),
    contentPreviewLength: parseInt(process.env.CONTENT_PREVIEW_LENGTH || '200'),
    
    // Title validation
    titleMinLength: 3,
    titleMaxLength: 100,
  },

  // Application Configuration
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
};

/**
 * Validates required configuration values
 * @throws {Error} If required configuration is missing
 */
function validateConfig(): void {
  const required: Array<{ key: string; value: string | undefined; name: string }> = [
    { key: 'discord.token', value: config.discord.token, name: 'DISCORD_TOKEN' },
    { key: 'discord.clientId', value: config.discord.clientId, name: 'DISCORD_CLIENT_ID' },
  ];

  const missing = required.filter(item => !item.value);
  
  if (missing.length > 0) {
    const missingVars = missing.map(item => item.name).join(', ');
    throw new Error(
      `Missing required environment variables: ${missingVars}\n` +
      'Please copy env.example to .env and fill in the required values.'
    );
  }

  // Validate numeric values
  if (config.canvas.editTimeoutMinutes <= 0) {
    throw new Error('EDIT_TIMEOUT_MINUTES must be a positive number');
  }

  if (config.canvas.autoSaveIntervalSeconds <= 0) {
    throw new Error('AUTO_SAVE_INTERVAL_SECONDS must be a positive number');
  }

  if (config.canvas.maxContentLength <= 0) {
    throw new Error('MAX_CONTENT_LENGTH must be a positive number');
  }
}

/**
 * Gets the full configuration object after validation
 * @returns {Config} The validated configuration
 */
export function getConfig(): Config {
  validateConfig();
  return config;
}

export {
    config,
    validateConfig
};

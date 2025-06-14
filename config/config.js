require('dotenv').config();

/**
 * Configuration module for Discord Canvases Bot
 * Loads and validates environment variables
 */

const config = {
  // Discord Configuration
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
  },

  // Database Configuration
  database: {
    path: process.env.DATABASE_PATH || './data/canvases.db',
  },

  // Canvas Configuration
  canvas: {
    editTimeoutMinutes: parseInt(process.env.EDIT_TIMEOUT_MINUTES) || 10,
    autoSaveIntervalSeconds: parseInt(process.env.AUTO_SAVE_INTERVAL_SECONDS) || 30,
    maxContentLength: parseInt(process.env.MAX_CONTENT_LENGTH) || 10000,
    contentPreviewLength: parseInt(process.env.CONTENT_PREVIEW_LENGTH) || 200,
    
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
function validateConfig() {
  const required = [
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
 * @returns {Object} The validated configuration
 */
function getConfig() {
  validateConfig();
  return config;
}

module.exports = {
  config,
  validateConfig,
  getConfig,
}; 
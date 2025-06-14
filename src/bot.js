const { Client, GatewayIntentBits, Events } = require('discord.js');
const { getConfig } = require('../config/config');

/**
 * Discord Canvases Bot
 * Main entry point for the Discord bot
 */

let config;
let client;

/**
 * Initialize the Discord client with required intents
 */
function createClient() {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ],
  });
}

/**
 * Set up basic event handlers
 */
function setupEventHandlers(client) {
  // Bot ready event
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`✅ Discord Canvases Bot is ready!`);
    console.log(`📝 Logged in as ${readyClient.user.tag}`);
    console.log(`🌐 Connected to ${readyClient.guilds.cache.size} server(s)`);
    console.log(`🎯 Environment: ${config.app.nodeEnv}`);
  });

  // Interaction handling (buttons, modals, etc.)
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      // TODO: Implement interaction handling in future tasks
      console.log(`📥 Received interaction: ${interaction.type} from ${interaction.user.tag}`);
      
      // Placeholder response for now
      if (interaction.isRepliable() && !interaction.replied) {
        await interaction.reply({
          content: '🚧 Discord Canvases is under development! Canvas features coming soon.',
          ephemeral: true
        });
      }
    } catch (error) {
      console.error('❌ Error handling interaction:', error);
      
      // Try to respond with error message if possible
      try {
        if (interaction.isRepliable() && !interaction.replied) {
          await interaction.reply({
            content: '❌ An error occurred while processing your request.',
            ephemeral: true
          });
        }
      } catch (replyError) {
        console.error('❌ Failed to send error response:', replyError);
      }
    }
  });

  // Error handling
  client.on(Events.Error, (error) => {
    console.error('❌ Discord client error:', error);
  });

  // Warning handling
  client.on(Events.Warn, (warning) => {
    console.warn('⚠️ Discord client warning:', warning);
  });

  // Debug logging (only in development)
  if (config.app.isDevelopment) {
    client.on(Events.Debug, (debug) => {
      if (config.app.logLevel === 'debug') {
        console.debug('🐛 Discord debug:', debug);
      }
    });
  }
}

/**
 * Initialize and start the bot
 */
async function startBot() {
  try {
    console.log('🚀 Starting Discord Canvases Bot...');
    
    // Load and validate configuration
    config = getConfig();
    console.log('✅ Configuration loaded successfully');
    
    // Create Discord client
    client = createClient();
    console.log('✅ Discord client created');
    
    // Set up event handlers
    setupEventHandlers(client);
    console.log('✅ Event handlers registered');
    
    // Login to Discord
    console.log('🔐 Logging in to Discord...');
    await client.login(config.discord.token);
    
  } catch (error) {
    console.error('❌ Failed to start bot:', error.message);
    
    if (error.message.includes('TOKEN_INVALID')) {
      console.error('💡 Please check your DISCORD_TOKEN in the .env file');
    } else if (error.message.includes('Missing required environment variables')) {
      console.error('💡 Please copy env.example to .env and fill in the required values');
    }
    
    process.exit(1);
  }
}

/**
 * Graceful shutdown handling
 */
function setupGracefulShutdown() {
  const shutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
    
    if (client) {
      try {
        await client.destroy();
        console.log('✅ Discord client disconnected');
      } catch (error) {
        console.error('❌ Error during client shutdown:', error);
      }
    }
    
    console.log('👋 Discord Canvases Bot stopped');
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

/**
 * Main execution
 */
if (require.main === module) {
  setupGracefulShutdown();
  startBot();
}

module.exports = {
  createClient,
  setupEventHandlers,
  startBot,
  getClient: () => client,
  getConfig: () => config,
}; 
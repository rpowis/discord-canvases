import { Client, Events, GatewayIntentBits, Interaction } from 'discord.js';
import { Config, getConfig } from '../config/config';

/**
 * Discord Canvases Bot
 * Main entry point for the Discord bot
 */

let config: Config;
let client: Client;

/**
 * Initialize the Discord client with required intents
 */
function createClient(): Client {
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
function setupEventHandlers(client: Client): void {
  // Bot ready event
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`✅ Discord Canvases Bot is ready!`);
    console.log(`📝 Logged in as ${readyClient.user.tag}`);
    console.log(`🌐 Connected to ${readyClient.guilds.cache.size} server(s)`);
    console.log(`🎯 Environment: ${config.app.nodeEnv}`);
  });

  // Interaction handling (buttons, modals, etc.)
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    try {
      // TODO: Implement interaction handling in future tasks
      console.log(`📥 Received interaction: ${interaction.type} from ${interaction.user?.tag}`);
      
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
  client.on(Events.Error, (error: Error) => {
    console.error('❌ Discord client error:', error);
  });

  // Warning handling
  client.on(Events.Warn, (warning: string) => {
    console.warn('⚠️ Discord client warning:', warning);
  });

  // Debug logging (only in development)
  if (config.app.isDevelopment) {
    client.on(Events.Debug, (debug: string) => {
      if (config.app.logLevel === 'debug') {
        console.debug('🐛 Discord debug:', debug);
      }
    });
  }
}

/**
 * Initialize and start the bot
 */
async function startBot(): Promise<void> {
  try {
    console.log('🚀 Starting Discord Canvases Bot...');
    
    // Load and validate configuration
    const configResult = getConfig();
    if (!configResult) {
      throw new Error('Failed to load configuration');
    }
    config = configResult;
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to start bot:', errorMessage);
    
    if (errorMessage.includes('TOKEN_INVALID')) {
      console.error('💡 Please check your DISCORD_TOKEN in the .env file');
    } else if (errorMessage.includes('Missing required environment variables')) {
      console.error('💡 Please copy env.example to .env and fill in the required values');
    }
    
    process.exit(1);
  }
}

/**
 * Graceful shutdown handling
 */
function setupGracefulShutdown(): void {
  const shutdown = async (signal: string): Promise<void> => {
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

export {
  createClient,
  setupEventHandlers,
  startBot
};

export function getClient(): Client | undefined {
  return client;
} 
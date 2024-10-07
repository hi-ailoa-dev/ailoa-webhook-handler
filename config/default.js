module.exports = {
    github: {
      webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
      installationId: process.env.GITHUB_INSTALLATION_ID,
    },
    server: {
      port: 3000,
    },
  };
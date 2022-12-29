// PM2 ecosystem config
const config = {
  apps: [
    {
      name: 'open-sign',
      script: './dist/server.js',
      env: {
        NODE_ENV: 'development',
        LED_HEIGHT: 32,
        LED_WIDTH: 64,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}

module.exports = config

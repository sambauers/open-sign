// PM2 ecosystem config
const config = {
  apps: [
    {
      name: 'open-sign',
      script: './dist/server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}

module.exports = config

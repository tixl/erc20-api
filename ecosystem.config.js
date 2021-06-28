module.exports = {
  apps: [
    {
      name: 'erc20api',
      script: './lib/index.js',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      exec_mode: 'cluster',
    },
  ],
}

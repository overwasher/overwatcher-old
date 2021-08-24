module.exports = {
  env: 'development',
  secretKey: 'secretKey',
  log: {
    format: 'dev',
  },
  cors: {
    origin: true,
  },
  stubSensorAuth: true,
  sendErrorStacktrace: true,
};

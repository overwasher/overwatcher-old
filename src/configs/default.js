module.exports = {
  env: undefined,
  secretKey: undefined,
  log: {
    format: undefined,
    dir: '../logs',
  },
  cors: {
    origin: undefined,
    credentials: true,
  },
  staleInterval: 60000, // 60s
  stubSensorAuth: true,
  sendErrorStacktrace: false,
};

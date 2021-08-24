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
  staleInterval: 60,
  stubSensorAuth: false,
  sendErrorStacktrace: false,
};

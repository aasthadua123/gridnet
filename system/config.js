module.exports = {
  settings: {
    port: 4000,
    salt: 10,
    server: {
      protocol: '',
      host: ''
    },
    verification: {
      sms: false,
      email: false
    }
  },
  details: {
    sign: 'secretText',
    database: {
      local: '',
      external: 'mongodb://admin:auzx254sd@ds161710.mlab.com:61710/gridnet'
    },
    mail: {
      host: '',
      user: '',
      pass: ''
    }
  }
}

export default {
    telegram: {
      token: process.env.TELEGRAM_TOKEN || '492324683:AAHaSv4uJ5BPbBY_Byixuz2hfseSrQAQraM',
      externalUrl: process.env.CUSTOM_ENV_VARIABLE || '',
      port: process.env.PORT || 443,
      host: '0.0.0.0'
    },
    mongodb: {
      url: process.env.MONGODBURL || 'mongodb://admin:admin123@ds155631.mlab.com:55631/heroku_hzldrvpc',
    }
  };
  
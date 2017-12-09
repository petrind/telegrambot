export default {
    telegram: {
      token: process.env.TELEGRAM_TOKEN || '473931720:AAFhYh6h1dJUlVC0GmY_UkyiGpOrb72CDK8',
      externalUrl: process.env.CUSTOM_ENV_VARIABLE || 'https://yoursite.com',
      port: process.env.PORT || 443,
      host: '0.0.0.0'
    },
    mongodb: {
      url: process.env.MONGODBURL || 'mongodb://admin:admin123@ds155631.mlab.com:55631/heroku_hzldrvpc',
    }
  };
  
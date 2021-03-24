const dev = {
  API: process.env.REACT_APP_dev_API,
  API_KEY: process.env.REACT_APP_dev_API_KEY,
};

const prod = {
  API: process.env.REACT_APP_prod_API,
  API_KEY: process.env.REACT_APP_prod_API_KEY,
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

// eslint-disable-next-line
export default {
  // Add common config values here
  REGION: 'us-east-1',
  authType: 'API_KEY',
  ...config
};

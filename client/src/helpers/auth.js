
export const configHeader = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// Setup config/headers and token
const tokenConfig = getStateToken => {
    // Get token from localstorage
    const token = getStateToken
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };

  export default {
    tokenConfig
  }
  
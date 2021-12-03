import { Env, Endpoint } from './types';

export const endpoints: { [key in Env]: Endpoint } = {
  STAGING: {
    ceramicUrl: 'https://ceramic.stg.cybertino.io',
    cyberConnectSchema:
      'kjzl6cwe1jw149mvqedik2h3j26y4bmcvucjbbhezwcr7dgdyyg9v0x8xfvlp1j',
    cyberConnectApi: 'https://api.stg.cybertino.io/connect/',
  },
  PRODUCTION: {
    ceramicUrl: 'https://ceramic.cybertino.io',
    cyberConnectSchema:
      'kjzl6cwe1jw14b3g6d22ze4jaatoikiq62qrmnbzo8hkg68ic7w0smq9ymzsxta',
    cyberConnectApi: 'https://api.cybertino.io/connect/',
  },
};

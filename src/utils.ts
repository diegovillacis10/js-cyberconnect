import { Chain } from './types';

export const getAddressByProvider = async (provider: any, chain: Chain) => {
  switch (chain) {
    case Chain.ETH: {
      const addresses = await provider.request({ method: 'eth_accounts' });
      if (addresses && addresses[0]) {
        return addresses[0];
      } else {
        return '';
      }
    }
    case Chain.SOLANA: {
      return provider.publicKey.toString();
    }
    default: {
      return '';
    }
  }
};

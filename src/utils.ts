import { Blockchain } from './types';

export const getAddressByProvider = async (
  provider: any,
  chain: Blockchain
) => {
  switch (chain) {
    case Blockchain.ETH: {
      const addresses = await provider.request({ method: 'eth_accounts' });
      if (addresses && addresses[0]) {
        return addresses[0];
      } else {
        return '';
      }
    }
    case Blockchain.SOLANA: {
      return provider.publicKey.toString();
    }
    default: {
      return '';
    }
  }
};

# CyberConnect

The JavaScript library provides `CyberConnect` class which includes two primary functions, connect and disconnect. The library encapsulates the complex authentication logic (authenticate to Ceramic Network) into easy-to-use functions.
[CyberConnect API](https://docs.cyberconnect.me/connect-and-disconnect).

## Getting started

### Installation

```sh
npm install @cyberlab/cyberconnect
or
yarn add @cyberlab/cyberconnect
```

### Basic usage

#### Init CyberConnect

```ts
import CyberConnect, {
  Env,
  Blockchain,
} from 'npm install @cyberlab/cyberconnect';

const cyberConnect = new CyberConnect({
  namespace: 'CyberConnect',
  env: Env.Production,
  chain: Blockchain.ETH,
  provider: provider,
});
```

- `namespace` - Your applciation name.
- `env` - (optional) Env decides the endpoints. Now we have `staging` and `production`. (The default value is `Env.Production`).
- `chain` - (optional) The blockchain you want to connect with. Now we support `ethereum` and `solana`. (The default is `Blockchain.ETH`).
- `provider` - The corresponding provider of the given chain.

See [Solana](#Solana) for Solana demo.

#### Connect

```ts
cyberConnect.connect(targetAddr, alias);
```

- `targetAddr` - The target wallet address to connect.
- `alias` - (optional) Alias for the target address.

#### Disconnect

```ts
cyberConnect.disconnect(targetAddr);
```

- `targetAddr` - The target wallet address to disconnect.

### Solana

You can get Solana provider from [@solana/wallet-adapter-react]('https://github.com/solana-labs/wallet-adapter)

```ts
import { useWallet } from '@solana/wallet-adapter-react';
const solanaProvider = useWallet();
```

<b>Note</b>: You need to pass `chainRef` when you connect to Solana. Now we have three options: `Solana.SOLANA_MAINNET_CHAIN_REF`, `Solana.SOLANA_DEVNET_CHAIN_REF` and `Solana.SOLANA_TESTNET_CHAIN_REF`

```ts
import CyberConnect, {
  Env,
  Blockchain,
  Solana,
} from 'npm install @cyberlab/cyberconnect';

const cyberConnect = new CyberConnect({
  namespace: 'CyberConnect',
  env: Env.Production,
  chain: Blockchain.ETH,
  provider: solanaProvider,
  chainRef: Solana.SOLANA_MAINNET_CHAIN_REF,
});
```

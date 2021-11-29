# CyberConnect

The JavaScript library provides two primary functions, connect and disconnect. The library encapsulates the complex authentication logic (authenticate to Ceramic Network) into easy-to-use functions. 
[CyberConnect API](https://docs.cyberconnect.me/connect-and-disconnect).

## Getting started

### Installation

```sh
npm install @cyberlab/cyberconnect
```

### Basic usage

```ts
import CyberConnect, { Env } from 'npm install @cyberlab/cyberconnect';

// ethProvider is an Ethereum provider
// namespace is your applciation name
// env decides the endpoints. Now we have staging and production.
const cyberConnect = new CyberConnect({
  ethProvider: ethProvider,
  namespace: 'cyberchat',
  env: Env.Production,
});

// Connect
cyberConnect.connect(targetAddr, alias);

// Disconnect
cyberConnect.disconnect(targetAddr);
```

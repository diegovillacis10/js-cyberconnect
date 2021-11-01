import { CeramicClient } from '@ceramicnetwork/http-client';
import { EthereumAuthProvider } from '@3id/connect';
import { IDX } from '@ceramicstudio/idx';
import { Env, Endpoint } from './network';
interface Connection {
    connectionType: string;
    target: string;
    namespace: string;
    createdAt: string;
    alias: string;
}
declare type Connections = Connection[];
declare class CyberConnect {
    address: string;
    namespace: string;
    endpoint: Endpoint;
    ceramicClient: CeramicClient;
    authProvider: EthereumAuthProvider | undefined;
    resolverRegistry: any;
    idxInstance: IDX | undefined;
    constructor(config: {
        ethProvider: any;
        namespace: string;
        env: keyof typeof Env;
    });
    authenticate(): Promise<void>;
    getOutboundLink(): Promise<Connections>;
    connect(targetAddr: string, alias?: string): Promise<void>;
    disconnect(targetAddr: string): Promise<void>;
}
export default CyberConnect;
//# sourceMappingURL=cyberConnect.d.ts.map
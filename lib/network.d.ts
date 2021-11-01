export declare enum Env {
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}
export interface Endpoint {
    ceramicUrl: string;
    cyberConnectSchema: string;
    cyberConnectApi: string;
}
export declare const endpoints: {
    [key in Env]: Endpoint;
};
//# sourceMappingURL=network.d.ts.map
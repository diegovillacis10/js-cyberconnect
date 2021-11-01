export declare type Query = 'connect' | 'disconnect';
export declare const connectQuerySchema: (fromAddr: String, toAddr: String, alias: String, source: String) => string;
export declare const disconnectQuerySchema: (fromAddr: String, toAddr: String) => string;
export declare const querySchemas: {
    [key in Query]: Function;
};
export declare const request: (url?: string, data?: {}) => Promise<any>;
export declare const handleQuery: (query: string, url: string, variables?: object) => Promise<any>;
export declare const follow: (fromAddr: String, toAddr: String, alias: String, source: String, url: string) => Promise<any>;
export declare const unfollow: (fromAddr: String, toAddr: String, url: string) => Promise<any>;
//# sourceMappingURL=queries.d.ts.map
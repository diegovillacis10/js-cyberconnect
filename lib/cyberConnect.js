"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("@ceramicnetwork/http-client");
var key_did_resolver_1 = __importDefault(require("key-did-resolver"));
var _3id_did_resolver_1 = __importDefault(require("@ceramicnetwork/3id-did-resolver"));
var _3id_did_provider_1 = __importDefault(require("3id-did-provider"));
var connect_1 = require("@3id/connect");
var sha256_1 = require("@stablelib/sha256");
var uint8arrays_1 = require("uint8arrays");
var dids_1 = require("dids");
var idx_1 = require("@ceramicstudio/idx");
var network_1 = require("./network");
var queries_1 = require("./queries");
var CyberConnect = /** @class */ (function () {
    // ethProvider is an Ethereum provider and addresses an array of strings
    function CyberConnect(config) {
        var _this = this;
        this.address = '';
        var ethProvider = config.ethProvider, namespace = config.namespace, env = config.env;
        this.namespace = namespace;
        this.endpoint = network_1.endpoints[env] || network_1.endpoints.PRODUCTION;
        this.ceramicClient = new http_client_1.CeramicClient(this.endpoint.ceramicUrl);
        var keyDidResolver = key_did_resolver_1.default.getResolver();
        var threeIdResolver = _3id_did_resolver_1.default.getResolver(this.ceramicClient);
        this.resolverRegistry = __assign(__assign({}, threeIdResolver), keyDidResolver);
        if (!ethProvider)
            return;
        ethProvider.enable().then(function (addresses) {
            if (addresses[0]) {
                _this.address = addresses[0];
                _this.authProvider = new connect_1.EthereumAuthProvider(ethProvider, _this.address);
            }
        });
    }
    CyberConnect.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rst, authSecret, authId, getPermission, threeId, threeIdProvider, did;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.idxInstance) {
                            return [2 /*return*/];
                        }
                        if (!this.authProvider) {
                            console.error('Could not find authProvider');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.authProvider.authenticate('Allow this account to control your identity')];
                    case 1:
                        rst = _a.sent();
                        authSecret = (0, sha256_1.hash)((0, uint8arrays_1.fromString)(rst.slice(2)));
                        return [4 /*yield*/, this.authProvider.accountId()];
                    case 2:
                        authId = (_a.sent()).toString();
                        getPermission = function (request) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, request.payload.paths];
                            });
                        }); };
                        if (!this.ceramicClient)
                            return [2 /*return*/];
                        return [4 /*yield*/, _3id_did_provider_1.default.create({
                                getPermission: getPermission,
                                authSecret: authSecret,
                                authId: authId,
                                ceramic: this.ceramicClient,
                            })];
                    case 3:
                        threeId = _a.sent();
                        threeIdProvider = threeId.getDidProvider();
                        did = new dids_1.DID({
                            provider: threeIdProvider,
                            resolver: this.resolverRegistry,
                        });
                        return [4 /*yield*/, did.authenticate()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.ceramicClient.setDID(did)];
                    case 5:
                        _a.sent();
                        this.idxInstance = new idx_1.IDX({
                            ceramic: this.ceramicClient,
                            aliases: {
                                cyberConnect: this.endpoint.cyberConnectSchema,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.getOutboundLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.idxInstance) {
                            console.error('Could not find idx instance');
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.idxInstance.get('cyberConnect')];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, (result === null || result === void 0 ? void 0 : result.outboundLink) || []];
                }
            });
        });
    };
    CyberConnect.prototype.connect = function (targetAddr, alias) {
        var _a, _b;
        if (alias === void 0) { alias = 'none'; }
        return __awaiter(this, void 0, void 0, function () {
            var resp, outboundLink, link, curTimeStr;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.authenticate()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, (0, queries_1.follow)(this.address, targetAddr, alias, this.namespace, this.endpoint.cyberConnectApi)];
                    case 2:
                        resp = _c.sent();
                        if (((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.follow.result) !== 'SUCCESS') {
                            console.error('follow error: ', (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.follow.result);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getOutboundLink()];
                    case 3:
                        outboundLink = _c.sent();
                        if (!this.idxInstance) {
                            console.error('Could not find idx instance');
                            return [2 /*return*/];
                        }
                        link = outboundLink.find(function (link) {
                            return link.target === targetAddr;
                        });
                        if (!link) {
                            curTimeStr = String(Date.now());
                            outboundLink.push({
                                target: targetAddr,
                                connectionType: 'follow',
                                namespace: this.namespace,
                                alias: alias,
                                createdAt: curTimeStr,
                            });
                        }
                        else {
                            console.warn('You have already connected to the target address');
                        }
                        this.idxInstance.set('cyberConnect', { outboundLink: outboundLink });
                        console.log('Connect success');
                        return [2 /*return*/];
                }
            });
        });
    };
    CyberConnect.prototype.disconnect = function (targetAddr) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var resp, outboundLink, newOutboundLink;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.authenticate()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, (0, queries_1.unfollow)(this.address, targetAddr, this.endpoint.cyberConnectApi)];
                    case 2:
                        resp = _c.sent();
                        if (((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.unfollow.result) !== 'SUCCESS') {
                            console.error('unfollow error: ', (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.unfollow.result);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getOutboundLink()];
                    case 3:
                        outboundLink = _c.sent();
                        if (!this.idxInstance) {
                            console.error('Could not find idx instance');
                            return [2 /*return*/];
                        }
                        newOutboundLink = outboundLink.filter(function (link) {
                            return link.target !== targetAddr;
                        });
                        this.idxInstance.set('cyberConnect', {
                            outboundLink: newOutboundLink,
                        });
                        console.log('Disconnect success');
                        return [2 /*return*/];
                }
            });
        });
    };
    return CyberConnect;
}());
exports.default = CyberConnect;
//# sourceMappingURL=cyberConnect.js.map
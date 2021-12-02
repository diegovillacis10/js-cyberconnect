export class ConnectError {
  code: ErrorCode;
  message: string;

  constructor(code: ErrorCode, message?: string) {
    this.code = code;
    this.message = message || errors[code];
  }

  printError() {
    console.error(this.message);
  }
}

export enum ErrorCode {
  EmptyNamespace = 'EmptyNamespace',
  EmptyEthProvider = 'EmptyEthProvider',
  EmptyAuthProvider = 'EmptyAuthProvider',
  NetworkError = 'NetworkError',
  GraphqlError = 'GraphqlError',
  CeramicError = 'CeramicError',
  AuthProviderError = 'AuthProviderError',
}

const errors: { [key in ErrorCode]: string } = {
  EmptyNamespace: 'Namespace can not be empty',
  EmptyEthProvider: 'Eth provider can not be empty',
  EmptyAuthProvider: 'Could not find authProvider',
  NetworkError: '',
  GraphqlError: '',
  CeramicError: '',
  AuthProviderError: '',
};

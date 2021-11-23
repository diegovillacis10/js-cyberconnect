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
  NoAuthProvider = 'NoAuthProvider',
  NetworkError = 'NetworkError',
  GraphqlError = 'GraphqlError',
  CeramicError = 'CeramicError',
}

const errors: { [key in ErrorCode]: string } = {
  EmptyNamespace: 'Namespace can not be empty',
  NoAuthProvider: 'Could not find authProvider',
  NetworkError: '',
  GraphqlError: '',
  CeramicError: '',
};

export type Query = 'connect' | 'disconnect';

export const connectQuerySchema = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
}) => {
  return `mutation {\n  follow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", namespace: \"${namespace}\", signature: \"${signature}\") {\n    result\n  }\n}\n`;
};

export const disconnectQuerySchema = ({
  fromAddr,
  toAddr,
  namespace,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: String;
}) => {
  return `mutation {\n  unfollow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", namespace: \"${namespace}\", signature: \"${signature}\") {\n    result\n  }\n}\n`;
};

export const setAliasQuerySchema = ({
  fromAddr,
  toAddr,
  namespace,
  signature,
  alias,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  alias: string;
}) => {
  return `mutation {\n  setAlias(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", namespace: \"${namespace}\", signature: \"${signature}\") {\n    result\n  }\n}\n`;
};

export const querySchemas = {
  connect: connectQuerySchema,
  disconnect: disconnectQuerySchema,
  setAlias: setAliasQuerySchema,
};

export const request = async (url = '', data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response.json();
};

export const handleQuery = (
  query: string,
  url: string,
  variables: object = {}
) => {
  return request(url, {
    query,
    variables,
    operationName: null,
  });
};

export const follow = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  url,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  url: string;
}) => {
  const schema = querySchemas['connect']({
    fromAddr,
    toAddr,
    alias,
    namespace,
    signature,
  });
  return handleQuery(schema, url);
};

export const unfollow = ({
  fromAddr,
  toAddr,
  namespace,
  url,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  url: string;
}) => {
  const schema = querySchemas['disconnect']({
    fromAddr,
    toAddr,
    namespace,
    signature,
  });
  return handleQuery(schema, url);
};

export const setAlias = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  url,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  url: string;
}) => {
  const schema = querySchemas['setAlias']({
    fromAddr,
    toAddr,
    alias,
    namespace,
    signature,
  });
  return handleQuery(schema, url);
};

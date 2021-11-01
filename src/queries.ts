export type Query = 'connect' | 'disconnect';

export const connectQuerySchema = (
  fromAddr: String,
  toAddr: String,
  alias: String,
  source: String
) => {
  return `mutation {\n  follow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", source: \"${source}\") {\n    result\n  }\n}\n`;
};

export const disconnectQuerySchema = (fromAddr: String, toAddr: String) => {
  return `mutation {\n  unfollow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\") {\n    result\n  }\n}\n`;
};

export const querySchemas: { [key in Query]: Function } = {
  connect: connectQuerySchema,
  disconnect: disconnectQuerySchema,
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

export const follow = (
  fromAddr: String,
  toAddr: String,
  alias: String,
  source: String,
  url: string
) => {
  const schema = querySchemas['connect'](fromAddr, toAddr, alias, source);
  return handleQuery(schema, url);
};

export const unfollow = (fromAddr: String, toAddr: String, url: string) => {
  const schema = querySchemas['disconnect'](fromAddr, toAddr);
  return handleQuery(schema, url);
};

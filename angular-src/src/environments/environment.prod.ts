const domain = "000.000.000.000";
const port = 80;
const URL = `http://${domain}:${port}/api`;

export const environment = {
  production: true,
  port: port,
  domain: domain,
  backendUrl: URL
};

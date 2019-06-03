const config = {};

config.host = process.env.HOST || "https://testes-cosmos.documents.azure.com:443/";
config.authKey =
  process.env.AUTH_KEY || "y0Mnia8Y2RrbE9mB4f5nhm7dmEBf1uGB3KtSawH5iFPo29UYIOhSY9D6ga0lSQdwHysQn9Qb6UTciRJzHTm3Cg==";
config.databaseId = "ToDoList";
config.containerId = "Items";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;
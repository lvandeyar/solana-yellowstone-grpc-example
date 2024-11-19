require('dotenv').config();
const { default: Client } = require("@triton-one/yellowstone-grpc");

// Constants - Now using environment variables
const ENDPOINT = process.env.QUICKNODE_RPC_ENDPOINT;
const TOKEN = process.env.QUICKNODE_AUTH_TOKEN;

// Verify environment variables are set
if (!ENDPOINT || !TOKEN) {
    console.error('Error: Required environment variables are not set!');
    console.error('Please make sure QUICKNODE_RPC_ENDPOINT and QUICKNODE_AUTH_TOKEN are set in your .env file');
    process.exit(1);
}

(async () => {
    const client = new Client(ENDPOINT, TOKEN);

    // Now you can call the client methods
    const version = await client.getVersion(); // gets the version information
    console.log(version);
})();
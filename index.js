const Client = require("@triton-one/yellowstone-grpc").default;

(async () => {
    const client = new Client("ENDPOINT:PORT", "TOKEN");

    // Now you can call the client methods
    const version = await client.getVersion(); // gets the version information
    console.log(version);
})();
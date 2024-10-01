# Solana Yellowstone gRPC Example

This repository demonstrates how to use the `@triton-one/yellowstone-grpc` package to interact with Solana's Yellowstone gRPC API. The example includes connecting to the gRPC client, fetching the version information, and logging it to the console.

## Requirements

- Node.js (v12 or higher)
- An endpoint and token to connect to the Yellowstone gRPC server

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/solana-yellowstone-grpc-example.git
    cd solana-yellowstone-grpc-example
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Update the `ENDPOINT` and `PORT` with your Yellowstone gRPC server details and provide your `TOKEN`.

2. Run the example:

    ```bash
    node index.js
    ```

The example script will:

- Connect to the gRPC server using the provided endpoint and token.
- Fetch and display the version information from the Solana Yellowstone service.

## Example Code

```javascript
const Client = require("@triton-one/yellowstone-grpc").default;

(async () => {
    const client = new Client("ENDPOINT:PORT", "TOKEN");

    // Now you can call the client methods
    const version = await client.getVersion(); // gets the version information
    console.log(version);
})();
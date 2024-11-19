# Solana Yellowstone gRPC Example

This repository demonstrates how to use the `@triton-one/yellowstone-grpc` package to interact with Solana's Yellowstone gRPC API. The examples include checking connection status and monitoring Jupiter DEX transactions in real-time.

## Requirements

- Node.js (v12 or higher)
- QuickNode endpoint with Yellowstone gRPC support
- QuickNode authentication token

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

3. Set up environment variables:
    - Copy `.env.example` to `.env`
    - Update the following variables in `.env`:
        ```env
        QUICKNODE_RPC_ENDPOINT="your-quicknode-endpoint"
        QUICKNODE_AUTH_TOKEN="your-quicknode-token"
        ```

## Scripts

### 1. Check Connection (`check-connection.js`)
Verifies connection to the Yellowstone gRPC service and displays version information.

```bash
node check-connection.js
```

### 2. Jupiter Transaction Monitor (`jupiter-tx-watcher.js`)
Monitors Jupiter DEX transactions in real-time and displays:
- Transaction signatures
- Slot numbers
- Success status
- Number of accounts and instructions
- Transaction fees
- Compute units used
- Transaction logs

```bash
node jupiter-tx-watcher.js
```

## Features

- Environment variable support for secure credential management
- Real-time transaction monitoring
- Detailed transaction information logging
- Automatic reconnection handling
- Clean shutdown support

## Example Output

### Jupiter Transaction Monitor
```
Connecting to Solana...
Connection established - watching Jupiter transactions

New Jupiter Transaction: {
    signature: "...",
    slot: "123456789",
    success: true,
    accounts: 12,
    instructions: 4,
    lamportFee: 5000,
    computeUnits: 200000
}
```

## Error Handling

Both scripts include:
- Environment variable validation
- Connection error handling
- Transaction processing error handling
- Clean shutdown on SIGINT (Ctrl+C)

## Contributing

Feel free to submit issues and enhancement requests!
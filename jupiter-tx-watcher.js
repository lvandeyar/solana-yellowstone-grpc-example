require('dotenv').config();
const { default: Client } = require("@triton-one/yellowstone-grpc");
const Base58 = require('bs58');

// Constants - Now using environment variables
const ENDPOINT = process.env.QUICKNODE_RPC_ENDPOINT;
const TOKEN = process.env.QUICKNODE_AUTH_TOKEN;

// Verify environment variables are set
if (!ENDPOINT || !TOKEN) {
    console.error('Error: Required environment variables are not set!');
    console.error('Please make sure QUICKNODE_RPC_ENDPOINT and QUICKNODE_AUTH_TOKEN are set in your .env file');
    process.exit(1);
}

// Jupiter v6 Program ID
const JUPITER_PROGRAM_ID = "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";

async function main() {
    const client = new Client(
        ENDPOINT, 
        TOKEN,
        {
            "grpc.keepalive_time_ms": 120000,
            "grpc.http2.min_time_between_pings_ms": 120000,
            "grpc.keepalive_timeout_ms": 20000,
            "grpc.http2.max_pings_without_data": 0,
            "grpc.keepalive_permit_without_calls": 1,
        }
    );

    try {
        console.log('Connecting to Solana...');
        const stream = await client.subscribe();

        const request = {
            accounts: {},
            slots: {},
            transactions: {
                jupiterTxs: {
                    accountInclude: [JUPITER_PROGRAM_ID],
                    accountExclude: [],
                    accountRequired: []
                }
            },
            transactionsStatus: {},
            entry: {},
            blocks: {},
            blocksMeta: {},
            commitment: 'confirmed',
            accountsDataSlice: [],
            ping: undefined,
        };

        stream.write(request);
        console.log('Connection established - watching Jupiter transactions\n');

        stream.on('data', (data) => {
            if (data.transaction && data.transaction.transaction) {
                const tx = data.transaction;
                try {
                    // Convert signature to string without base58
                    const signature = tx.transaction.signature.toString('hex');
                    
                    console.log('New Jupiter Transaction:', {
                        signature: signature,
                        slot: tx.slot,
                        success: tx.transaction.meta?.err === null,
                        accounts: tx.transaction.transaction.message.accountKeys.length,
                        instructions: tx.transaction.transaction.message.instructions.length,
                        lamportFee: tx.transaction.meta?.fee || 0,
                        computeUnits: tx.transaction.meta?.computeUnitsConsumed || 0
                    });

                    // Log transaction details
                    if (tx.transaction.meta?.logMessages) {
                        console.log('Transaction logs:');
                        tx.transaction.meta.logMessages.forEach(log => console.log(log));
                    }
                    console.log('----------------------------------------');

                } catch (err) {
                    console.error('Error processing transaction:', err);
                    // Log the raw signature for debugging
                    console.error('Raw signature:', tx.transaction.signature);
                }
            }
        });

        stream.on("error", (error) => {
            console.error('Stream error:', error);
        });

    } catch (error) {
        console.error('Error in subscription process:', error);
    }
}

// Run the main function
main().catch((err) => {
    console.error('Unhandled error in main:', err);
});

// Keep the process alive
setInterval(() => {
    console.log('Heartbeat - still watching transactions...');
}, 30000);

// Handle shutdown
process.on('SIGINT', () => {
    console.log('Shutting down...');
    process.exit();
});
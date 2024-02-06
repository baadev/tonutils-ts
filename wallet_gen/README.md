# Multi Wallet Generator

This script is written in TypeScript and is used to generate multiple TON (Telegram Open Network) wallets. It uses the TON libraries to create wallets and fund them with a small amount of TON to activate.
Also you can add some initial amount to keep on wallet.

## Dependencies

The script uses several npm packages:

- `fs` for file system operations
- `arg` for parsing command-line arguments
- `axios` for making HTTP requests
- `buffer` for handling binary data
- `@orbs-network/ton-access` for TON network access
- `@ton/crypto` for TON cryptographic operations
- `@ton/ton` for TON blockchain operations
- `ton-lite-client` for TON lite client operations
- `dotenv` for environment variable management

## Usage

The script accepts two command-line arguments:

- `--wallets`: The number of wallets to be created (default is 1)
- `--popup`: The amount of TON to be sent to each wallet (default is 0.01)

Before running the script, you need to set the `FUNDING_SEED` environment variable to the mnemonic of a wallet that has funds.

The script generates a new wallet for each iteration, funds it with the specified amount of TON from the funding wallet, and activates it by sending a small amount of TON to itself. The public key and mnemonic of each generated wallet are saved to a file named `mnemonics.txt`.

## Functions

- `main()`: The main function that controls the flow of the script.
- `initializeWallet()`: Creates a new wallet, funds it, and activates it.
- `getLiteClient()`: Returns a lite client instance.
- `intToIP()`: Converts an integer to an IP address.
- `waitForTransaction()`: Waits for a transaction to be confirmed.
- `sleep()`: Pauses execution for a specified amount of time.

## Note

This script is intended for use in a development environment. Be careful not to expose your mnemonics or private keys in a production environment.
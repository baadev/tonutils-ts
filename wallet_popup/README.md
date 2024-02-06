# Multi Wallet PopUp TON

This TypeScript script is used to send TON (Telegram Open Network) cryptocurrency from a funding wallet to a list of other wallets.

## Dependencies

The script uses several dependencies:

- `dotenv`: To load environment variables from a `.env` file.
- `@orbs-network/ton-access`: To access the TON network.
- `@ton/crypto`: To convert a mnemonic to a wallet key.
- `@ton/ton`: To interact with the TON network.
- `ton-lite-client`: To interact with the TON network using a lite client.
- `axios`: To make HTTP requests.
- `fs`: To interact with the file system.

## Wallet List

The list of destination wallets is defined in the `walletList` array. Each wallet is represented by its address.

## Send Value
The amount of TON to send to each wallet is defined in the `sendValue` variable.

## Main Function

The `main` function is the entry point of the script. It retrieves the funding wallet's mnemonic from the `FUNDING_SEED` environment variable, converts it to a wallet key, and creates a wallet instance. It then loops over the `walletList` array and sends TON to each wallet.

## Execution
The script is executed by calling the `main` function at the end of the file.
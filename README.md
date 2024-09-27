
# TonUtils

<img src="https://github.com/baadev/TonUtils/blob/main/assets/TonUtils.png?raw=true" width=500 />

[![Telegram Group][tgg-svg]][tg-group]
[![Telegram Chanel][tgc-svg]][tg-chanel]
![Licence](https://img.shields.io/github/license/baadev/TonUtils?style=flat-square)
![NPM Version](https://img.shields.io/npm/v/tonutils-ts?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dw/tonutils-ts?style=flat-square)
![Stars](https://img.shields.io/github/stars/baadev/TonUtils?style=flat-square)


<!-- TOC -->

- [TonUtils](#tonutils)
        - [Why TonUtils?](#why-tonutils)
        - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Features Description](#features-description)
    - [Public Address Utils](#public-address-utils)
    - [Wallet Creation](#wallet-creation)
  - [How to Contribute](#how-to-contribute)
  - [License](#license)
  - [Support](#support)

<!-- /TOC -->

Developing on the TON blockchain can be tough, especially when you are new to TON. Suppose you are an NFT marketplace developer, trying to sell your collections, but you face confusing docs, random bugs, and unreliable APIs. Official tools often don't work well, making things even harder.

## Why TonUtils?

TON is the fastest blockchain, but high activity (such as major listings) can cause endpoints like TonApi or Public Light Servers to go down, leading to failed transactions and frustration. TonUtils helps solve these problems:

- **Minimal dependencies**: Simple tools for stable blockchain interaction.

- **Alternative light servers**: Automatically connects to other servers when the current one fails, keeping your project running smoothly.

- **Easy to use**: No need to spend weeks learning. TonUtils has ready-made solutions so you can start building right away.

Focus on your product, not on fighting with the blockchain.

## Features

- [**Public Address Utils**](#public-address-utils): Quickly validate and manage wallet addresses, reducing errors and saving time.
- [**Wallet Creation**](#wallet-creation): Create secure wallets easily with simple code, no complex guides needed.
- [**Transaction Crafting**](#transaction-crafting) (Coming Soon): Effortlessly craft and send transactions, focus on your project, not on blockchain complexity.

## Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16.x or later)
- npm (v8.x or later)

### Installation

To get started with `TonUtils`, simply install it as a package using npm:

```bash
npm install tonutils-ts
```

## Features Description

### Public Address Utils

- **getPublicAddressByWallet**
  - **Description**: Returns the public address associated with a given wallet.
  - **Example**:

    ```typescript
    const address = getPublicAddressByWallet(WalletContractV4);
    // Output: EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL
    ```

- **getPublicAddressByMnemonic**
  - **Description**: Retrieves the public address associated with a given mnemonic.
  - **Example**:

    ```typescript
    const address = await getPublicAddressByMnemonic("one two three...");
    // or
    const address = await getPublicAddressByMnemonic(["one", "two", "three"]);
    // Output: EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL
    ```

- **getBouncableAddress**
  - **Description**: Returns the bounceable address for the given address.
  - **Example**:

    ```typescript
    const bouncableAddress = getBouncableAddress("UQ...");
    // Output: EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL
    ```

- **getNonBouncableAddress**
  - **Description**: Returns the non-bounceable address for the given address.
  - **Example**:

    ```typescript
    const nonBouncableAddress = getNonBouncableAddress("EQ...");
    // Output: UQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDp0uO
    ```

### Wallet Creation

- **createWallet**
  - **Description**: Returns a new wallet.
  - **Example**:

    ```typescript
    const { mnemonic, keyPair, generatedWallet } = await createWallet();
    // Output: { mnemonic, keyPair, generatedWallet }
    ```

<!-- WHILE NOT IN NPM - NO DOCUMENTATION
#### Get Public Address by Mnemonic (CLI)

A CLI command to get a public address from a mnemonic. Useful for quick wallet creation and testing addresses:

```BASH
npx ts-node ./modules/public.address.utils.ts -m 'abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual adapt'

# Output:
Bounceable:  EQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JQ3Y
Not Bounceable:  UQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JVAd
```

### Wallet Management (CLI)

Wallet Management utility will allow you to generate specified amount of new wallets and send specified amount of TON in order to activate it in blockchain.

### Create Activated Wallets with Balance

1. Create a `.env` file in your project:

```BASH
   # Your wallet with funds
   FUNDING_SEED="one two three.."
   # optional, tonapi key
   TONAPI_KEY=""

   # For multisend
   # destination address / giver
   RECEIVER_ADDRESS="EQCDkrpCu-FFVPQJnManjlf8XCN75wjX_AKrrEFFQ1mfJqZo" 
   # amount to be sent
   SENT_AMOUNT=0.3
   # 0 will send endlessly until manual stop
   SENT_COUNT=0
   # delay between sends
   SENT_DELAY=""
   # comment for transaction
   SENT_BODY="yo UQB1b1A_P7qFJJYwHN7AXHg2lZRhpyyvQFb0NYBKyRN3eAXi"
```

2. Run the command:

```BASH
npx ts-node ./wallet_gen/multi_wallet_gen.ts --wallets 3 --popup 0.01
```

#### Available arguments

| Argument | Description | Example |
| ----------- | ---------| ----------- |
| `--wallets` | The number of wallets to be created | `--wallets 3`|
| `--popup`   | The amount of TON to be sent to each wallet | `--popup 0.01` |

For more information, please refer to the [README](./wallet_gen/README.md) file in the `wallet_gen` directory.

-----------

### Transaction Crafting

The `wallet_popup` directory contains a TypeScript script used for sending TON cryptocurrency from a funding wallet to a list of other wallets. For more details, please refer to the [README](./wallet_popup/README.md) file in the `wallet_popup` directory.

-->

## How to Contribute

We welcome contributions from the community! If you're interested in helping improve TonUtils, here are ways you can contribute:

- **Reporting Bugs**: Open an issue to report a bug.
- **Suggesting Enhancements**: Have ideas on how to make TonUtils better? Open an issue with your suggestions.
- **Pull Requests**: Submit pull requests with bug fixes or new features.

## License

TonUtils is released under the [MIT License](LICENSE). Feel free to fork and modify it as per your needs.

## Support

If you need assistance or have any questions, feel free to open an issue or contact us directly.

[tg-group]: https://t.me/tonutils_ts
[tg-chanel]: https://t.me/tonutilsts

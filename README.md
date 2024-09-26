
# TonUtils

<img src="https://github.com/baadev/TonUtils/blob/main/assets/TonUtils.png?raw=true" width=500 />

[![Telegram Channel][tgg-svg]][tg-group]
![Licence](https://img.shields.io/github/license/baadev/TonUtils)
![Issues](https://img.shields.io/github/issues/baadev/TonUtils)
![Stars](https://img.shields.io/github/stars/baadev/TonUtils?style=plastic)

- [About](#about)
  - [Why TonUtils?](#why-tonutils)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features Description](#features-description)
  - [Public Address Utils](#public-address-utils)
  - [Wallet Management](#wallet-management)
  - [Transaction Crafting](#transaction-crafting)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Support](#support)

## About

> Simplicity, Reliability, and Speed for Working with the TON Blockchain

Developing on the TON blockchain can be tough, especially when you are new to TON. Suppose you are an NFT marketplace developer, trying to sell your collections, but you face confusing docs, random bugs, and unreliable APIs. Official tools often don't work well, making things even harder.

### Why TonUtils?

TON is the fastest blockchain, but high activity (such as major listings) can cause endpoints like TonApi or Public Light Servers to go down, leading to failed transactions and frustration. TonUtils helps solve these problems:

- **Minimal dependencies**: Simple tools for stable blockchain interaction.

- **Alternative light servers**: Automatically connects to other servers when the current one fails, keeping your project running smoothly.

- **Easy to use**: No need to spend weeks learning. TonUtils has ready-made solutions so you can start building right away.

Focus on your product, not on fighting with the blockchain.

### Features

- [**Public Address Utils**](#public-address-utils): Quickly validate and manage wallet addresses, reducing errors and saving time.
- [**Wallet Creation**](#wallet-creation): Create secure wallets easily with simple code, no complex guides needed.
- [**Transaction Crafting**](#transaction-crafting): Effortlessly craft and send transactions, focus on your project, not on blockchain complexity.

## Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16.x or later)
- npm (v8.x or later)

### Installation

To get started with `TonUtils`, clone the repository and install its dependencies:

```bash
git clone https://github.com/baadev/TonUtils.git
cd TonUtils
npm install
```

## Features Description

### Public Address Utils

#### Module `public.address.utils`

<table>
    <tr>
        <th>Function</th>
        <th>Description</th>
        <th>Example Output:</th>
    </tr>
    <tr>
        <td>getPublicAddressByWallet</td>
        <td>Returns the public address associated with a given wallet.</td>
        <td>
            <pre>EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL</pre>
        </td>
    </tr>
    <tr>
        <td>getPublicAddressByMnenomic</td>
        <td>Retrieves the public address associated with a given mnemonic.</td>
        <td>
            <pre>EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL</pre>
        </td>
    </tr>
    <tr>
        <td>getBouncableAddress</td>
        <td>Returns the bounceable address for the given address.</td>
        <td>
            <pre>EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL</pre>
        </td>
    </tr>
    <tr>
        <td>getNonBouncableAddress</td>
        <td>Returns the non-bounceable address for the given address.</td>
        <td>
            <pre>UQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDp0uO</pre>
        </td>
    </tr>
</table>

##### Usage

<table>
    <tr>
        <th>Function</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>getPublicAddressByWallet</td>
        <td>
            <pre lang="typescript"><code>getPublicAddressByWallet(WalletContractV4)</code></pre>
        </td>
    </tr>
    <tr>
        <td>getPublicAddressByMnenomic</td>
        <td>
            <pre lang="typescript"><code>await getPublicAddressByMnenomic("one two three...");</code></pre>
            <p>or</p>
            <pre lang="typescript"><code>await getPublicAddressByMnenomic(["one", "two", "three"]);</code></pre>
        </td>
    </tr>
    <tr>
        <td>getBouncableAddress</td>
        <td>
            <pre lang="typescript"><code>getBouncableAddress("UQ...");</code></pre>
        </td>
    </tr>
    <tr>
        <td>getNonBouncableAddress</td>
        <td>
            <pre lang="typescript"><code>getBouncableAddress("EQ...");</code></pre>
        </td>
    </tr>
</table>

#### Module `wallet`

<table>
    <tr>
        <th>Function</th>
        <th>Description</th>
        <th>Output</th>
    </tr>
    <tr>
        <td>createWallet</td>
        <td>Returns a new wallet.</td>
        <td>
            <pre lang="typescript"><code>{ mnemonic, keyPair, generatedWallet }</code></pre>
        </td>
    </tr>
</table>

##### Usage

<table>
    <tr>
        <th>Function</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>createWallet</td>
        <td>
            <pre lang="typescript"><code>const { mnemonic, keyPair, generatedWallet } = await createWallet();</code></pre>
        </td>
    </tr>
</table>

#### Example get public address by mnemonic as cmd tool

```console
npx ts-node ./modules/public.address.utils.ts -m 'abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual adapt'

# Output:
Bounceable:  EQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JQ3Y
Not Bounceable:  UQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JVAd
```

-----------

### Wallet Management

Wallet Management utility will allow you to generate specified amount of new wallets and send specified amount of TON in order to activate it in blockchain.

#### Example of creating 3 activated wallets with balance of 0.01 using cmd

Put your funding wallet mnemonic like showed below in your .env file
`FUNDING_SEED=one two three...`

After that run:

```console
npx ts-node ./wallet_gen/multi_wallet_gen.ts --wallets 3 --popup 0.01
```

#### Available arguments

| Argument    | Description                                 | Example       |
| ----------- | ---------------------------                 | -----------   |
| --wallets   | The number of wallets to be created         | --wallets 3   |
| --popup     | The amount of TON to be sent to each wallet | --popup 0.01  |

For more information, please refer to the [README](./wallet_gen/README.md) file in the `wallet_gen` directory.

-----------

### Transaction Crafting

The `wallet_popup` directory contains a TypeScript script used for sending TON cryptocurrency from a funding wallet to a list of other wallets. For more details, please refer to the [README](./wallet_popup/README.md) file in the `wallet_popup` directory.

## How to Contribute

We welcome contributions from the community! If you're interested in helping improve TonUtils, here are ways you can contribute:

- **Reporting Bugs**: Open an issue to report a bug.
- **Suggesting Enhancements**: Have ideas on how to make TonUtils better? Open an issue with your suggestions.
- **Pull Requests**: Submit pull requests with bug fixes or new features.

## License

TonUtils is released under the [MIT License](LICENSE). Feel free to fork and modify it as per your needs.


## Support

If you need assistance or have any questions, feel free to open an issue or contact us directly.


[tgg-svg]: https://img.shields.io/badge/Telegram%20-Group-blue
[tg-group]: https://t.me/tonutils_ts

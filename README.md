
# TonUtils

## About

TonUtils is a toolkit designed to enhance the development and manipulation with the TON (The Open Network) blockchain. 

It provides with a suite of tools and utilities to streamline workflows, optimize development, and facilitate easier interaction with the TON blockchain.

## Features

- **Mnemonic to public key convertion**
- **Wallet Creation**
- **Transaction Crafting**

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

## Usage

### Mnemonic to Public Key

The `utils/mnemonic.to.public.ts` script converts a mnemonic phrase to a public key.

#### Example as JS/TS module

```typescript
import { getPublicAddressByMnenomic } from './/mnemonic.to.public';

// Example mnemonic phrase
const mnemonic = [
    "abandon", "abandon", "abandon", "abandon", "abandon", 
    "abandon", "abandon", "abandon", "abandon", "abandon", 
    "abandon", "abandon", "abandon", "abandon", "abandon", 
    "abandon", "abandon", "abandon", "abandon", "abandon", 
    "abandon", "abandon", "abandon", "abandon"
];

// Convert mnemonic to public key
(async () => {
    const publicKey = await getPublicAddressByMnenomic(mnemonic);
    console.log(`Public Key: ${publicKey}`);
    /**
     * Output:
     *  Public Key: EQBLnk5fDPZB-bmiUcXLVQ9dgynYua_hm1K-nhPpLrt4F5BB
     */
})();
```

#### Example as cmd tool

```console
npx ts-node ./utils/mnemonic.to.public.ts -m 'abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual adapt'

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
#### Available arguments:
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

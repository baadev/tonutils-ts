
# Utils

A collection of utility functions designed to work with the TON (The Open Network) blockchain. This repository provides a variety of tools and scripts to interact with and manipulate data related to TON in your scripts.

## Features

- **Mnemonic to Public Key**: Convert a mnemonic phrase to a public key.

## Installation

To use TonUtils, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/baadev/TonUtils.git
cd TonUtils
npm install
```

## Usage

### Mnemonic to Public Key

The `mnemonic.to.public.ts` script converts a mnemonic phrase to a public key.

#### Example as module

```typescript
import { getPublicAddressByMnenomic } from './mnemonic.to.public';

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
    console.log(`Public Key: ${publicKey}`); // Public Key: EQBLnk5fDPZB-bmiUcXLVQ9dgynYua_hm1K-nhPpLrt4F5BB
})();
```

#### Example as cmd tool

```bash
npx ts-node ./utils/mnemonic.to.public.ts -m 'abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual adapt'

# Output:
Bounceable:  EQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JQ3Y
Not Bounceable:  UQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JVAd
```

## Contributing

We welcome contributions! Please fork the repository and submit pull requests.

## License

TonUtils is released under the [MIT License](LICENSE). Feel free to fork and modify it as per your needs.

## Support

If you need assistance or have any questions, feel free to open an issue or contact me directly.


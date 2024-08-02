
# Utils

A collection of utility modules designed to interact with and manipulate data related to TON in your scripts.

## Features

- **Mnemonic to Public Key**: Convert a mnemonic phrase to a public key.

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
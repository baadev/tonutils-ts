import arg from 'arg';

import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import { Address } from "@ton/core";

require('dotenv').config();

const args = arg({
    '-m': String, // mnemonic to get public key from
});

const mnemonic = args['-m'];

/**
 * Retrieves the public address associated with a given mnemonic.
 * @param mnemonic The mnemonic string.
 * @returns A promise that resolves to the public address.
 */
export const getPublicAddressByMnenomic = async (mnemonic: string | Array<string>): Promise<Address> => {
    if (!mnemonic) {
        console.log("Mnemonic is required");
        process.exit(1);
    }

    if (Array.isArray(mnemonic)) {
        mnemonic = mnemonic.join(" ");
    }

    const keyPair = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });

    return wallet.address;
}

const main = async () => {
    if (!mnemonic) {
        console.log("Mnemonic is required");
        process.exit(1);
    }

    const publicKey = await getPublicAddressByMnenomic(mnemonic);

    console.log("Bounceable: ", publicKey);
    console.log("Not Bounceable: ", Address.parse(`${publicKey}`).toString({bounceable: false}));

    return publicKey;
}

if (require.main === module) {
    main();
}

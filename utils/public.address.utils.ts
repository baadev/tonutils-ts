import arg from 'arg';

import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import { Address } from "@ton/core";

require('dotenv').config();

/**
 * Returns the public address associated with a given wallet.
 * 
 * @param {WalletContractV4} [wallet] The wallet instance.
 * @returns The public address as a string.
 */
export const getPublicAddressByWallet = (wallet: WalletContractV4) => {
    return wallet.address;
};

/**
 * Returns the bounceable address for the given address.
 * 
 * e.g. EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL
 * 
 * @param {Address|string} [address] - The address to convert.
 * @returns The bounceable address as a string.
 */
export const getBouncableAddress = (address: Address | string) => {
    if (typeof address === "string") {
        address = Address.parse(address);
    }

    return address.toString({bounceable: true});
}

/**
 * Returns the non-bounceable address for the given address.
 * 
 * e.g. UQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDp0uO
 * 
 * @param {Address|string} [address] - The address to convert.
 * @returns The non-bounceable address as a string.
 */
export const getNonBouncableAddress = (address: Address | string) => {
    if (typeof address === "string") {
        address = Address.parse(address);
    }

    return address.toString({bounceable: false});
}

/**
 * Retrieves the public address associated with a given mnemonic.
 * 
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

    return getPublicAddressByWallet(wallet);
}

const main = async () => {

    const args = arg({
        '-m': String, // mnemonic to get public key from
    });
    const mnemonic = args['-m'];

    if (!mnemonic) {
        console.log("Mnemonic is required");
        process.exit(1);
    }

    const publicKey = await getPublicAddressByMnenomic(mnemonic);

    console.log("Bounceable: ", getBouncableAddress(publicKey));
    console.log("Non-Bounceable: ", getNonBouncableAddress(publicKey));

    return publicKey;
}

if (require.main === module) {
    main();
}

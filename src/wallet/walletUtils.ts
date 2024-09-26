import fs from 'fs';
import arg from 'arg';

import { mnemonicToWalletKey, mnemonicNew } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

import { getBouncableAddress, getNonBouncableAddress, getPublicAddressByWallet } from '../address/addressUtils';

require('dotenv').config();

export const createWallet = async () => {
    const mnemonic = await mnemonicNew();
    const keyPair = await mnemonicToWalletKey(mnemonic);
    const generatedWallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });

    return {
        mnemonic,
        keyPair,
        generatedWallet
    }
}

const main = async () => {

    const args = arg({
        '--save': Boolean, // save the generated mnemonic to a file
        '--log': Boolean, // log the generated mnemonic

        // Aliases
        '-s': '--save',
        '-l': '--log'
    });
    const save = args['--save'] || false;
    const log = args['--log'] || true;

    const { mnemonic, generatedWallet } = await createWallet();

    if (save) {
        fs.appendFileSync("mnemonics.txt", (
            "Public Address: " + getPublicAddressByWallet(generatedWallet) + "\n" +
            "Mnemonic: " + mnemonic.join(" ") + "\n" +
            "\n"
        ));
    }

    if (log) {
        console.log("Generated public address (bouncable): ", getBouncableAddress(generatedWallet.address));
        console.log("Generated public address (non-bouncable): ", getNonBouncableAddress(generatedWallet.address));
        console.log("Generated mnemonic: ", mnemonic);
    }
}

if (require.main === module) {
    main();
}
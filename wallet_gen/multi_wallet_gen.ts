import fs from 'fs';
import arg from 'arg';
import axios from "axios";

import { Buffer } from "buffer";

import { mnemonicToWalletKey, mnemonicNew } from "@ton/crypto";
import { WalletContractV4, internal } from "@ton/ton";
import { LiteClient, LiteSingleEngine, LiteRoundRobinEngine } from "ton-lite-client";

require('dotenv').config();

let lc: LiteClient | undefined = undefined;
let createLiteClient: Promise<void>;

const args = arg({
  '--wallets': Number, // amount of wallets to be created
  '--popup': Number, // amount of TON to be sent to each wallet
});

const initialWalletPopUpAmount = args['--popup'] || '0.01';
const walletAmountToBeCreated = args['--wallets'] || 1;

/**
 * Initializes the wallet generation process.
 */
async function main() {
  const fundingMnemonic = process.env.FUNDING_SEED; // insert a mnemonic for a wallet that has funds
  if (!fundingMnemonic) {
    console.log("FUNDING_SEED environment variable is required");
    process.exit(1);
  }

  const fundingKey = await mnemonicToWalletKey(fundingMnemonic.split(" "));
  const fundingWallet = WalletContractV4.create({ publicKey: fundingKey.publicKey, workchain: 0 });
  for (let i = 0; i < walletAmountToBeCreated; i++) {
    let m = await mnemonicNew();
    await initializeWallet(fundingWallet, m, fundingKey);
  }
}

/**
 * Initializes a wallet by generating a new mnemonic, appending it to a file, and activating the wallet.
 * @param fundingWallet The funding wallet used to send TON to the new wallet.
 * @param mnemonic The generated mnemonic for the new wallet.
 * @param fundingKey The key of the funding wallet.
 */
async function initializeWallet(fundingWallet: WalletContractV4, mnemonic: string[], fundingKey: any) {
  const key = await mnemonicToWalletKey(mnemonic);
  const generatedWallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  fs.appendFileSync("mnemonics.txt", (
    "Public Key: " + generatedWallet.address + "\n" +
    "Private Key: " +  mnemonic.join(" ") + "\n" +
    "\n"
  ));
  console.log("generated public address: ", generatedWallet.address);
  console.log("generated mnemonic: ", mnemonic);

  const client = await getLiteClient();
  let walletContract = client.open(fundingWallet);
  let seqno = await walletContract.getSeqno();
  await walletContract.sendTransfer({
    secretKey: fundingKey.secretKey,
    seqno: seqno,
    messages: [
      internal({
        to: generatedWallet.address, 
        value: initialWalletPopUpAmount.toString(),
        bounce: false,
      })
    ]
  });

  console.log(`Sending ${initialWalletPopUpAmount} TON to: `, generatedWallet.address);
  await waitForTransaction(seqno, walletContract);
  sleep(1000);
  console.log("TON sent to new wallet");

  console.log("Activating wallet by sending TON to itself");
  try {
    walletContract = client.open(generatedWallet);
    seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
      secretKey: key.secretKey,
      seqno: seqno,
      messages: [
        internal({
          to: generatedWallet.address, 
          value: '0.005',
          bounce: false
        })
      ]
    });

    await waitForTransaction(seqno, walletContract);
    console.log("Wallet activated");
  } catch (e) {
    console.error("Error activating wallet, activate it by yourself: ", e);
    return;
  }
}

/**
 * Retrieves the LiteClient instance.
 * @param _configUrl The URL of the configuration file.
 * @returns A Promise that resolves to the LiteClient instance.
 */
export async function getLiteClient(_configUrl?: any): Promise<LiteClient> {
  if (lc) {
    return lc;
  }

  if (!createLiteClient) {
    createLiteClient = (async () => {
      let data;
      if (_configUrl) {
        const { data: axiosData } = await axios(_configUrl);
        data = axiosData;
      } else {
        data = JSON.parse(fs.readFileSync('global.config.json', { encoding: 'utf8' }));
      }

      const liteServers = data.liteservers;
      const engines: any[] = [];

      for (const server of liteServers) {
        const ls = server;
        engines.push(
          new LiteSingleEngine({
            host: `tcp://${intToIP(ls.ip)}:${ls.port}`,
            publicKey: Buffer.from(ls.id.key, 'base64'),
          })
        );
      }

      const engine = new LiteRoundRobinEngine(engines);
      const lc2 = new LiteClient({
        engine,
        batchSize: 1,
      });
      lc = lc2;
    })();
  }

  await createLiteClient;

  return lc as any;
}

/**
 * Converts an integer to an IP address string.
 * @param int The integer representation of the IP address.
 * @returns The IP address string.
 */
function intToIP(int: number) {
  const part1 = int & 255;
  const part2 = (int >> 8) & 255;
  const part3 = (int >> 16) & 255;
  const part4 = (int >> 24) & 255;

  return `${part4}.${part3}.${part2}.${part1}`;
}

/**
 * Waits for a transaction to be confirmed.
 * @param seqno The sequence number of the transaction.
 * @param walletContract The wallet contract instance.
 */
async function waitForTransaction(seqno: number, walletContract: any) {
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...");
    await sleep(10000);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("transaction confirmed!");
}

/**
 * Sleeps for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @returns A Promise that resolves after the specified time.
 */
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();

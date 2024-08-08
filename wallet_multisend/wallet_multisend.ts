import fs from 'fs';
import axios from "axios";

import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, internal } from "@ton/ton";
import { LiteClient, LiteSingleEngine, LiteRoundRobinEngine } from "ton-lite-client";

require('dotenv').config();

let lc: LiteClient | undefined = undefined
let createLiteClient: Promise<void>

// receiver address
const receiver: string = process.env.RECEIVER_ADDRESS || "";

// The amount of TON to be sent to each wallet
const sendValue: string = process.env.SENT_AMOUNT || "0.06";

/**
 * Entry point of the script.
 */
async function main() {
  const fundingMnemonic = process.env.FUNDING_SEED;
  if (!fundingMnemonic) {
    console.log("FUNDING_SEED environment variable is required");
    process.exit(1);
  }

  const fundingKey = await mnemonicToWalletKey(fundingMnemonic.split(" "));
  const fundingWallet = WalletContractV4.create({ publicKey: fundingKey.publicKey, workchain: 0 });

  if (Number(process.env.SENT_COUNT) === 0) {
    while (true) {
      await sendMoney(receiver, fundingWallet, fundingKey);
    }
  } else {
    for (let i = 0; i < Number(process.env.SENT_COUNT); i++) {
      await sendMoney(receiver, fundingWallet, fundingKey);
    }
  }
}

/**
 * Sends TON from the funding wallet to the specified destination address.
 * @param destinationAddress The destination wallet address.
 * @param fundingWallet The funding wallet instance.
 * @param fundingKey The funding wallet key.
 */
async function sendMoney(destinationAddress: string, fundingWallet: WalletContractV4, fundingKey: any) {
  const client = await getLiteClient();

  const walletContract = client.open(fundingWallet);
  const seqno = await walletContract.getSeqno();

  try {
    await walletContract.sendTransfer({
      secretKey: fundingKey.secretKey,
      seqno: seqno,
      messages: [
        internal({
          to: destinationAddress,
          value: sendValue,
          bounce: true,
          body: process.env.SENT_BODY || "",
        })
      ]
    });
  } catch (e) {
    console.log("Error sending transaction: ", e);
    return;
  }

  if (process.env.SENT_DELAY) {
    await sleep(Number(process.env.SENT_DELAY) * 1000);
  } else {
    await waitForTransaction(seqno, walletContract);
  }

  console.log(`Sent ${sendValue} TON to: `, destinationAddress);
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
 * Waits for the transaction with the specified seqno to be confirmed.
 * @param seqno The sequence number of the transaction.
 * @param walletContract The wallet contract instance.
 */
async function waitForTransaction(seqno: number, walletContract: any) {
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("Waiting for transaction to confirm...");
    await sleep(10000);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("Transaction confirmed!");
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

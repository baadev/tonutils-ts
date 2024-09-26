import { Address, WalletContractV4 } from "@ton/ton";
import { ClientManager } from "../libs/client";
import { waitForTransaction } from "../src/libs/helper";

const client = await new ClientManager().connect();

export const sendTransaction = async ({ wallet: WalletContractV4, to: Address, value: bigint, body: string = '', bounce: boolean = true }) => {
    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    try {
        await walletContract.sendTransfer({
            secretKey: wallet.secretKey,
            seqno: seqno,
            messages: [
                internal({
                    to: to.toString(),
                    value: value.toString(),
                    bounce,
                    body
                })
            ]
        });
    
        await waitForTransaction(seqno, walletContract);
        console.log(`Sent ${amount} TON to: `, to.toString());
    } catch (e) {
        throw new Error(e)
    }

}
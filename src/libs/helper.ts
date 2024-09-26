/**
 * Waits for a transaction to be confirmed.
 * @param seqno The sequence number of the transaction.
 * @param walletContract The wallet contract instance.
 */
export const waitForTransaction = async (seqno: number, walletContract: any, interval: number = 1000) => {
    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        await sleep(interval);
        currentSeqno = await walletContract.getSeqno();
    }
}

/**
 * Sleeps for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @returns A Promise that resolves after the specified time.
 */
export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

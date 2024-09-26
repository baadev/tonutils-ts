import fs from 'fs';
import axios from "axios";

import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine } from "ton-lite-client";

import { WalletContractV4 } from '@ton/ton';

import { config } from '../../config';

type ClientManagerProvider = LiteClient;
const enum ClientManagerProviders {
    LiteServer = 0
}

/**
 * Midleware class to unify API for several connections ways
 */
class Client {
    clientManagerProvider: ClientManagerProvider;
    constructor (clientManagerProvider: ClientManagerProvider) {
        this.clientManagerProvider = clientManagerProvider;
    }

    open(wallet: WalletContractV4) {
        return this.clientManagerProvider.open(wallet);
    }
}
export class ClientManager {
    lc: LiteClient | undefined = undefined
    createLiteClient: Promise<void> | undefined = undefined;

    /**
     * Create a client connection, using specified provider.
     * By default using Public Lite Servers
     * 
     * @todo add TonApi
     * 
     * @param providerId 
     * @param props 
     * @returns {ClientManagerProvider} client
     */
    connect = async (providerId?: ClientManagerProviders, ...props: any[]): Promise<Client> => {
        switch (providerId) {
            case ClientManagerProviders.LiteServer:
            default:
                return new Client(await this.getLiteClient(...props));
        }
    }

    /**
     * Retrieves the LiteClient instance.
     * @param _configUrl The URL of the configuration file.
     * @returns A Promise that resolves to the LiteClient instance.
     */
    getLiteClient = async (_configUrl?: any): Promise<LiteClient> => {
        if (this.lc) {
            return this.lc;
        }

        if (!this.createLiteClient) {
            this.createLiteClient = (async () => {
                let data;

                _configUrl = _configUrl || config.LiteserverCofigURL;

                if (_configUrl) {
                    const { data: axiosData } = await axios(_configUrl);
                    data = axiosData;
                } else {
                    data = JSON.parse(fs.readFileSync(config.LiteserverPath, { encoding: 'utf8' }));
                }

                const liteServers = data.liteservers;
                const engines: any[] = [];

                for (const server of liteServers) {
                    const ls = server;
                    engines.push(
                        new LiteSingleEngine({
                            host: `tcp://${ClientManager.intToIP(ls.ip)}:${ls.port}`,
                            publicKey: Buffer.from(ls.id.key, 'base64'),
                        })
                    );
                }

                const engine = new LiteRoundRobinEngine(engines);
                const lc2 = new LiteClient({
                    engine,
                    batchSize: 1,
                });
                this.lc = lc2;
            })();
        }

        await this.createLiteClient;

        return this.lc as any;
    }


    /**
     * Converts an integer to an IP address string.
     * @param int The integer representation of the IP address.
     * @returns The IP address string.
     */
    static intToIP = (int: number) => {
        const part1 = int & 255;
        const part2 = (int >> 8) & 255;
        const part3 = (int >> 16) & 255;
        const part4 = (int >> 24) & 255;

        return `${part4}.${part3}.${part2}.${part1}`;
    }
}

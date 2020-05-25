/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { Wallets } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../../crypto-config');

async function main() {

    // Main try/catch block
    try {
        // A wallet stores a collection of identities
        const wallet = await Wallets.newFileSystemWallet('../identity/user/isabella/wallet');

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/peerOrganizations/org0.example.com/users/Admin@org0.example.dev');
        const certificate = fs.readFileSync(path.join(credPath, '/msp/signcerts/cert.pem')).toString();
        const privateKey = fs.readFileSync(path.join(credPath, '/msp/keystore/8a8a2f0decf4f5c689df870e00ca6d173cd5616555497e654be3c3d2b763fa18_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'isabella';

        const identity = {
            credentials: {
                certificate,
                privateKey
            },
            mspId: 'org0MSP',
            type: 'X.509'
        }

        await wallet.put(identityLabel,identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});

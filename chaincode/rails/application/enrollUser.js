/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

async function main() {
    try {

        const jsonString = fs.readFileSync('../../../crypto-config/connection-org0.json', 'utf8')
        const connectionProfile = JSON.parse(jsonString)
        // load the network configuration
        //let connectionProfile = yaml.safeLoad(fs.readFileSync('../crypto-config/connection-org0.json', 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = connectionProfile.certificateAuthorities['ca.org0.example.dev'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../identity/user/isabella/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const userExists = await wallet.get('isabella');
        if (userExists) {
            console.log('An identity for the client user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'org0MSP',
            type: 'X.509',
        };
        await wallet.put('isabella', x509Identity);
        console.log('Successfully enrolled client user "isabella" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll client user "isabella": ${error}`);
        process.exit(1);
    }
}

main();

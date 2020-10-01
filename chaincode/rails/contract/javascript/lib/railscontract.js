'use strict';

const { Contract, Context } = require('fabric-contract-api');
const { pack, unpack } = require('./utils');

const Token = require('./token.js');
const TokenList = require('./tokenlist.js');

class ContractContext extends Context {
    constructor() {
        super();
        this.tokenList = new TokenList(this);
    }
}

class RailsContract extends Contract {
    constructor() {
        super('rzd.rrd.rails');
    }

    createContext() {
        return new ContractContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async create(ctx, objectType, id, payload) {
      const jsonData = payload ? JSON.parse(payload) : null;

      const packedData = pack(objectType, jsonData);
      let token = Token.createInstance(objectType, id, packedData);

      await ctx.tokenList.addToken(token);

      console.log('token:', token);
      console.log('token.getPayload():', token.getPayload());

      const unpackedPayload = unpack(token.getPayload());
      delete(token.payload);
      token = { ...token, ...unpackedPayload };

      return token;
    }

    async update(ctx, objectType, id, payload) {
      const patchPayload = payload ? JSON.parse(payload) : null;

      let tokenKey = Token.makeKey([objectType, id]);
      let token = await ctx.tokenList.getToken(tokenKey);

      const storedPackedPayload = token.getPayload();
      const storedPayload = unpack(storedPackedPayload);

      const updatedPayload = { ...storedPayload, ...patchPayload };
      const updatedPackedPayload = pack(objectType, updatedPayload);
      token.setPayload(updatedPackedPayload);

      await ctx.tokenList.updateToken(token);

      const unpackedPayload = unpack(token.getPayload());
      delete(token.payload);
      token = { ...token, ...unpackedPayload };

      return token;
    }

    async retrieveHistory(ctx, objectType, id) {
      let ckey = ctx.stub.createCompositeKey('rzd.rrd.tokenlist', [objectType, id]);
      console.info('getting history for key: ' + ckey);
      let iterator = await ctx.stub.getHistoryForKey(ckey);
      let result = [];
      let res = await iterator.next();
      while (!res.done) {
        if (res.value) {
          console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
          const tok = Token.deserialize(res.value.value.toString('utf8'));
          const unpackedPayload = unpack(tok.payload);
          delete(tok.payload);
          result.push({ ...tok, ...unpackedPayload });
        }
        res = await iterator.next();
      }
      await iterator.close();
      return result;
    }

    async get(ctx, objectType, id) {
      let tokenKey = Token.makeKey([objectType, id]);
      let token = await ctx.tokenList.getToken(tokenKey);

      const unpackedPayload = unpack(token.payload);
      delete(token.payload);
      token = { ...token, ...unpackedPayload };

      return token
    }

    async getTest(ctx) {
        let tokenKey = Token.makeKey(["rail", "10"]);
        let token = await ctx.tokenList.getToken(tokenKey);

        return token
    }

    /**
     * Buy commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} currentOwner current owner of paper
     * @param {String} newOwner new owner of paper
     * @param {Integer} price price paid for this paper
     * @param {String} purchaseDateTime time paper was purchased (i.e. traded)
     */
    // async buy(ctx, issuer, paperNumber, currentOwner, newOwner, price, purchaseDateTime) {
    //
    //     // Retrieve the current paper using key fields provided
    //     let paperKey = CommercialPaper.makeKey([issuer, paperNumber]);
    //     let paper = await ctx.paperList.getPaper(paperKey);
    //
    //     // Validate current owner
    //     if (paper.getOwner() !== currentOwner) {
    //         throw new Error('Paper ' + issuer + paperNumber + ' is not owned by ' + currentOwner);
    //     }
    //
    //     // First buy moves state from ISSUED to TRADING
    //     if (paper.isIssued()) {
    //         paper.setTrading();
    //     }
    //
    //     // Check paper is not already REDEEMED
    //     if (paper.isTrading()) {
    //         paper.setOwner(newOwner);
    //     } else {
    //         throw new Error('Paper ' + issuer + paperNumber + ' is not trading. Current state = ' + paper.getCurrentState());
    //     }
    //
    //     // Update the paper
    //     await ctx.paperList.updatePaper(paper);
    //     return paper;
    // }
    //
    // /**
    //  * Redeem commercial paper
    //  *
    //  * @param {Context} ctx the transaction context
    //  * @param {String} issuer commercial paper issuer
    //  * @param {Integer} paperNumber paper number for this issuer
    //  * @param {String} redeemingOwner redeeming owner of paper
    //  * @param {String} redeemDateTime time paper was redeemed
    //  */
    // async redeem(ctx, issuer, paperNumber, redeemingOwner, redeemDateTime) {
    //
    //     let paperKey = CommercialPaper.makeKey([issuer, paperNumber]);
    //
    //     let paper = await ctx.paperList.getPaper(paperKey);
    //
    //     // Check paper is not REDEEMED
    //     if (paper.isRedeemed()) {
    //         throw new Error('Paper ' + issuer + paperNumber + ' already redeemed');
    //     }
    //
    //     // Verify that the redeemer owns the commercial paper before redeeming it
    //     if (paper.getOwner() === redeemingOwner) {
    //         paper.setOwner(paper.getIssuer());
    //         paper.setRedeemed();
    //     } else {
    //         throw new Error('Redeeming owner does not own paper' + issuer + paperNumber);
    //     }
    //
    //     await ctx.tokenList.updatePaper(paper);
    //     return paper;
    // }

}

module.exports = RailsContract;

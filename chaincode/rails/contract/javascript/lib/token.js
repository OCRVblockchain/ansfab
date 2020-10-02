'use strict';

const State = require('../ledger-api/state.js');

class Token extends State {
    constructor(obj) {
        super(Token.getClass(), [obj.objectType, obj.id]);
        Object.assign(this, obj);
    }

    getObjectType() {
      return this.objectType;
    }

    getId() {
      return this.id;
    }

    getPayload() {
      return this.payload;
    }

    setPayload(newPayload) {
      this.payload = newPayload;
    }

    // getIssuer() {
    //     return this.issuer;
    // }
    //
    // setIssuer(newIssuer) {
    //     this.issuer = newIssuer;
    // }
    //
    // getOwner() {
    //     return this.owner;
    // }
    //
    // setOwner(newOwner) {
    //     this.owner = newOwner;
    // }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    // setIssued() {
    //     this.currentState = cpState.ISSUED;
    // }
    //
    // setTrading() {
    //     this.currentState = cpState.TRADING;
    // }
    //
    // setRedeemed() {
    //     this.currentState = cpState.REDEEMED;
    // }
    //
    // isIssued() {
    //     return this.currentState === cpState.ISSUED;
    // }
    //
    // isTrading() {
    //     return this.currentState === cpState.TRADING;
    // }
    //
    // isRedeemed() {
    //     return this.currentState === cpState.REDEEMED;
    // }

    static fromBuffer(buffer) {
        return Token.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to Token
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return Token.deserializeClass(data, Token);
    }

    /**
     * Factory method to create a Token object
     */
    static createInstance(objectType, id, payload) {
        return new Token({ objectType, id, payload });
    }

    static getClass() {
        return 'rzd.rrd.token';
    }
}

module.exports = Token;
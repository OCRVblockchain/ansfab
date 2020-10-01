/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('../ledger-api/statelist.js');

const Token = require('./token.js');

class TokenList extends StateList {

    constructor(ctx) {
        super(ctx, 'rzd.rrd.tokenlist');
        this.use(Token);
    }

    async addToken(token) {
        return this.addState(token);
    }

    async getToken(tokenKey) {
        return this.getState(tokenKey);
    }

    async updateToken(token) {
        return this.updateState(token);
    }
}


module.exports = TokenList;
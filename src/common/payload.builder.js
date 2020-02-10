'use strict';


const crypto = require('crypto');

const CONFIG = require('../config.json');

class PayloadBuilder {

  constructor() { }

  generatePeerId() {
    let buffer = crypto.randomBytes(20)
    const torrentClientName = `-${CONFIG.nick}000${CONFIG.version}-`;
    console.log('torrentClientName', torrentClientName);
    Buffer.from(torrentClientName).copy(buffer, 0);

    return buffer;
  }

  buildConnectPayload() {
    // Format: connection id (8 byte) + action (4 byte) + transactionc id (4 byte)
    const buffer = Buffer.alloc(16);

    // Add connection id
    buffer.writeUInt32BE(0x417, 0);
    buffer.writeUInt32BE(0x27101980, 4);

    // Add action
    buffer.writeUInt32BE(0, 8);

    // Add transaction id (some random), TODO: have it in pattern
    crypto.randomBytes(4).copy(buffer, 12);

    return buffer;
  }

  parseConnectResponse(data) {
    // Format: action, transaction id, connection id
    const response = {
      action: data.readUInt32BE(0),
      transactionId: data.readUInt32BE(4),
      connectionId: data.slice(8)
    }
    console.log('response', response);
    return response;
  }

  buildAnnouncePayload(connectionId, torrent) {
    // Format: 
    const buffer = Buffer.allocUnsafe(98);

    // TODO: build proper payload
  }

}

module.exports = {
  PayloadBuilder
}
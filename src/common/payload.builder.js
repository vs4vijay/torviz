'use strict';


const crypto = require('crypto');

const CONFIG = require('../config.json');

class PayloadBuilder {

  constructor() { }

  static generatePeerId() {
    let buffer = crypto.randomBytes(20)
    const torrentClientName = `-${CONFIG.nick}000${CONFIG.version}-`;
    console.log('torrentClientName', torrentClientName);
    Buffer.from(torrentClientName).copy(buffer, 0);

    return buffer;
  }

  static buildHandshake(torrent) {
    // Format: pstrlen + pstr + reserved + info_hash + peer_id
    const buffer = Buffer.alloc(68);
    const pstr = "BitTorrent protocol"; // Protocol Identifier

    // Add protocol identifier length
    buffer.writeUInt8(pstr.length, 0);

    // Add protocol identifier
    buffer.write(pstr, 1);

    // Reserved for future use
    buffer.writeUInt32BE(0, 20);
    buffer.writeUInt32BE(0, 24);

    // Add info hash
    torrent.getInfoHash().copy(buf, 28);

    // Add peer id
    buffer.write(this.generatePeerId());
    return buffer;
  }

  static buildMessage(type) {
    // type: 
    const buffer = Buffer.alloc(5);

    buffer.writeUInt32BE(1, 0);

    switch (type) {
      case 'choke':
        buffer.writeUInt32BE(0, 4);
        break;
      
      case 'unchoke':
        buffer.writeUInt32BE(1, 4);
        break;
      
      case 'interested':
        buffer.writeUInt32BE(2, 4);
        break;
      
      case 'uninterested':
        buffer.writeUInt32BE(3, 4);
        break;
      
      default:
        break;
    }

  }

  static buildKeepAlive() {
    const buffer = Buffer.alloc(4);
    return buffer;
  }

  static buildHave() {

  }

  static buildBitfield() {
    
  }

  static buildRequest() {
    
  }

  static buildPiece() {
    
  }

  static buildCancel() {
    
  }

  static buildPort() {
    
  }

  static buildConnectPayload() {
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
'use strict';


const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;
const crypto = require('crypto');

const { PayloadBuilder } = require('../common');

class Tracker {

  constructor() { }

  getPeers(torrent) {
    // TODO: Iterate over announceList
    const trackerUrl = torrent.announceList[1];
    
    const url = urlParse(trackerUrl);

    if(url.protocol.startsWith('udp')) {
      const payload = 'vijay';
      return this._getPeersUDP(url, payload);
    } else {
      // TODO: HTTP Call
    }

  }

  _getPeersUDP(url, payload) {
    const socket = dgram.createSocket('udp4');

    socket.send(payload, url.port, url.host);

    socket.on('message', data => {
      console.log('data', data);
    });

  }

}

module.exports = {
  Tracker
};
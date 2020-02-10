'use strict';


const fs = require('fs');
const crypto = require('crypto');

const bencode = require('bencode');

class TorrentParser {

  static parse(filename) {
    const torrentFile = fs.readFileSync(filename);

    const torrent = bencode.decode(torrentFile);

    return torrent;
  }

  static getInfoHash(torrent) {
    const info = bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
  }

}


module.exports = {
  TorrentParser
};
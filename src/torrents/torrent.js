'use strict';


const { TorrentParser } = require('./torrent.parser');

class Torrent {

  constructor(torrentFile) {
    const parsedTorrent = TorrentParser.parse(torrentFile);

    this.announce = parsedTorrent.announce.toString('utf-8');
    this.announceList = parsedTorrent['announce-list'].toString('utf-8').split(',');

    this.comment = parsedTorrent.announce.toString('utf-8');
    this.createdBy = parsedTorrent['created by'] && parsedTorrent['created by'].toString('utf-8');
    this.createdDate = parsedTorrent['creation date'];

    this.info = {
      name: parsedTorrent.info.name.toString('utf-8'),
      length: parsedTorrent.info.length,
      pieceLength: parsedTorrent.info['piece length'],
      urlList: parsedTorrent.info['url-list'],
      files: parsedTorrent.info.files,
      // pieces: parsedTorrent.info.pieces.toString('utf-8'),
    };

    this.info.pieces = parsedTorrent.info.pieces.map(piece => piece);

    this.parsedTorrent = parsedTorrent;
  }

  getInfoHash() {
    return TorrentParser.getInfoHash(this.parsedTorrent);
  }

  getSize() {
    const files = this.info.files;
    // handling multiple files too
    const size = files ? files.map(file => file.length).reduce((a, b) => a + b) : torrent.info.length;
    // TODO: Handle size values larger then 32-bit integer
    return size;
  }

}

module.exports = {
  Torrent
};
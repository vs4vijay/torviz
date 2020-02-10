#!/usr/bin/env node

'use strict';


const { Torrent } = require('./src/torrents');
const { Tracker } = require('./src/trackers');

const CONFIG = require('./src/config.json');

console.log('CONFIG', CONFIG);


const log = (...args) => {
  console.log(...args);
};

const main = (torrentFile) => {
  log(`[+] Starting ${CONFIG.name}`);

  const torrent = new Torrent(torrentFile);
  const infoHash = torrent.getInfoHash();

  log('infoHash', infoHash);
  log('size', torrent.getSize());
  log('torrent', torrent);

  // log('torrent.announce', torrent.announce.toString('utf-8'));
  // log('torrent.comment', torrent.comment.toString('utf-8'));
  // log('torrent.info.name', torrent.info.name.toString('utf-8'));

  const tracker = new Tracker();

  const peers = tracker.getPeers(torrent);

  log('peers', peers);

};


if(require.main == module) {
  const torrentFile = process.argv[2] || 'data/kali.torrent';
  main(torrentFile);
}

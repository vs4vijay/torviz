# torviz
A torrent client for fun and learning

---

## Knowledge Space

- uses "bencode"
- Components:
  - metadata
  - peers
  - tracker
  - torrent client
  - data
- Peer TCP Ports - `6881-6999`
- Tracker:
  - Ports - `6969,1337`
  - Retry Interval - 2^n * 15 seconds
  - **HTTP APIs**: 
    - `GET /file?info_hash=<hash>`
      - **Parameters**:
        - info_hash=
        - peer_id=
        - ip=
        - port=
        - downloaded=
        - left=
        - event=
  - **UDP Actions**:
    - 0: connect
    - 1: announce
    - 2: scrape
    - 3: error
  - **UDP Events**:
    - 0: none
    - 1: completed
    - 2: started
    - 3: stopped 


---

## References

- https://wiki.theory.org/index.php/BitTorrentSpecification
- http://www.bittorrent.org/beps/bep_0003.html
- https://www.morehawes.co.uk/the-bittorrent-protocol

---

## ToDo

- [ ] Add Working Torrent Client
- [ ] Add Magnet Link Support
- [ ] Add TUI based on ncurses using 'blessed'
- [ ] Support DHT
- [ ] Implement PeX (Peer Exchange)

---

### Development Notes

- Data Models:
  - TorrentClient
  - Torrent
  - Tracker
  - Peer


```


Response Codes:
100 	Invalid request type: client request was not a HTTP GET.
101 	Missing info_hash.
102 	Missing peer_id.
103 	Missing port.
150 	Invalid infohash: infohash is not 20 bytes long.
151 	Invalid peerid: peerid is not 20 bytes long.
152 	Invalid numwant. Client requested more peers than allowed by tracker.
200 	info_hash not found in the database. Sent only by trackers that do not automatically include new hashes into the database.
500 	Client sent an eventless request before the specified time.
900 	Generic error. 


Peer Messages:
0 - choke
1 - unchoke
2 - interested
3 - not interested
4 - have
5 - bitfield
6 - request
7 - piece
8 - cancel



magnet:?xt=urn:btih:0268093E046D13A58DA18116106AA429D648D421&dn=%5Bmonova.org%5D+kali-linux-2020-1-installer-netinst-amd64-iso&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969


In TCP:
- need to 'connect'


In UDP:
- 'connect' is not required


```

# Angular Chrome Extension for Transmission Daemon
### Using the [Official Spec](https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt)

Chrome extension which has a context menu which takes the torrent link, passes it to an angular service which GETs the torrent and encodes it into base64 which is then POSTed to the transmission-daemon

The popout consists of one page ~ the torrent list.

The torrent list has buttons to delete the torrent and data, stop torrent.. but aside from that it's not supposed to be a fully fledged client.

![Context Menu](screens/contextmenu.png "Context Menu")
![Popout](screens/popout.png "Popout")

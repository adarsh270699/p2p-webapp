export const readAndSendFile = (file: File, dc: RTCDataChannel) => {
  function callback(data: ArrayBuffer) {
    if (dc.bufferedAmount > dc.bufferedAmountLowThreshold) {
      return false;
    }
    dc.send(data);
    return true;
  }

  function parseFile(
    file: File,
    callback: (data: ArrayBuffer) => boolean,
    dc: RTCDataChannel
  ) {
    const fileSize = file.size;
    const chunkSize = 16 * 1024;
    let offset = 0;
    const inFlightState: InFlightState = {
      size: fileSize,
      type: file.type,
      name: file.name,
      totalPackets: Math.ceil(fileSize / chunkSize),
      receivedPackets: 0,
      percent: 0,
      speed: 0,
    };

    const readEventHandler = function (
      this: FileReader,
      evt: ProgressEvent<FileReader>
    ) {
      if (offset >= fileSize) {
        return;
      }
      if (evt.target) {
        if (evt?.target?.error) {
          dc.close();
          return;
        } else if (evt.target.result && typeof evt.target.result !== "string") {
          if (callback(evt.target.result)) {
            offset += evt.target.result.byteLength;
          }
        }
      }
      chunkReaderBlock(offset, chunkSize, file);
    };

    const chunkReaderBlock: (
      _offset: number,
      length: number,
      _file: File
    ) => void = function (_offset, length, _file) {
      const r = new FileReader();
      const blob = _file.slice(_offset, length + _offset);
      r.readAsArrayBuffer(blob);
      r.onload = readEventHandler;
    };

    dc.send(`start;${JSON.stringify(inFlightState)}`);
    chunkReaderBlock(offset, chunkSize, file);
  }
  parseFile(file, callback, dc);
};

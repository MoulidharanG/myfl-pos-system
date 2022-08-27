const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel, func) {
      const validChannels = [
        'ipc-get-printer-response',
        'ipc-printer-error-response',
      ];

      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = [];

      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },

  printerApi: {
    printRequest(data) {
      ipcRenderer.send('ipc-print-request', data);
    },
    getPrinters() {
      ipcRenderer.send('ipc-get-printer-request');
    },
  },

  is_electron: true,
});

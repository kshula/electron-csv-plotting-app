const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    loadCSV: (filePath) => ipcRenderer.invoke('load-csv', filePath),
    plotColumn: (data, column) => ipcRenderer.invoke('plot-column', data, column)
});

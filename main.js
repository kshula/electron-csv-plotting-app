const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const plotly = require('plotly')('username', 'apiKey'); // Replace with your Plotly username and API key

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile('index.html');
}

// Open file dialog
ipcMain.handle('open-file-dialog', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'CSV Files', extensions: ['csv'] }]
    });
    return result.filePaths;
});

// Load CSV and process data
ipcMain.handle('load-csv', async (event, filePath) => {
    return new Promise((resolve, reject) => {
        let rows = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('headers', (headers) => {
                rows.push(headers); // Push headers as first row
            })
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
});

// Plot column data against Date
ipcMain.handle('plot-column', async (event, data, column) => {
    const headers = data[0];
    const rows = data.slice(1);
    const dateColumn = headers[0];
    const xValues = rows.map(row => row[dateColumn]);
    const yValues = rows.map(row => row[column]);

    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter'
    };
    const layout = {
        title: `Plot of ${column} against ${dateColumn}`,
        xaxis: { title: dateColumn },
        yaxis: { title: column }
    };
    const figure = { data: [trace], layout: layout };

    return new Promise((resolve, reject) => {
        plotly.plot(figure, (err, msg) => {
            if (err) return reject(err);
            resolve(msg.url);
        });
    });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

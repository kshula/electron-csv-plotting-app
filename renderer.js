document.getElementById('selectCsvButton').addEventListener('click', async () => {
    const filePaths = await window.electronAPI.openFileDialog();
    if (filePaths.length > 0) {
        const filePath = filePaths[0];
        document.getElementById('csvFilePath').value = filePath;
        const data = await window.electronAPI.loadCSV(filePath);
        displayFirstFiveRows(data);
        populateColumnNames(data[0]); // Pass the header row to populate column names
    }
});

document.getElementById('plotColumnButton').addEventListener('click', async () => {
    const column = document.getElementById('columnSelect').value;
    const filePath = document.getElementById('csvFilePath').value;
    const data = await window.electronAPI.loadCSV(filePath);
    const plotUrl = await window.electronAPI.plotColumn(data, column);
    document.getElementById('plotUrl').textContent = `Plot URL: ${plotUrl}`;
});

function displayFirstFiveRows(data) {
    const table = document.getElementById('csvTable');
    table.innerHTML = ''; // Clear previous content
    data.slice(0, 5).forEach(row => {
        const rowElement = document.createElement('tr');
        Object.values(row).forEach(cell => {
            const cellElement = document.createElement('td');
            cellElement.textContent = cell;
            rowElement.appendChild(cellElement);
        });
        table.appendChild(rowElement);
    });
}

function populateColumnNames(headers) {
    const columnSelect = document.getElementById('columnSelect');
    columnSelect.innerHTML = ''; // Clear previous options
    headers.slice(1).forEach(header => { // Skip the Date column
        const option = document.createElement('option');
        option.value = header;
        option.textContent = header;
        columnSelect.appendChild(option);
    });
}

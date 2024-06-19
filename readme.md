# Electron CSV Plotting App

This Electron application allows users to load a CSV file, display the first five rows of the CSV, and plot a selected column against the date column. The date column is assumed to be the first column in the CSV file.

## Features

- Select a CSV file from your file system.
- Display the first five rows of the selected CSV file.
- Dynamically populate a dropdown menu with column names from the CSV (excluding the date column).
- Plot a selected column against the date column using Plotly.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Electron](https://www.electronjs.org/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/electron-csv-plotting-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd electron-csv-plotting-app
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```

### Usage

1. Start the application:
    ```bash
    npm start
    ```

2. Click on the "Select CSV File" button to open a file dialog and choose a CSV file.
3. The first five rows of the CSV file will be displayed in a table.
4. Select a column from the dropdown menu to plot against the date column.
5. Click the "Plot Column" button to generate a plot using Plotly. The plot URL will be displayed below the button.

### Project Structure


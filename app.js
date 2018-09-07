const { CSV } = require("./models/csv");
const fs = require('fs');
const fastcsv = require('fast-csv');

function SaveCsvToDatabase(filePath, callback) {
    if (!fs.existsSync(filePath)) {
        callback('File not Exists!');
        return;
    }
    //todo Add more condition to check if the file is valid csv file or not
    const stream = fs.createReadStream(filePath);
    let csvToSave = new CSV();
    csvToSave.fileName = filePath.replace(/^.*[\\\/]/, '');
    let csvStream = fastcsv()
        .on('data', (data) => {
            csvToSave.rows.push({
                cells: data
            });
        }).on('end', async () => {
            let message = '';
            try {
                await csvToSave.save();
                message = 'Data imported successfully';
            } catch (error) {
                message = error.message;
            }
            callback(message);
        });

    stream.pipe(csvStream);
}

exports.SaveCsvToDatabase = SaveCsvToDatabase;
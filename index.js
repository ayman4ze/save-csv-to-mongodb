const { SaveCsvToDatabase } = require('./app');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/csvs', {
    useNewUrlParser: true
});

let message = '-> (Enter your CSV file path and name or type exit to quit)';
console.log(message);
rl.setPrompt(`${message}\n`);
rl.on('line', (filePath) => {
    if (filePath.toLowerCase().trim() === 'exit') {
        rl.close();
    } else {
        SaveCsvToDatabase(filePath, (result) => {
            console.log(result);
            rl.prompt();
        });
    }
}).on('close', () => {
    process.exit();
});
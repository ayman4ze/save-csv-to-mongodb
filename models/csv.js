const mongoose = require('mongoose');

const CSV = mongoose.model('CSV', new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  rows:[{
    cells: []
  }]
}));

exports.CSV = CSV;
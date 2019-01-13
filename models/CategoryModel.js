const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    title: {
        type: String,
        required: true
    }


});

module.exports = {Category: mongoose.model('category', CategorySchema )};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    body: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    date: {
        type: Date,
        default: Date.now()
    },
    
    commentIsApproved: {
        type: Boolean,
        default: false
    }


});

module.exports = {Comment: mongoose.model('comment', CommentSchema)};
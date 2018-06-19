const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: 'Please, enter the name'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Todos', TodoSchema);

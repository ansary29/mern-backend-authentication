const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    number:{
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Profiles', profileSchema);
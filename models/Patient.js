const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    illness: {
        type: String,
        required: [true, 'Please choose an illness']
    },
    pain: {
        type: Number,
        required: [true, 'Please choose a pain level']
    }
})

module.exports = mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
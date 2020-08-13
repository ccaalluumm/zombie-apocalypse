const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    illness: {
        type: String,
        required: [true, 'Please choose an illness']
    },
    pain: {
        type: Number,
        required: [true, 'Please choose a pain level']
    },
    hospital: {
        type: String,
        required: [true, 'Please choose a hospital']
    }
})

module.exports = mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
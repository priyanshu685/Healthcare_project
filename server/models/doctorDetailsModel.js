// {
//     name,
//     email,
//     speciality,
//     phonenumber,
//     experience,
//     address
// }
const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    speciality: { type: String, required: true },
    phonenumber: { type: String, required: true },
    experience: { type: Number, required: true },
    address: { type: String, required: true }
});

const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;

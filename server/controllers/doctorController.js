const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");

// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty, phoneNumber, experience, address } = req.body;

  if (!name || !email || !specialty || !phoneNumber || !experience || !address) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if doctor already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists with this email" });
  }

  // Create a new doctor instance
  const newDoctor = await Doctor.create({
    name,
    email,
    specialty,
    phoneNumber,
    experience,
    address
  });

  //Testting
  
  //testing end
  res.status(201).json({
    message: "Doctor registered successfully",
    doctor: newDoctor
  });
});

//get all docs
const getAllDoctors = asyncHandler(async (req,res) => {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
})
//get doctor by id
const getDoctorbyId = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);

    if(!doctor) {
        res.status(404);
        throw new Error("Doctor not found");
    }
    res.status(200).json(doctor);
});
module.exports = { registerDoctor, getAllDoctors, getDoctorbyId };
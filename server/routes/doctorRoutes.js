const express = require("express");
const router = express.Router();
const { registerDoctor, getAllDoctors, getDoctorbyId } = require("../controllers/doctorController");
const {jwtAuthMiddleware} = require("../middlewares/JwtMiddleware");

router.post("/register", registerDoctor);
//get all docs
router.get("/", getAllDoctors);

router.get('/:id',getDoctorbyId);

module.exports = router;
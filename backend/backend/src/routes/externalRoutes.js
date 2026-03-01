const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const axios = require("axios");

// GET clima - PROTEGIDA
router.get("/weather", protect, async (req, res) => {
  try {
    const city = req.query.city || "Dallas";

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    res.json({
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    });

  } catch (error) {
    res.status(500).json({ message: "Error al obtener clima" });
  }
});

module.exports = router;
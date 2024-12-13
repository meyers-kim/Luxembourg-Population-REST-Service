const express = require('express');
const populationController = require('./controllers/populationController');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Luxembourg Population Service! Use the endpoint /population/:year to get population data by year. Example: /population/2020');
});

app.get('/population/:year', populationController.getPopulationData);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
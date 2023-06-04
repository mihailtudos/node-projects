const express = require('express');
const path = require('path');
require ('dotenv/config');
const PORT = process.env.PORT || 3000;

const publicPath = express.static(path.join(__dirname, '../public'));

const app = express();
app.use(publicPath);

app.get('/weather', (req, res) => {
    res.send("weater page");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} 🔥🔥🔥`)
});

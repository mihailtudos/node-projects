const express = require('express');
const path = require('path');
require ('dotenv/config');
const PORT = process.env.PORT || 3000;

const publicPath = express.static(path.join(__dirname, '../public'));

const app = express();
app.use(publicPath);
app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Mihail Tudos"
    });
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/help', (req, res) => {
    res.render("help");
});


app.get('/weather', (req, res) => {
    res.send("weater page");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} 🔥🔥🔥`)
});

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { geocode, forecast } = require('./utils');
require ('dotenv/config');

const PORT = process.env.PORT || 3000;

const publicPath = express.static(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
app.use(publicPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Mihail Tudos",
        author: "Mihail Tudos",
        message: "Use this website to get weather info"
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About - Weather app",
        name: "Mihail Tudos",
        author: "Mihail Tudos",
    });
});

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help - Weather app",
        name: "Mihail Tudos",
        author: "Mihail Tudos",
    });
});


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide a search"
        });
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (err, response) => {
            if (err) {
                return res.send({ error: err })
            }

            res.send({
                weather: response,
                location,
                address
            });
            
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        author: 'Mihail Tudos',
        message: "Page not found..."
    });
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} 🔥🔥🔥`)
});

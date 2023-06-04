import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.static('public'))
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/help', (req, res) => {
    res.send("help page");
});

app.get('/about', (req, res) => {
    res.send("about page");
});

app.get('/weather', (req, res) => {
    res.send("weater page");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} 🔥🔥🔥`)
});

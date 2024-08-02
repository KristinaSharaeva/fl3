const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [firstName, lastName, email, hashedPassword], function (err) {
        if (err) {
            return res.status(500).send('Error saving user');
        }
        res.redirect('/welcome');
    });
});

app.get('/welcome', (req, res) => {
    res.send('зарегился');
});

app.listen(3000, () => {
    console.log('сервер');
});


require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}));

// Funktion til at lave matematik opgaven
function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1; 
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer;
    switch(operator) {
        case '+': answer = num1 + num2; break;
        case '-': answer = num1 - num2; break;
        case '*': answer = num1 * num2; break;
    }

    return { question: `${num1} ${operator} ${num2}`, answer: answer };
}

// Login endpoint
app.get('/login', (req, res) => {
    // Generer en opgave hver gang siden indlæses
    const problem = generateMathProblem();
    // Gemmer FACIT i brugerens session på serveren
    req.session.expectedAnswer = problem.answer; 
    // Send spørgsmålet ud til EJS-skabelonen
    res.render('login', { 
        question: problem.question, 
        error: req.query.error
    });
});

// POST-rute: Modtager brugerens svar og tjekker det
app.post('/login', (req, res) => {
    // String til et tal
    const userAnswer = parseInt(req.body.answer, 10);
    // Tjekker om brugerens svar matcher det, der er gemt i sessionen
    if (userAnswer === req.session.expectedAnswer) {
        // Succes!
        req.session.loggedIn = true;
        res.redirect('/dashboard');
    } else {
        // Fejl!
        res.redirect('/login?error=Forkert svar. Her er en ny opgave!');
    }
});

// En beskyttet side, man kun må se, hvis man har løst opgaven
app.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.send('<h1>Velkommen ind! Du har løst opgaven.</h1><br><a href="/logout">Log ud</a>');
    } else {
        res.redirect('/login');
    }
});

// Log ud endpoint
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveren kører sikkert på http://localhost:${PORT}/login`);
});
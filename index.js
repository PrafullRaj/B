const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample User Data (replace with real user info)
const userData = {
    full_name: "prafull_raj",
    dob: "03112002",
    email: "prafull_raj@srmap.edu.in",
    roll_number: "AP21110011016"
};

// Utility function to extract numbers and alphabets
const extractData = (inputArray) => {
    const numbers = [];
    const alphabets = [];
    
    inputArray.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item);
        }
    });

    // Determine highest alphabet (case insensitive)
    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]] : [];

    return { numbers, alphabets, highestAlphabet };
};

// POST endpoint to handle /bfhl requests
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input. Expected an array."
        });
    }

    const { numbers, alphabets, highestAlphabet } = extractData(data);

    // Response with extracted information
    return res.status(200).json({
        is_success: true,
        user_id: `${userData.full_name}_${userData.dob}`,
        email: userData.email,
        roll_number: userData.roll_number,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET endpoint to handle /bfhl requests
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

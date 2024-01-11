const express = require("express");

const app = express();

// Gets numberes
function getNumsArray(nums) {
    if (!nums) {
        throw new Error("Numbers are required!");
    }

    return nums.split(",").map((num) => {
        const parsedNum = parseFloat(num);
        if (isNaN(parsedNum)) {
            throw new Error(`${num} is not a number.`);
        }
        return parsedNum;
    });
}

// Calc mean
function calculateMean(numbers) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Calc median
function calculateMedian(numbers) {
    const sortedNums = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedNums.length / 2);

    if (sortedNums.length % 2 === 0) {
        return (sortedNums[middle - 1] + sortedNums[middle]) / 2;
    } else {
        return sortedNums[middle];
    }
}

// Calc mode
function calculateMode(numbers) {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];

    numbers.forEach((number) => {
        frequency[number] = (frequency[number] || 0) + 1;
        if (frequency[number] > maxFreq) {
            maxFreq = frequency[number];
        }
    });

    for (const number in frequency) {
        if (frequency[number] === maxFreq) {
            modes.push(Number(number));
        }
    }
    return modes.length === 1 ? modes[0] : modes;
}

// MEAN ROUTE
app.get("/mean", function (req, res) {
    // gets the average of the numberes
    try {
        const numberes = getNumsArray(req.query.nums);
        const mean = calculateMean(numberes);
        res.json({
            operation: "mean",
            value: mean,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// MEDIAN ROUTE
app.get("/median", function (req, res) {
    // gets the midpoint of the numberes
    try {
        const numbers = getNumsArray(req.query.nums);
        const median = calculateMedian(numbers);
        res.json({
            operation: "median",
            value: median,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// MODE ROUTE
app.get("/mode", function (req, res) {
    // gets the most frequent number
    try {
        const numbers = getNumsArray(req.query.nums);
        const mode = calculateMode(numbers);
        res.json({
            operation: "mode",
            value: mode,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Always put this at the bottom of the file
app.listen(3000, () => {
    console.log("SERVER RUNNING ON PORT 3000");
});

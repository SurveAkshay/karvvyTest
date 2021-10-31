const express = require('express');
const cors = require('cors');
const path = require('path');
const countryRouter = require('./routers/country');

const app = express();
const port = 8000;

app.use(cors());
app.use('/static', express.static(path.join(__dirname, '../images')))
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(countryRouter);

app.listen(port, () => {
    console.log("Server is up on port", port);
})

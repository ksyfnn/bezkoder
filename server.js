const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended : true }));

app.get("/", (req, res) => {
    res.json({ message : "wellcomeback"})
});

require('./app/routes/route')(app);

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
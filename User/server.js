const express = require('express');
const cors = require('cors');
const app = express();


const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('./config/db_conn');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/users", require("./routes/userRouter"))



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

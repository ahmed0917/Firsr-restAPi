const mongoose = require("mongoose")

const db = "mongodb://localhost:27017/students-api"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log("Not connected", e);
});

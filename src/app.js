const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

require("./database/connection")
const student = require("./models/students");

app.use(express.json());
// app.use(express.static(path.join(__dirname,"models")))
// app.use(express.static(path.join(__dirname,"database")))

// GET
app.get("/students", async (req, res) => {
    try {
        const studentsData = await student.find()
        res.send(studentsData)
    }
    catch (e) {
        res.send(e)
    }
});

// GET the individual Student Data using API
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const studentData = await student.findById(_id)
        // console.log(studentData)

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData)
        }
    }
    catch (e) {
        res.send(e)
    }
});

// POST
app.post("/students/", (req, res) => {
    // console.log(req.body);

    const users = new student(req.body);
    users.save().then(() => {
        res.status(201).send(users);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// UPDATE the individual Student Data using API
app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const studData = await student.findByIdAndUpdate(_id, req.body,{new:true});
        if (!studData) {
            return res.status(404).send();
        } else {
            res.send(studData)
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

// DELETE the individual Student Data using API
app.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const deleteData = await student.findByIdAndDelete(_id);
        if (!deleteData) {
            return res.status(400).send();   
        }
        res.send(deleteData)
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`Connections is setup at ${port}`);
});
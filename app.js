const express = require("express");
const path = require("path");
const db = require('./models');
const Student = require('./models/Student');
const app = express();
const ejsMate = require('ejs-mate');
const methodOverride = require("method-override");
const Students = require("./models/Student");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Landing Page
app.get("/", (req, res) => {
    res.render("home");
})

// Click to visit where student will search his marks
app.get("/student", (req, res) =>{
    res.render("students/student")
})

// Logout
app.get("/home", (req, res) =>{
    res.render("home")
})

// 
app.post("/student", async (req, res) => {
    const {RollNumber, Name} = req.body.student;
    const student = await Students.findOne({where: {RollNumber: RollNumber, Name: Name}});
    if(student === null){
        res.redirect("/student");
    }
    res.redirect(`students/${student.RollNumber}`);
})

// Click to visit table
app.get("/students", async (req, res) => {
    const students = await Students.findAll();
    res.render("students/index", {students});
})

// Click to visit where teacher will enter student's details
app.get("/students/new", (req, res) => {
    res.render("students/new");
})

// 
app.post("/students", async (req, res) => {
    const student = await Students.create(req.body.student);
    if(students === null){ // s in students is for create record page
        return res.redirect("/students");
    }
    res.redirect(`students/${student.RollNumber}`);
})

// Click to visit where student will get his marks
app.get("/students/:RollNumber", async (req, res) => {
    const student = await Students.findByPk(req.params.RollNumber);
    if(student === null){
        res.redirect("/student");
    }
    res.render("students/show", {student});
})

// Click to visit table
app.delete("/students/:RollNumber", async (req, res) =>{
    await Students.destroy({where: {RollNumber: req.params.RollNumber}});
    res.redirect("/students/index")
})

// Click to edit records
app.get("/students/:rollNumber/edit", async (req, res) => {
    const student = await Students.findByPk(req.params.rollNumber);
    if(student == null){
        return redirect("/students");
    }
    res.render('students/edit', {student});
})

// Patch
app.patch("/students/:rollNumber", async (req, res) =>{
    await Students.update(req.body.student, {where: {RollNumber: req.params.rollNumber}});
    res.redirect("/students");
})

// Port
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`serving on port ${port}`);
})
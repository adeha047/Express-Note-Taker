const express = require('express');
let path = require ('path')
let app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = []; 

app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.post("/api/notes", (req, res) => {
    let data = req.body;
    console.log(data);
    notes.push(data)
    console.log(notes)

}); 




app.listen(PORT, function () {
    console.log("Server is listening on PORT: " + PORT);
})
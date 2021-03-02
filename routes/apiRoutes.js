const database = require("../db/db.json")

const fs = require("fs");


module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // when a user visits a link (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/notes", function(req, res) {
      res.json(database);
    });
  
}  

app.post("/api/notes", (req, res) => {
    const notesJson = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    const notes = JSON.parse(notesJson)
    let data = req.body;
    console.log(data);
    database.push(data)
    console.log(data)
    const uniqueId = Math.floor(Math.random() * 100000);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
  res.json(notes);
}); 

app.delete("/api/notes", (req, res) => {

}); 




// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
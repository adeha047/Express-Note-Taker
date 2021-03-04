const database = require("../db/db.json")
const path = require("path")
const fs = require("fs");
const { waitForDebugger } = require("inspector");


module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // when a user visits a link (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    const notesJson = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    const notes = JSON.parse(notesJson)
    res.json(notes);
  });



  app.post("/api/notes", (req, res) => {
    const notesJson = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    const notes = JSON.parse(notesJson)
    const uniqueId = Math.floor(Math.random() * 100000);
    let data = {
      id: uniqueId,
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(data)
    console.log(data)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
    res.json(data);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const selectedNote = parseInt(req.params.id);
    // console.log(selectedNote)
    const notesJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    const filteredNotes = notesJson.filter(note => note.id != selectedNote)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(filteredNotes))
    res.end()
  });
}




// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
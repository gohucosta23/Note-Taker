
const fs = require("fs");


// Exporting the apis to the server.
module.exports = function(app){
    //Array storing all the notes.
    const note = [];

    // Getting all the notes
    app.get("/api/notes", function(req, res){
        
        //This is very important, sends the response to the front end.
        res.json(note);
    });
    
    // Pushing the notes inside of the NOTE array 
    app.post("/api/notes", function(req, res){   
        
        note.push(req.body);
        note.forEach((element, index) => element.id = index + 1);
        //Creating the file where the data is going to be stored.
            fs.writeFile("./db/db.json", JSON.stringify(note), function(err){
        
                if (err) throw err;
                res.json(note);
                console.log("File saved");
            });        
    });
//Deletes notes when the user clicks on the delete button
//Searches the database for the spacific ID of the note
    app.delete("/api/notes/:id", function(req, res){
        
        const noteId = req.params.id; 

        //This is very important, sends the response to the front end.
        res.json(note); 

            //Filtering to find the note that matches the ID of the note to be deleted
            const noteToDelete = note.filter(note => note.id === noteId)                         
            const indexNoteToDelete = note.indexOf(noteToDelete[0]);
            // Removing that note from the NOTE array 
            note.splice(indexNoteToDelete, 1);
            
                // Writing the database file with the updated notes
                fs.writeFile("./db/db.json", JSON.stringify(note), function(err){
    
                    if(err) throw err;
                    
                    console.log("Item deleted");
                });                        
        });    
    
}

let notes = ['Banana', 'Rasen mähen'];

 function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        contentRef.innerHTML += getNoteTemplate(note);
    }
 }

 function getNoteTemplate(note) {
    return `<p>+ ${note}</p>`;
 }


//Notizen hinzufügen
function addNote() {
    let noteInputRef = document.getElementById("note_input");
    let noteInput = noteInputRef.value;

    notes.push(noteInput);
    renderNotes();
    



}
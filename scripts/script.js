let notes = getFromStorage('notes');
let trashNotes = getFromStorage('trashNotes');
let archiveNotes = getFromStorage('archiveNotes');
let editIndex = null;

function saveData() {
    saveToStorage({ notes, trashNotes, archiveNotes });
}

function renderNotes() {
    const contentRef = document.getElementById('content');
    contentRef.innerHTML = notes.length === 0
        ? emptyListTemplate('No notes yet.')
        : notes.map((n, i) => noteCardTemplate({ ...n, text: previewText(n.text, 10) }, i, noteButtons(i))).join('');
    renderModal();
}

function noteButtons(i) {
    return [
        buttonTemplate('Edit', `editNote(${i})`),
        buttonTemplate('Delete', `deleteNote(${i})`),
        buttonTemplate('Archive', `archiveNote(${i})`)
    ].join('');
}

function addNote() {
    const titleRef = document.getElementById('note_title');
    const textRef = document.getElementById('note_input');
    let title = titleRef.value.trim();
    let text = textRef.value.trim();
    if (!title || !text) return titleRef.value = textRef.value = '';
    if (title.length > 15) title = title.substring(0, 15);
    const note = { title, text };
    if (editIndex !== null) notes[editIndex] = note, editIndex = null;
    else notes.push(note);
    saveData();
    titleRef.value = textRef.value = '';
    renderNotes();
}

function validateInputs() {
    const titleRef = document.getElementById('note_title');
    const textRef = document.getElementById('note_input');
    let title = titleRef.value.trim();
    let text = textRef.value.trim();
    
    if (!title && !text) return showMessage('Please fill in both fields: Title and Note'), false;
    if (!title) return titleRef.focus(), showMessage('Please enter a title'), false;
    if (!text) return textRef.focus(), showMessage('Please enter a note'), false;
    
    return { title, text };
}

function addNoteWithValidation() {
    const inputs = validateInputs();
    if (!inputs) return;
    
    let { title, text } = inputs;
    if (title.length > 15) title = title.substring(0, 15);
    
    const note = { title, text };
    if (editIndex !== null) notes[editIndex] = note, editIndex = null;
    else notes.push(note);
    
    saveData();
    document.getElementById('note_title').value = document.getElementById('note_input').value = '';
    renderNotes();
}

function noteCardTemplate(note, i, buttonsHtml = '') {
    return `<div class="note-card" onclick="openModal(${i})" style="background:#222;color:#fff;border-radius:16px;padding:24px 16px 16px 16px;margin:16px 0;position:relative;box-shadow:0 2px 8px #0002;cursor:pointer;max-width:220px;text-align:center;display:inline-block;">
        <div style=\"font-weight:bold;font-size:1.2em;margin-bottom:18px;\">${note.title}</div>
        <div style=\"margin-bottom:18px;\">${note.text}</div>
        <div style=\"display:flex;justify-content:center;gap:8px;\" onclick=\"event.stopPropagation();\">${buttonsHtml}</div>
    </div>`;
}

function openModal(index) {
    closeModal();
    const n = notes[index];
    document.body.insertAdjacentHTML('beforeend', modalTemplate(n.title, n.text));
}

function deleteNote(i) { trashNotes.push(notes.splice(i, 1)[0]); saveData(); renderNotes(); }
function archiveNote(i) { archiveNotes.push(notes.splice(i, 1)[0]); saveData(); renderNotes(); }
function editNote(i) {
    document.getElementById('note_title').value = notes[i].title;
    document.getElementById('note_input').value = notes[i].text;
    editIndex = i;
}
function deleteData() { ['notes','trashNotes','archiveNotes'].forEach(k=>localStorage.removeItem(k)); }
function renderModal() { closeModal(); }
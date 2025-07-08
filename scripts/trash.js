let trashNotes = getFromStorage('trashNotes');
let notes = getFromStorage('notes');

function saveData() {
    saveToStorage({ notes, trashNotes });
}

function deleteData() {
    localStorage.removeItem('notes');
    localStorage.removeItem('trashNotes');
}

function renderTrash() {
    let trashContent = document.getElementById('trash_content');
    trashContent.innerHTML = '';
    if (trashNotes.length === 0) {
        trashContent.innerHTML = emptyListTemplate('No notes in trash.');
        return;
    }
    for (let i = 0; i < trashNotes.length; i++) {
        let buttons =
            buttonTemplate('Restore', `restoreFromTrash(${i})`) +
            buttonTemplate('Delete', `deleteFromTrash(${i})`);
        trashContent.innerHTML += noteCardTemplate(trashNotes[i], i, buttons);
    }
}

function deleteFromTrash(index) {
    trashNotes.splice(index, 1);
    saveData();
    renderTrash();
}

function restoreFromTrash(index) {
    let restored = trashNotes.splice(index, 1)[0];
    notes.push(restored);
    saveData();
    renderTrash();
}

function openModal(index) {
    closeModal();
    const note = trashNotes[index];
    document.body.insertAdjacentHTML('beforeend', modalTemplate(note.title, note.text));
} 
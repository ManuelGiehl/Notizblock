let archiveNotes = getFromStorage('archiveNotes');
let notes = getFromStorage('notes');
let trashNotes = getFromStorage('trashNotes');

function saveData() {
    saveToStorage({ notes, trashNotes, archiveNotes });
}

function renderArchive() {
    let archiveContent = document.getElementById('archive_content');
    archiveContent.innerHTML = '';
    if (archiveNotes.length === 0) {
        archiveContent.innerHTML = emptyListTemplate('No archived notes.');
        return;
    }
    for (let i = 0; i < archiveNotes.length; i++) {
        let buttons =
            buttonTemplate('Restore', `restoreFromArchive(${i})`) +
            buttonTemplate('Delete', `trashFromArchive(${i})`);
        archiveContent.innerHTML += noteCardTemplate(archiveNotes[i], i, buttons);
    }
}

function restoreFromArchive(index) {
    let restored = archiveNotes.splice(index, 1)[0];
    notes.push(restored);
    saveData();
    renderArchive();
}

function trashFromArchive(index) {
    let trashed = archiveNotes.splice(index, 1)[0];
    trashNotes.push(trashed);
    saveData();
    renderArchive();
}

function openModal(index) {
    closeModal();
    const note = archiveNotes[index];
    document.body.insertAdjacentHTML('beforeend', modalTemplate(note.title, note.text));
} 
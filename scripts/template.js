function noteTemplate(note, i, buttonsHtml = '') {
    return `<p>+ ${note}${buttonsHtml}</p>`;
}

function emptyListTemplate(text) {
    return `<p>${text}</p>`;
}

function buttonTemplate(label, onClick) {
    return `<button onclick=\"${onClick}\">${label}</button>`;
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToStorage(obj) {
    for (const key in obj) {
        localStorage.setItem(key, JSON.stringify(obj[key]));
    }
}

function previewText(text, maxLen) {
    if (text.length > maxLen) {
        return text.substring(0, maxLen) + '...';
    }
    return text;
}

function noteCardTemplate(note, i, buttonsHtml = '') {
    return `<div class="note-card" onclick="openModal(${i})">
        <div class="note-title">${previewText(note.title, 15)}</div>
        <div class="note-text">${previewText(note.text, 10)}</div>
        <div class="note-buttons" onclick="event.stopPropagation();">${buttonsHtml}</div>
    </div>`;
}

function modalTemplate(title, text) {
    return `<div class='modal-bg' id='modal-bg' onclick='closeModal()'>
        <div class='modal' onclick='event.stopPropagation();'>
            <div class='modal-title'>${title}</div>
            <div class='modal-text'>${text}</div>
        </div>
    </div>`;
}

function closeModal() {
    const modalBg = document.getElementById('modal-bg');
    if (modalBg) modalBg.remove();
}

function validationModalTemplate(title, message) {
    return `<div class='modal-bg' id='modal-bg' onclick='closeModal()'>
        <div class='modal' onclick='event.stopPropagation();'>
            <div class='modal-title'>${title}</div>
        </div>
    </div>`;
}

function showMessage(message) {
    closeModal();
    document.body.insertAdjacentHTML('beforeend', validationModalTemplate(message, ''));
} 
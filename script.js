document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const noteInput = document.getElementById("note-input");
    const saveBtn = document.getElementById("save-btn");
    const notesContainer = document.getElementById("notes-container");
    
    // Load saved notes when page loads
    loadNotes();
    
    // Save note when button is clicked
    saveBtn.addEventListener("click", saveNoteHandler);
    
    function saveNoteHandler() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            saveNote(noteText);
            noteInput.value = ""; // Clear input
            loadNotes(); // Refresh notes
        }
    }
    
    // Save note to localStorage
    function saveNote(text) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        const newNote = {
            id: Date.now(), // Unique ID
            text: text,
            date: new Date().toLocaleString()
        };
        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    
    // Load and display notes
    function loadNotes() {
        notesContainer.innerHTML = "";
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        
        if (notes.length === 0) {
            notesContainer.innerHTML = '<p class="empty-message">No notes yet. Add your first note!</p>';
            return;
        }
        
        notes.forEach(note => {
            const noteElement = document.createElement("div");
            noteElement.className = "note";
            noteElement.innerHTML = `
                <button class="delete-btn" data-id="${note.id}">×</button>
                <p>${note.text}</p>
                <small>${note.date}</small>
            `;
            notesContainer.appendChild(noteElement);
        });
        
        // Add delete button events
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                deleteNote(parseInt(this.getAttribute("data-id")));
            });
        });
    }
    
    // Delete a note
    function deleteNote(id) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
});
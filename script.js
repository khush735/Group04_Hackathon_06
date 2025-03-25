document.addEventListener("DOMContentLoaded", function() {
    const noteInput = document.getElementById("note-input");
    const saveBtn = document.getElementById("save-btn");
    const notesContainer = document.getElementById("notes-container");

    loadNotes();

    saveBtn.addEventListener("click", function() {
        const noteText = noteInput.value.trim();
        if (noteText !== "") {
            saveNote(noteText);
            noteInput.value = "";
            loadNotes();
        }
    });

    function saveNote(text) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(text);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function loadNotes() {
        notesContainer.innerHTML = "";
        const notes = JSON.parse(localStorage.getItem("notes")) || [];

        if (notes.length === 0) {
            notesContainer.innerHTML = "<p>No notes yet. Add one!</p>";
            return;
        }

        notes.forEach((note, index) => {
            const noteElement = document.createElement("div");
            noteElement.className = "note";
            noteElement.innerHTML = `
                ${note}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                deleteNote(parseInt(this.getAttribute("data-index")));
            });
        });
    }

    function deleteNote(index) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
});

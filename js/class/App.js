const $     = require("jquery-slim");
const Note  = require("./Note");

class App{
    constructor(){
        this.$form              = $("#add-note");
        this.$title             = $("#title");
        this.$content           = $("#content");
        this.$note_container    = $("#notes");
        this.$submit            = this.$form.find("input[type='submit']");

        this.notes = [];

        this.editedNote = false;
    }

    resetForm() {
        this.$title.val("");
        this.$content.val("");
        this.$submit.val("Ajouter");
        this.editedNote = false;
    }

    addNote(){
        const title     = this.$title.val();
        const content   = this.$content.val();
        const note      = new Note(title, content, new Date());

        if(!title || !content) return false;

            this.notes.push(note);


            note.render(this.$note_container);
            return true;
    }

    removeNoteAtIndex(position){
        const note = this.notes[ position];
        note.remove();
        this.notes.splice(position, 1);
    }

    editNoteAtIndex(position){
        this.editedNote = this.notes[ position];
        this.$submit.val("Editer");
        this.$title.val(this.editedNote.title);
        this.$content.val(this.editedNote.content);
    }

    updateNote(){
        const title     = this.$title.val();
        const content   = this.$content.val();

        if(!title || !content) return false;

            this.editedNote.title = title;
            this.editedNote.content = content;
            this.editedNote.date = new Date();
            this.editedNote.update();

            return true;
    }

    storeNotes(){
        const key = "key";
        localStorage.setItem(key,JSON.stringify(this.notes));
    }


    showNotes(){
            const storedNotes = localStorage.getItem("key");
        if (!localStorage.key) return;

        const parsed_notes = JSON.parse(storedNotes);
            for (let parsed_note of parsed_notes){

                const date = new Date(parsed_note.date);
                const note = new Note(parsed_note.title, parsed_note.content, date);
                note.render(this.$note_container);
                this.notes.push(note);
            }



    }

    toJSON(){
        return{
            title: this.title,
            content: this.content,
            date: this.date
        }
    }




}

module.exports = new App();
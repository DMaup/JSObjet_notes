const $     = require("jquery-slim");
const app   = require("./class/App");

app.showNotes();


app.$form.submit(function(event){
    event.preventDefault();

    if (app.editedNote){

        if (app.updateNote()){
            app.storeNotes();
            app.resetForm();
        }
    }

    else {

        if (app.addNote()){
            app.storeNotes();
            app.resetForm();
        }
    }
});

app.$note_container.on("click", ".remove, .edit", function(){
    const $parent   = $(this).parent();
    const $this     = $(this);
    const $notes    = app.$note_container.find(".note");
    const position  = $notes.index($parent);

    if($this.hasClass("remove")) {
        app.removeNoteAtIndex(position);
        app.storeNotes();
        app.resetForm();
    }

    else{
        app.editNoteAtIndex(position);
    }
});




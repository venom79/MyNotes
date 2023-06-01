console.log("this is MyNotes");

//Geting the text and button click
showNotes();
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('title');
    console.log(addTitle.value);
    let addTxt = document.getElementById('addTxt');
    let title = localStorage.getItem('title');
    let notes = localStorage.getItem('notes');
    if (notes == null && title == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(title);
    }
    notesobj.push(addTxt.value);
    titleobj.push(addTitle.value);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    localStorage.setItem('title', JSON.stringify(titleobj));
    addTxt.value = "";
    addTitle.value = ""
    // console.log(titleobj);
    showNotes();
})
// display notes in notes collection
function showNotes() {
    let title = localStorage.getItem('title');
    let notes = localStorage.getItem('notes');
    if (notes == null && title == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(title);
    }
    let titlearr = [];
    titleobj.forEach(function (element, index) {
        titlearr[index] = element;
    })
    let html = "";
    notesobj.forEach(function (element, index) {
        if(titlearr[index].length==0)//checks if there is a title given if not then sets the title as undefiend
        {
            html += `
            <div class="note-card">
                <div class="card-body">
                    <h2>undefined</h2>
                    <hr>
                    <p>${element}</p>
                </div>
                <button id=${index} class="btn" onclick="deleteNote(this.id)" >Delete Note</button>
                </div>
            `; 
        }
        else{
            html += `
            <div class="note-card">
                <div class="card-body">
                    <h2>${titlearr[index]}</h2>
                    <hr>
                    <p>${element}</p>
                </div>
                <button id=${index} class="btn" onclick="deleteNote(this.id)" >Delete Note</button>
            </div>
        `;
        }
    })
    let noteselm = document.getElementById('notesCollection');
    if (notesobj.length != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `<p>Nothing to show! use "Add a note" section to Add a note!</p>`;
    }

}

// deleting notes
function deleteNote(index) {
    // console.log("deleting ", index);
    let userDecision = confirm("do you really want to delete this Note?");
    if(userDecision == true){
        let title = localStorage.getItem('title');
        let notes = localStorage.getItem('notes');
        if (notes == null && title == null) {
            notesobj = [];
            titleobj = [];
        }
        else {
            notesobj = JSON.parse(notes);
            titleobj = JSON.parse(title);
        }
        titleobj.splice(index,1);
        notesobj.splice(index,1);
        localStorage.setItem('notes',JSON.stringify(notesobj));
        localStorage.setItem('title',JSON.stringify(titleobj));
        showNotes();
    }
    
}


// search notes with title
let search = document.getElementById('searchTitle');
search.addEventListener('input',function(){
    let inputval = search.value;
    // console.log("event fired",inputval);
    let notecard = document.getElementsByClassName('note-card');
    Array.from(notecard).forEach(function(element){
        let cardTitle = element.getElementsByTagName('h2')[0].innerText;
        // console.log(cardTitle);
        if(cardTitle.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

})
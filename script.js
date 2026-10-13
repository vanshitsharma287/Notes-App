const inputValue = document.querySelector(".note-input");
const addNoteBtn = document.querySelector(".add-note-btn");
const countingNotes = document.querySelector(".count-notes");
const textInfo = document.querySelector(".text-info");
const notesList = document.querySelector(".notes-list");

let count = 0;
let notesArray = [];

const savedNotes = localStorage.getItem("notes");
if(savedNotes) {
  notesArray = JSON.parse(savedNotes);
  if(notesArray.length) textInfo.style.display = "none";

  for(let i = 0;i < notesArray.length;i++){
    const newElement = document.createElement("li");
    newElement.innerHTML = `
                <span>${notesArray[i]}</span>
                <i class="fa-solid fa-trash-can delete-btn"></i>
            `;
            notesList.append(newElement);


  }
}


addNoteBtn.addEventListener("click", () => {
     if(inputValue.value.length){
        notesArray.push(inputValue.value);
        localStorage.setItem("notes", JSON.stringify(notesArray));

        

        const newElement = document.createElement("li");
        newElement.innerHTML = `
                <span>${inputValue.value}</span>
                <i class="fa-solid fa-trash-can delete-btn"></i>
            `;

        notesList.append(newElement);
        textInfo.style.display = "none";
        count++;
        countingNotes.innerHTML = `(${count})`;
        inputValue.value = "";
        inputValue.focus();
     }
});



notesList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const li = event.target.closest("li");
        const noteText = li.querySelector("span").textContent;

        const index = notesArray.indexOf(noteText);
        if (index !== -1) {
            notesArray.splice(index, 1);
        }
        localStorage.setItem("notes", JSON.stringify(notesArray));
        li.remove();

        count = notesArray.length;
        countingNotes.textContent = `(${count})`;
        textInfo.style.display = count === 0 ? "block" : "none";
    }
});




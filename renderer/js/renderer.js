let notesInput = document.querySelector("#notesID");
let headingInput = document.querySelector("#headingID");
let hamburger = document.querySelector("#hamburgerID");
let drawer = document.querySelector("#drawerID");
let addBtn = document.querySelector("#addNote");
const list = document.querySelector("#noteList");
const modal = document.querySelector("#modal");

// additional data
let userNotes = JSON.parse(localStorage.getItem("userNotes")) || [];
let currentID = JSON.parse(localStorage.getItem("currentID")) || 0;
let previousNote = localStorage.getItem("previousNote") || 0;
let firstTime = localStorage.getItem("firstTime") || true;

let currentNote = 0;

function addNote() {
  // console.log(currentID)
  const newObj = { id: currentID++, note: "", heading: "Untitled" };
  userNotes.push(newObj);
  currentID+ 
  localStorage.setItem("currentID", JSON.stringify(currentID));
  // console.log(userNotes)
  localStorage.setItem("userNotes", JSON.stringify(userNotes));
  updateList();
  updateNote(currentID - 1);
  drawer.classList.toggle("open");
}

function updateNote(id) {
  try {
    currentNote = id;
    for (let i = 0; i < userNotes.length; i++) {
      if (userNotes[i].id === parseInt(currentNote)) {
        headingInput.innerHTML = userNotes[i].heading;
        notesInput.innerHTML = userNotes[i].note;
        break; // exit loop once the object is updated
      }
    }
  } catch (error) {
    console.log("cannot update note");
    // alert('select a note to start editing')
    headingInput.innerHTML = "";
    notesInput.innerHTML = "";
    drawer.classList.toggle("open");
  }
}

function toggle() {
  updateList();
  drawer.classList.toggle("open");
}

function changed() {
  try {
    for (let i = 0; i < userNotes.length; i++) {
      if (userNotes[i].id === parseInt(currentNote)) {
        userNotes[i].note = notesInput.innerHTML;
        break; // exit loop once the object is updated
      }
    }
    console.log(userNotes);
    // const remove = userNotes.filter((item) => item.id === parseInt(id));
    // // updatedArr[0].heading =
    // userNotes = updatedArr;
    localStorage.setItem("userNotes", JSON.stringify(userNotes));
    console.log("N : " + notesInput.innerHTML);
    // userNotes[currentNote].note = notesInput.innerHTML;
    // localStorage.setItem("userNotes", JSON.stringify(userNotes));
  } catch (error) {
    console.log("cannot update note");
    alert("select a note to start editing");
    drawer.classList.toggle("open");
  }
  // localStorage.setItem('notes'+currentID, notesInput.innerHTML)
}

function headingchanged() {
  console.log(currentNote);
  try {
    for (let i = 0; i < userNotes.length; i++) {
      if (userNotes[i].id === parseInt(currentNote)) {
        userNotes[i].heading = headingInput.innerHTML;
        break; // exit loop once the object is updated
      }
    }
    console.log(userNotes);
    // const remove = userNotes.filter((item) => item.id === parseInt(id));
    // // updatedArr[0].heading =
    // userNotes = updatedArr;
    localStorage.setItem("userNotes", JSON.stringify(userNotes));

    console.log("H : " + headingInput.innerHTML);
  } catch (error) {
    console.log("cannot update note");
    headingInput.innerHTML = "";
    notesInput.innerHTML = "";
    drawer.classList.toggle("open");
  }
}

function updateList() {
  list.innerHTML = "";
  for (const note of userNotes) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${note.heading}`;
    const p = document.createElement("p");
    p.textContent = note.id;
    p.classList.add("hidden");
    listItem.appendChild(p);
    list.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateList();
  console.log(previousNote);
  updateNote(previousNote);
  if (firstTime === true) {
    userNotes.push({
      id: currentID,
      note: "Thanks for downloading macnote, you can start by making your first note and start noting, TO DELETE A NOTE FOLLOW STEPS ::: open the menu using the menu bar icon on the top right and right click on the note to delete it",
      heading: "Hello, Guide",
    });
    currentID++
    localStorage.setItem("currentID", currentID++)
    localStorage.setItem("userNotes", JSON.stringify(userNotes));
    updateList();
    updateNote(0);
    localStorage.setItem("firstTime", false);
  }
});

// check if list item is clicked
list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const p = event.target.querySelector("p");
    const text = p.textContent;

    console.log(text);
    currentNote = text;
    localStorage.setItem("previousNote", text);
    // console.log(userNotes)
    const updatedArr = userNotes.filter((item) => item.id === parseInt(text));
    console.log(updatedArr);
    headingInput.innerHTML = updatedArr[0].heading;
    notesInput.innerHTML = updatedArr[0].note;
    drawer.classList.toggle("open");
  }
});

function deleteNote(text) {
  const updatedArr = userNotes.filter((item) => item.id !== parseInt(text));
  userNotes = updatedArr;
  updateList();
  console.log(updatedArr);
  headingInput.innerHTML = "";
  notesInput.innerHTML = "";
  currentNote = userNotes[0].heading.id
  headingInput.innerHTML = userNotes[0].heading;
  localStorage.setItem("previousNote", userNotes[0].id);
  notesInput.innerHTML = userNotes[0].note;
  localStorage.setItem("userNotes", JSON.stringify(userNotes));
}

list.oncontextmenu = function (event) {
  if (event.target.tagName === "LI") {
    const p = event.target.querySelector("p");
    const text = p.textContent;
    console.log(text);
    if (confirm("Do you want to delete this note")) {
      if (userNotes.length === 1) {
        alert("You cannot delete the last note");
      } else {
        deleteNote(text)
      }
    } else {
      console.log("You pressed Cancel!");
    }
  }
};

notesInput.addEventListener("input", changed);
headingInput.addEventListener("input", headingchanged);
hamburger.addEventListener("click", toggle);
addBtn.addEventListener("click", addNote);

function saveNote() {

  const isValid = validationInput()
  if(!isValid){
    displayErrorAlert()
    return
  }
  hideErrorAlert()

  const isValidDate = validationDate()
  if(!isValidDate){
    displayErrorAlertDate()
    return
  }
  hideErrorAlertDate()

  const isValidTime = validationTime()
  if(!isValidTime){
    displayErrorAlertTime()
    return
  }
  hideErrorAlertTime()

  const existingNotesArray = getNotesArrayFromStorage();
  const newNote = parseNoteForm();
  existingNotesArray.push(newNote);
  saveNotesArrayToStorage(existingNotesArray);
  displayNotesFromStorage();

  document.getElementById("todoInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";
}

function getNotesArrayFromStorage() {
  const currrentJsonArray = localStorage.getItem("allNotes")

  let existingNotesArray = JSON.parse(currrentJsonArray);
  if (existingNotesArray === null) {
    existingNotesArray = [];
  }

   
  return existingNotesArray;
}

function parseNoteForm() {
  const toDoBox = document.getElementById("todoInput");
  const dateToDoBOX = document.getElementById("dateInput");
  const timeToDoBOX = document.getElementById("timeInput");

  const toDo = toDoBox.value;
  const dateToDo = dateToDoBOX.value;
  const timeToDo = timeToDoBOX.value;

  const randominteger=Math.floor(Math.random()*1000000);

  return {
    id:randominteger,
    task: toDo,
    date: dateToDo,
    time: timeToDo,
  }
}

function saveNotesArrayToStorage(existingNotesArray) {
  const updateJsonArray = JSON.stringify(existingNotesArray);
  localStorage.setItem("allNotes", updateJsonArray);
}

function displayNotesFromStorage() {
  const existingNotesArray = getNotesArrayFromStorage();
  document.getElementById("allNotes").innerHTML = "";
  
  for (const n of existingNotesArray) {
    if (!isDateAndHourPassed(n))
      displayOneNote(n);
  }
}

function displayOneNote(note) {
  const htmlNote = `<div class="fade-in-image">
  <ul>
  <li><button onclick="deleteNote(${note.id})" class="dellButton" type="button" ><span class="glyphicon glyphicon-remove-sign"></span></button></li>
       <li class="idNote">${note.id}</li>
       <li class="textNote"><p class="textNoteInP">${note.task}</p></li>
       <li class="dateTimeNote">${note.date}</li>
       <li class="dateTimeNote">${note.time}</li>
      </ul>
                </div>`;
  document.getElementById("allNotes").innerHTML += htmlNote;
}

function deleteNote(noteIdToDelete){
  const existingNotesArray = getNotesArrayFromStorage();
  
  for(let i=0; i< existingNotesArray.length; i++){
    if(existingNotesArray[i].id === noteIdToDelete){
      existingNotesArray.splice(i, 1);
      break;
    }
  }
  saveNotesArrayToStorage(existingNotesArray);
  displayNotesFromStorage();
}

// note future date
function isDateAndHourPassed(note){//date,time){
  const nowIs = new Date() //new
  const noteTime=new Date(note.date)

  const isDatePassed= nowIs > noteTime
  return isDatePassed
}

function validationInput(){
  const inputTxt = document.getElementById("todoInput")
  const value = inputTxt.value

  if (value==""){
    return false
  }
  return true
}

function displayErrorAlert(){
  const inputTXT = document.getElementById('todoInput')
  inputTXT.style.backgroundColor = "red"

  const span = document.getElementById('error-validation')
  span.innerText = "אין מידע בתיבת הטקסט, אנא הוסף משימה"
  span.style.color = "red"
}

function hideErrorAlert(){
  const inputTXT = document.getElementById('todoInput')
  inputTXT.style.backgroundColor = "white"

  const span = document.getElementById('error-validation')
  span.innerText = ""
  span.style.color = "white"
}

function validationDate(){
  const inputDate = document.getElementById("dateInput")
  const value = inputDate.value

  if (value==""){
    return false
  }
  return true
}

function displayErrorAlertDate(){
  const inputTXT = document.getElementById('dateInput')
  inputTXT.style.backgroundColor = "yellow"

  const span = document.getElementById('error-validation')
  span.innerText = "לא נבחר תאריך יעד לבצוע משימה, אנא בחר מועד לביצוע המשימה"
  span.style.color = "red"
}

function hideErrorAlertDate(){
  const inputTXT = document.getElementById('dateInput')
  inputTXT.style.backgroundColor = "white"

  const span = document.getElementById('error-validation')
  span.innerText = ""
  span.style.color = "white"
}

function validationTime(){
  const inputTxt = document.getElementById("timeInput")
  const value = inputTxt.value

  if (value==""){
    return false
  }
  return true
}

function displayErrorAlertTime(){
  const inputTXT = document.getElementById('timeInput')
  inputTXT.style.backgroundColor = "green"

  const span = document.getElementById('error-validation')
  span.innerText = "לא נבחרה שעת יעד לבצוע משימה, אנא בחר שעה לביצוע המשימה"
  span.style.color = "red"
}

function hideErrorAlertTime(){
  const inputTXT = document.getElementById('timeInput')
  inputTXT.style.backgroundColor = "white"

  const span = document.getElementById('error-validation')
  span.innerText = ""
  span.style.color = "white"
}

function clearValidation(){
  hideErrorAlert();
  hideErrorAlertDate();
  hideErrorAlertTime();
}



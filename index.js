

const form = document.querySelector('.studentForm');
const table = document.querySelector('.tableDetails')




// When the page loads, student data will be retrieved from localStorage.
// The stored data  will be parsed into a JavaScript  array and stored in the studentsData variable.
//  for each student in that array the addStudentToTable() function is called to display them in the table.
// Each individual student object is passed as an argument to that function.


window.addEventListener('DOMContentLoaded',()=>{
  
   const studentsData = JSON.parse(localStorage.getItem('students'))||[];
studentsData.forEach(student =>addStudentToTable(student));
});


// when the form get submitted addEventListener is triggered and prevent all the default action it stored value of form in respective variable and checks validation and if validation shows error .

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const studentsName = document.getElementById('studentName').value;
  const studentsId  = document.getElementById('studentId').value;
  const studentsemail  = document.getElementById('emailid').value;
  const studentscontact  = document.getElementById('Contact').value;


  let nameErr = document.getElementById('name-error')
  let emailErr = document.getElementById('email-error')
  let studentIdErr = document.getElementById('studentId-error')
  let contactErr =document.getElementById('contact-error')

  nameErr.textContent="";
  emailErr.textContent="";
  studentIdErr.textContent=""; 
  contactErr.textContent="";


  let isValid=true

  if(/[^a-zA-Z\s]/.test(studentsName)){
    nameErr.textContent="please enter your name properly";
    isValid=false
  }
  if(!/^\d{5,}$/.test(studentsId)){
    studentIdErr.textContent="Student ID must contain only numbers";
    isValid=false
  }
if(!/^\d{10}$/.test(studentscontact)){
  contactErr.textContent="contact must be a 10-digit number";
  isValid=false
}
if(!studentsemail.includes("@")||!studentsemail.includes(".")){
  emailErr.textContent="please enter a valid email";
  isValid=false
}

// If the form data is not valid, stop running the rest of the code.

if (!isValid) return; 

  const newStudents = {
    name: studentsName,
    id: studentsId,
    email: studentsemail,
    contact: studentscontact
  };



// Retrieves the existing array from localStorage.
// Adds the new student.
// Saves it back as JSON.


  let studentData = JSON.parse(localStorage.getItem('students')) || [];
  studentData.push(newStudents);
  localStorage.setItem('students', JSON.stringify(studentData));

  addStudentToTable(newStudents);
  form.reset();
  nameErr.textContent = "";
  emailErr.textContent = "";
  studentIdErr.textContent = "";
  contactErr.textContent = "";

});


// creating row for every submission 
function addStudentToTable(student) {
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-id', student.id);

  newRow.innerHTML = `
    <td><input class="inputStyle" value="${student.name}" disabled/></td>
    <td><input class="inputStyle" value="${student.id}" disabled/></td>
    <td><input class="inputStyle" value="${student.email}" disabled/></td>
    <td><input class="inputStyle" value="${student.contact}" disabled/></td>
    <td><button onclick="editRow(this)" class="editbtn"><i class="fa-solid fa-pen"></i></button></td>
    <td><button onclick="deleteRow(this)" class="removebutton"><i class="fa-solid fa-trash"></i></button></td>
  `;

  table.appendChild(newRow);


// styling the input ,input field is added because later it wilol be easy to edit the details

  const inputstyles = newRow.querySelectorAll('.inputStyle');
  inputstyles.forEach(styles => {
    styles.style.border = 'none';
    styles.style.backgroundColor = '#D7C49EFF';
    styles.style.color = 'black';
    styles.style.margin = 'auto';
  });

//styling edit buttons

  const editbtns = newRow.querySelectorAll('.editbtn');
  editbtns.forEach(editbtn => {
    editbtn.style.height = '30px';
    editbtn.style.backgroundColor = '#D7C49EFF';
    editbtn.style.cursor = 'pointer';
    editbtn.style.borderRadius = '8px';
    editbtn.style.border = 'none';
    editbtn.style.color = '#343148FF';
  });
}

//function delete row will be called when delet button get clicked
function deleteRow(button){
  //selects the nearest row of clicked button
  const row=button.closest('tr');

  //selects all the input field and pick the second value of second one that is student id.
  const id = row.querySelectorAll('input')[1].value

  let students =JSON.parse(localStorage.getItem('students'))||[]

  // Filters the array to remove the student with the matching ID.
students = students.filter(student => student.id !== id);

//updating the local storage in which the selected id data is removed
  localStorage.setItem('students', JSON.stringify(students));

  // Physically removes the <tr> from the table in the UI.
  row.remove();
}
  



//  function editRow edit the data 
function editRow(button) {
  // slects the closes row of clicked button
  const row = button.closest('tr');
  const inputs = row.querySelectorAll('.inputStyle');
  const icon = button.querySelector('i');

  //checks weather the first input field is disabled or not
  const isDisabled = inputs[0].disabled;

  if (isDisabled) {
   

    //Loop through all inputs in the row.
    //Set each input to editable 

    inputs.forEach(input => {
      input.disabled = false;
      input.style.border = '1px solid white';
      // input.style.backgroundColor = 'white';
      // input.style.color = 'black';
    });
    icon.className = 'fa-solid fa-check';
  } else {
   
    //when user clicks on check mark button   
    // Collect the updated values from the inputs into a new object updatedStudent.

    const updatedStudent = {
      name: inputs[0].value,
      id: inputs[1].value,        
      email: inputs[2].value,     
      contact: inputs[3].value    
    };

    //getting the orignal id before edit
    const originalId = row.getAttribute('data-id');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Finding  the index of the student by the original ID
    const index = students.findIndex(student => student.id === originalId); 

    // if it returns -1 means id is  not  found
    if (index !== -1) {
      // update the student data 
      students[index] = updatedStudent;

      // storing data to local storage
      localStorage.setItem('students', JSON.stringify(students));
    }

    row.setAttribute('data-id', updatedStudent.id);

   
    inputs.forEach(input => {
      input.disabled = true;
      input.style.border = 'none';
      input.style.backgroundColor = '#D7C49EFF';
      // input.style.color = '#343148FF';
          input.style.width="52px"

    });
    icon.className = 'fa-solid fa-pen';
  }
}




  
const randomHouse = ['Griffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const students = [];
const expelledStudents = [];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
}
// Normal student
const studentBuilder = (taco) => {
  let showOnDom = '';
  taco.forEach((item, i) => {
    showOnDom += `<div class="card m-1 ${item.house.toLowerCase()}" style="width: 14rem;" id=${i}>
                    <div class="card-body text-center">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.house}</p>
                      <button type="button" class="btn btn-danger" id=${i}>Expel</button>
                    </div>
                  </div>`
  })
  printToDom('#studentCard', showOnDom);
}
// Expelled student
const expelledStudentBuilder = (taco) => {
  let secretDom = '';
  taco.forEach((item, i) => {
    secretDom += `<div class="card m-1" style="width: 12rem;" id=${i}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/7/7d/DeathEaters.jpg" alt="Death Eater">
                    <div class="card-body text-center">
                      <p class="h6 card-text text-dark">Unfortunately, <span class="text-danger">${item.name}</span> went over to the dark side</p>
                    </div>
                  </div>`
  })
  printToDom('#expelledStudent', secretDom);
}
// Getting student info
const getStudentInfo = (e) => {
  e.preventDefault();
  const name = document.querySelector('#studentName').value;
  const house = randomHouse[Math.floor(Math.random() * randomHouse.length)];
  const studentIds = students.map((student) => student.id).sort((a, b) => a - b);
  const id = studentIds.length ? studentIds[studentIds.length - 1] + 1 : 1;
  const obj = {
    name,
    house,
    id,
  }
  students.push(obj);
  studentBuilder(students);
  document.querySelector('form').reset();
}

// Expelling student in a different array
const expelStudent = (e) => {
  const targetType = e.target.type;
  const targetId = e.target.id;
  if (targetType === 'button') {
    expelledStudents.push(...students.splice(targetId, 1));
  }  
  expelledStudentBuilder(expelledStudents);
  studentBuilder(students);
}

const buttonFunc = (e) => {
  const buttonId = e.target.id;
  if (buttonId === 'showForm') {
    document.querySelector('#hideForm').style.display = 'block';
  } else if (buttonId === 'house') {
    students.sort((a, b) => (a.house.toUpperCase() < b.house.toUpperCase() ? -1 : 1));
    studentBuilder(students);
  } else if (buttonId === 'alphabet') {
    students.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
    studentBuilder(students);
  }
}

const buttonEvents = () => {
  document.querySelector('#showForm').addEventListener('click', buttonFunc);
  document.querySelector('#house').addEventListener('click', buttonFunc);
  document.querySelector('#alphabet').addEventListener('click', buttonFunc);
  document.querySelector('form').addEventListener('submit', getStudentInfo);  
  document.querySelector('#studentCard').addEventListener('click', expelStudent);
}

const init = () => {
  buttonEvents();
  studentBuilder(students);
}

init();

// Before refactoring code
// Sorting students with name (alphabetical order)
// const studentSortByName = () => {
//   students.sort((a, b) => {
//     let nameA = a.name.toUpperCase(); 
//     let nameB = b.name.toUpperCase(); 
//     if (nameA < nameB) {
//       return -1;
//     } else if (nameA > nameB) {
//       return 1;
//     }
//   });
//   studentBuilder(students);
// }
// Sorting students with house (refactored code!!!!!)
// const studentSortByHouse = () => {
//   students.sort((a, b) => (a.house.toUpperCase() < b.house.toUpperCase() ? -1 : 1));
//   studentBuilder(students);
// }

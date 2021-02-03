const randomHouse = ['Griffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const students = [];
const expelledStudents = [];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
}

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

const expelledStudentBuilder = (taco) => {
  let secretDom = '';
  taco.forEach((item, i) => {
    secretDom += `<div class="card m-1" style="width: 12rem;" id=${i}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/7/7d/DeathEaters.jpg" alt="Death Eater">
                    <div class="card-body text-center">
                      <p class="card-text text-dark">Unfortunately, <span class="text-danger">${item.name}</span> went over to the dark side</p>
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
  // console.log(students);
  document.querySelector('form').reset();
}

// Sorting students with name (alphabetical order)
const studentSortByName = () => {
  students.sort((a, b) => {
    let nameA = a.name.toUpperCase(); 
    let nameB = b.name.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  studentBuilder(students);
}

const studentSortByHouse = () => {
  students.sort((a, b) => {
    let houseA = a.house.toUpperCase();
    let houseB = b.house.toUpperCase();
    if (houseA < houseB) {
      return -1;
    } else if (houseA > houseB) {
      return 1;
    } 
    return 0;
  })
  studentBuilder(students);
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
  console.log(expelledStudents);
}


const handleButtonClick = (e) => {
  const buttonId = e.target.id;
  
  if (buttonId === 'showForm') {
    document.querySelector('#hideForm').style.display = 'block';
  } 
}

const buttonEvents = () => {
  document.querySelector('#showForm').addEventListener('click', handleButtonClick);
  document.querySelector('form').addEventListener('submit', getStudentInfo);
  document.querySelector('#alphabet').addEventListener('click', studentSortByName);
  document.querySelector('#house').addEventListener('click', studentSortByHouse);
  document.querySelector('#studentCard').addEventListener('click', expelStudent);
}

const init = () => {
  buttonEvents();
  studentBuilder(students);
}

init();

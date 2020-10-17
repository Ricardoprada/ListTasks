document.getElementById("formTask").addEventListener('submit', saveTask);

function saveTask(event) {

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const task = {
    title, // title: title,
    description // description: description
  };

  if(localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    // Almacenar datos(nombreDato, valorDato ) convertir un objeto en string = JSON.stringify()
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    // obtener los datos
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById("formTask").reset();
  event.preventDefault();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");

  tasksView.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p class="font-weight-bold">${title} - ${description}
          </p>
          <a href="#" onclick="deleteTask('${title}')" ('${title}')" class="btn btn-danger">Delete</a>
        </div>
      </div>`;
  }
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      // Eliminar(indice, cantidad)
      tasks.splice(i, 1)
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}

getTasks();
// definerar element
let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;
let currentDay = today.getDate();
let currentHour = today.getHours();
let addBtn = document.querySelector("#add-icon");
let darkBackground = document.querySelector("#dark-background");
let addPopup = document.querySelector("#add");
let editPopup = document.querySelector("#edit");
let todoText = document.querySelector("#todo-text");
let todoDate = document.querySelector("#todo-date");
let todoTime = document.querySelector("#todo-time");
let addTodoBtn = document.querySelector("#add-todo");
let editTodo = document.querySelector(".edit-todo");
let editText = document.querySelector("#edit-text");
let editDate = document.querySelector("#edit-date");
let editTime = document.querySelector("#edit-time");
let todoList = {};
if (localStorage.getItem("todoList") == null) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
todoList = JSON.parse(localStorage.getItem("todoList"));
if (JSON.parse(localStorage.getItem("todoList"))) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}
updateLocalStorage();
displayTodoList();
eventlistner();

// Funktion som gör en popup där man lägger till en ToDo
function openAdd() {
  darkBackground.style.display = "inline";
  addPopup.style.display = "inline";
  editPopup.style.display = "none";
  todoText.focus();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addToDo();
    }
  });

  // todoDate.style.color = "#21252900";
  todoDate.addEventListener("change", () => {
    if (todoDate.value === "") {
      // todoDate.style.color = "#21252900";
    } else {
      // todoDate.style.color = "#212529";
    }
  });
}
addBtn.addEventListener("click", openAdd);

// Funktion som stänger popup
function closeAdd(event) {
  if (event.target === darkBackground) {
    todoText.value = "";
    todoDate.value = "";
    todoTime.value = "";
    todoText.setAttribute("placeholder", "");
    todoDate.setAttribute("placeholder", "");
    darkBackground.style.display = "none";
  }
}
darkBackground.addEventListener("click", closeAdd);

// Funktion som lägger till en Todo
addTodoBtn.addEventListener("click", () => {
  addToDo();
});
function addToDo() {
  if (
    todoText.value.length > 0 &&
    todoDate.value !== "" &&
    todoTime.value !== ""
  ) {
    let todo = {
      [Object.keys(todoList).length]: {
        text: todoText.value,
        date: todoDate.value,
        time: todoTime.value,
      },
    };
    Object.assign(todoList, todo);
    displayTodoList();
    eventlistner();
    todoText.value = "";
    darkBackground.style.display = "none";
  } else if (todoText.value.length > 0 && todoDate.value !== "") {
    let todo = {
      [Object.keys(todoList).length]: {
        text: todoText.value,
        date: todoDate.value,
      },
    };
    Object.assign(todoList, todo);
    displayTodoList();
    eventlistner();
    todoText.value = "";
    darkBackground.style.display = "none";
  } else if (todoText.value.length === 0 && todoDate.value === "") {
    todoText.setAttribute("placeholder", "Ange aktivitet");
    todoDate.setAttribute("placeholder", "Ange datum");
    todoText.focus();
  } else if (todoText.value.length === 0) {
    todoText.setAttribute("placeholder", "Ange aktivitet");
    todoText.focus();
  } else if (todoDate.value === "") {
    todoText.setAttribute("placeholder", "");
    todoDate.setAttribute("placeholder", "Ange datum");
  }
}

// Funktion som lägger alla eventlistner på done och edit knappanra
function eventlistner() {
  for (let i = 0; i < Object.keys(todoList).length; i++) {
    document.querySelector("#done" + i).addEventListener("click", () => {
      delete todoList[i];
      let newTodoList = {};
      let j = 0;
      for (const key in todoList) {
        let todo = {
          [j]: { text: todoList[key].text, date: todoList[key].date },
        };
        Object.assign(newTodoList, todo);
        j++;
      }
      todoList = newTodoList;
      displayTodoList();
      eventlistner();
    });
    document.querySelector("#edit" + i).addEventListener("click", () => {
      darkBackground.style.display = "inline";
      editPopup.style.display = "inline";
      addPopup.style.display = "none";
      editTodo.setAttribute("id", "index" + i);
      editText.value = todoList[i].text;
      editDate.value = todoList[i].date;
      editTime.value = todoList[i].time;
    });
  }
}

// Funktion som ändrar en ToDo
editTodo.addEventListener("click", () => {
  let ToDo = {
    [editTodo.getAttribute("id").replace("index", "")]: {
      text: editText.value,
      date: editDate.value,
    },
  };
  if (editTime.value !== "") {
    ToDo = {
      [editTodo.getAttribute("id").replace("index", "")]: {
        text: editText.value,
        date: editDate.value,
        time: editTime.value,
      },
    };
  }

  Object.assign(todoList, ToDo);
  updateLocalStorage();
  displayTodoList();
  darkBackground.style.display = "none";
  eventlistner();
});

// Visar alla Todos
function displayTodoList() {
  updateLocalStorage();
  document.querySelector(".ToDo").innerHTML = "";
  let todoListLength = Object.keys(todoList).length;
  for (let i = 0; i < todoListLength; i++) {
    let year = todoList[i].date.substring(0, 4);
    let day = todoList[i].date.substring(8, 10);
    if (day.charAt(0) === "0") {
      day = day.replace("0", "");
    }
    let month = "";
    switch (todoList[i].date.substring(5, 7)) {
      case "01":
        month = "Januari";
        break;
      case "02":
        month = "Februari";
        break;
      case "03":
        month = "Mars";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "Maj";
        break;
      case "06":
        month = "Juni";
        break;
      case "07":
        month = "Juli";
        break;
      case "08":
        month = "Augusti";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "Oktober";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
    }

    // let timeDiff = date2.getTime() - date1.getTime()
    // console.log(timeDiff)
    // let dayDiff = timeDiff / (1000 * 3600 * 24)
    // console.log(dayDiff)
    let date = new Date(todoList[i].date);
    let timeDiff = date.getTime() - today.getTime();
    let dayDiff = timeDiff / (1000 * 3600 * 24);
    console.log(dayDiff);

    if (typeof todoList[i].time !== "undefined" && Math.floor(dayDiff) < 0) {
      document.querySelector(".ToDo").innerHTML +=
        "<div class='ToDo-container'><h2 id='label" +
        i +
        "'>" +
        todoList[i].text +
        "  |  " +
        Math.floor(dayDiff) +
        " dagar kvar</h2><h3>" +
        day +
        " " +
        month +
        " " +
        year +
        "</h3><h3>Tid " +
        todoList[i].time +
        "</h3><div class='remove-btn' id='done" +
        i +
        "'><img src='done.svg' alt='Done icon'></div><div class='edit-btn' id='edit" +
        i +
        "'><img src='edit.svg' alt='Edit icon'></div>";
    } else if (typeof todoList[i].time && Math.floor(dayDiff) > 1) {
      document.querySelector(".ToDo").innerHTML +=
        "<div class='ToDo-container'><h2 id='label" +
        i +
        "'>" +
        todoList[i].text +
        "  |  " +
        Math.floor(dayDiff) +
        " dagar kvar</h2><h3>" +
        day +
        " " +
        month +
        " " +
        year +
        "</h3><div class='remove-btn' id='done" +
        i +
        "'><img src='done.svg' alt='Done icon'></div><div class='edit-btn' id='edit" +
        i +
        "'><img src='edit.svg' alt='Edit icon'></div>";
    } else if (typeof todoList[i].time && Math.floor(dayDiff) === 1) {
      document.querySelector(".ToDo").innerHTML +=
        "<div class='ToDo-container'><h2 id='label" +
        i +
        "'>" +
        todoList[i].text +
        "  |  " +
        Math.floor(dayDiff) +
        " dag kvar</h2><h3>" +
        day +
        " " +
        month +
        " " +
        year +
        "</h3><div class='remove-btn' id='done" +
        i +
        "'><img src='done.svg' alt='Done icon'></div><div class='edit-btn' id='edit" +
        i +
        "'><img src='edit.svg' alt='Edit icon'></div>";
    } else if (typeof todoList[i].time && Math.floor(dayDiff) === 0) {
      document.querySelector(".ToDo").innerHTML +=
        "<div class='ToDo-container'><h2 id='label" +
        i +
        "'>" +
        todoList[i].text +
        "  |   Idag</h2><h3>" +
        day +
        " " +
        month +
        " " +
        year +
        "</h3><div class='remove-btn' id='done" +
        i +
        "'><img src='done.svg' alt='Done icon'></div><div class='edit-btn' id='edit" +
        i +
        "'><img src='edit.svg' alt='Edit icon'></div>";
    } else if (typeof todoList[i].time && Math.floor(dayDiff) === 1) {
      document.querySelector(".ToDo").innerHTML +=
        "<div class='ToDo-container'><h2 id='label" +
        i +
        "'>" +
        todoList[i].text +
        "  |  " +
        Math.floor(dayDiff) +
        " dag sedan </h2><h3>" +
        day +
        " " +
        month +
        " " +
        year +
        "</h3><div class='remove-btn' id='done" +
        i +
        "'><img src='done.svg' alt='Done icon'></div><div class='edit-btn' id='edit" +
        i +
        "'><img src='edit.svg' alt='Edit icon'></div>";
    } else if (typeof todoList[i].time && Math.floor(dayDiff) < 1) {
      document.querySelector(".ToDo").innerHTML +=
        "<div class='ToDo-container'><h2 id='label" +
        i +
        "'>" +
        todoList[i].text +
        "  |  " +
        Math.floor(dayDiff) +
        " dagar sedan </h2><h3>" +
        day +
        " " +
        month +
        " " +
        year +
        "</h3><div class='remove-btn' id='done" +
        i +
        "'><img src='done.svg' alt='Done icon'></div><div class='edit-btn' id='edit" +
        i +
        "'><img src='edit.svg' alt='Edit icon'></div>";
    }
  }
}

// Updaterar localstorage och listan så att dem är samma
function updateLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  todoList = JSON.parse(localStorage.getItem("todoList"));
}

// lägg till typeof todolist.time grejen
// Fixa färgerna på todo-container

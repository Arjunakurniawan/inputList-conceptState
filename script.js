const input = document.getElementById("inputStudent");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const ul = document.getElementById("listStudents");
const title = document.getElementById("titleUl");

let states = {
  students: JSON.parse(localStorage.getItem("students") || "[]"),
  editIndex: null,
};

// fungsi untuk menyimpan data ke local storage
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(states.students));
}

function createStudentListCheckBox(student) {
  const checkbox = document.createElement("input");
  checkbox.checked = student.isCompleted;
  checkbox.onclick = function (event) {
    states.students[index].isCompleted = event.target.checked;
    render();
    saveToLocalStorage();
  };
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";
  return checkbox;
}

function createStudentListText(student) {
  const textName = document.createElement("p");
  textName.textContent = student.name;
  textName.style.textDecoration = student.isCompleted ? "line-through" : "none";
  return textName;
}

function createStudentListButtonDelete(index) {
  const btnDelete = document.createElement("button");
  btnDelete.className = "button__delete";
  btnDelete.textContent = "Delete";

  btnDelete.onclick = function () {
    states.students.splice(index, 1);
    render();
    saveToLocalStorage();
  };
  return btnDelete;
}

function createStudentListButtonEdit() {
  const btnEdit = document.createElement("button");
  btnEdit.className = "button__edit";
  btnEdit.textContent = "Edit";

  btnEdit.onclick = function () {
    states.editIndex = index;
    render();
  };

  return btnEdit;
}

function renderStudentList() {
  ul.innerHTML = "";
  states.students.forEach((student, index) => {
    const li = document.createElement("li");

    // styling css
    ul.style.display = "block";
    li.style.display = "flex";

    // append element
    ul.prepend(title);
    ul.appendChild(li);
    li.appendChild(createStudentListCheckBox(student));
    li.append(createStudentListText(student));
    li.append(createStudentListButtonDelete(index));

    if (!student.isCompleted) {
      li.append(createStudentListButtonEdit(index));
    }
  });
}

function renderStudentForm() {
  if (states.editIndex !== null) {
    btnSubmit.textContent = "Save";
    input.focus();
    input.value = states.students[states.editIndex].name;
  } else {
    btnSubmit.textContent = "Add";
    input.value = "";
  }

  // event handler button submit 2 fungsi
  btnSubmit.onclick = function () {
    if (states.editIndex === null) {
      if (input.value === "") {
        alert("isi bidang ini!");
      } else {
        states.students.push({ name: input.value, isCompleted: false });
        render();
        saveToLocalStorage();
      }
    } else {
      states.students[states.editIndex].name = input.value;
      states.editIndex = null;
      render();
      saveToLocalStorage();
    }
  };

  // fungsi untuk tombol cancel
  btnCancel.onclick = function () {
    states.editIndex = null;
    render();
  };
}

// fungsi untuk menyimpan data
function render() {
  renderStudentList();
  renderStudentForm();
}

render();

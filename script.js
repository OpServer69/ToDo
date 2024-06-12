const addTask = document.querySelector(".add_task");
const modal = document.querySelector(".modal");
const conteiner = document.querySelector(".conteiner");
const buttonClosed = document.querySelector(".button_closed");
const taskInput = document.querySelector("#task_input");
const myModalBox = document.querySelector("#my_modal .modal__box");
const modalBox = document.querySelector(".modal__box");
const form = document.querySelector(".form");
const ulTasklist = document.querySelector(".ul_task_list");
const btnAddTask = document.querySelector(".button_add_task");
const taskList = document.querySelector(".ul_task_list");

let tasks = [];

if (localStorage.getItem("tasks")) {
   tasks = JSON.parse(localStorage.getItem("tasks"));
   tasks.forEach(function (task){
    renderTask(task);
  })
  
}



addTask.addEventListener("click" , addModal);

buttonClosed.addEventListener("click", removeModal);

myModalBox.addEventListener("click", handleClickInModal );

modal.addEventListener("click" , hClickInModalContainer);

form.addEventListener("submit", addTaskList);

taskList.addEventListener("click", deleteTask);

taskList.addEventListener("click", doneTask);

window.addEventListener("keyup", windowRemoveModal);




function deleteTask(event){
if(event.target.dataset.action === "delete"){

    const parenNode = event.target.closest(".list_grop_item");

    //Определяем ID задачи 
    const id = Number(parenNode.id)
    //Находим индекс в массиве
    const index = tasks.findIndex(function(task){
      console.log(task);
      if(task.id === id){
        return true
      }
    });

    console.log(index);
    //Удаляем задачу из массива
    tasks.splice(index, 1)
    saveToLocalStorage();
    parenNode.remove();
  }
};

function doneTask(event){
 if(event.target.dataset.action === "done"){
    const parenNode =event.target.closest(".list_grop_item")

    const id = Number(parenNode.id);

    const task = tasks.find(function(task){
      if(task.id === id){
        return true
      }
    });

    task.done = !task.done;
    saveToLocalStorage();

    const taskTitle = parenNode.querySelector("span")
    taskTitle.classList.toggle("task_title_done")

 }

};

function addTaskList(event){
  event.preventDefault();
  const taskText = taskInput.value;

  //Описыве задачу в виде объекта 
  const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
  }
  

  //Добавляем задачу в массив с задачами
  tasks.push(newTask);
  //добавляем список задач в localStorage
  saveToLocalStorage()

  renderTask(newTask);
 
 
 taskInput.value = "";
 taskInput.focus();

};

//ModalFunction

function addModal(){
  conteiner.classList.add("conteiner_backgraund");
  modal.classList.add("open");
  
 taskInput.value = "";
};

function removeModal(){
  conteiner.classList.remove("conteiner_backgraund");
  modal.classList.remove("open");
  
  taskInput.value = "";
};

function handleClickInModal (event){
event._isClickWithInModal = true;
};

function hClickInModalContainer (event){
  if (!event._isClickWithInModal) {
    event.currentTarget.classList.remove('open');
  }
};

function windowRemoveModal(event){
  if(event.key ==="Escape"){
    conteiner.classList.remove("conteiner_backgraund");
    modal.classList.remove("open");
     }
};

//LocalStorage
function saveToLocalStorage(){
  localStorage.setItem("tasks", JSON.stringify(tasks))
 }

 function renderTask(task){
  
  const cssClass = task.done ? "task_title_done" : "" ; 


  const taskHTML =`
        <li id = "${task.id}"class="li_hover list_grop_item">
          <span class="${cssClass}">${task.text}</span>
          <div class="button_checkboxs">
              <button class="checkbox" id="done_task_btn" type="button" data-action="done">
                  <img src="img/SVG/done_task.svg" alt="done_task"/>
              </button>
              <button class="checkbox" id="task_remove_btn" type="button" data-action="delete">
                  <img src="img/SVG/remove_task.svg" alt="done_task"/>
              </button>
          </div>

        </li>
  `
  ulTasklist.insertAdjacentHTML("beforeend", taskHTML);

 }
const inputTaskTitle = document.getElementById("input-task-title");
const inputTaskDesc = document.getElementById("input-task-desc");
const dueDate = document.getElementById("due-date");
const category = document.getElementById("categories");
const addTaskButton = document.getElementById("add-task-button");
const listEle = document.getElementById("task-list");
const burgerIcon = document.querySelector(".burger-icon");


function navbarThing(){
  if(window.innerWidth<=1024){
    document.querySelector(".burger").style.display="flex"
    document.querySelector(".navbar").classList.add("navbar-move")
    
  }else{
    document.querySelector(".burger").style.display="none"
    document.querySelector(".navbar").classList.remove("navbar-move")

  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector(".navbar").classList.add("navbar-move")
    document.querySelector(".view-task").style.display="none"
  } 
});


window.addEventListener("resize",()=>{
    
  navbarThing()

})

document.querySelector(".navbar-bg").addEventListener("click",()=>{
  document.querySelector(".navbar").classList.toggle("navbar-move")
  document.querySelector(".navbar-bg").classList.toggle("add-bg")
})
burgerIcon.addEventListener("click",()=>{
    document.querySelector(".navbar").classList.toggle("navbar-move")
    document.querySelector(".navbar-bg").classList.toggle("add-bg")
})

navbarThing()

const dateToogleButton = document.querySelector(".date");
const dateIconButton = document.querySelector(".date");

dateToogleButton.style.background = "transparent";
dateIconButton.style.filter =
  "invert(41%) sepia(85%) saturate(1713%) hue-rotate(225deg) brightness(8%) contrast(101%)"
dateToogleButton.addEventListener("mouseover", () => {
  console.log("hover effect");
  dateIconButton.style.filter =
    "invert(150%) sepia(0%) saturate(5009%) hue-rotate(132deg) brightness(115%) contrast(150%)";
  dateToogleButton.style.background = "#999099";
});
dateToogleButton.addEventListener("mouseout", () => {
  console.log("hover effect");
  if (dateToogleButton.classList.contains("date-click")) {
  } else {
    dateToogleButton.style.background = "transparent";
    dateIconButton.style.filter =
      "invert(41%) sepia(85%) saturate(1713%) hue-rotate(225deg) brightness(101%) contrast(101%)";
  }
});





dateToogleButton.addEventListener("click", () => {
  console.log("click");
  dateToogleButton.classList.toggle("date-click");
  dateIconButton.classList.toggle("date-icon-click");
  if (dateToogleButton.classList.contains("date-click")) {
    search(true);
  } else {
    search();
  }
});
let currentLoginUser = "test";
let switchStateUser = true;



document.querySelector(".add-task-button").addEventListener("click",()=>{
    document.getElementById("add-task-section").style.height = "fit-content"
    document.getElementById("add-task-section").style.overflow = "visible"
    document.getElementById("add-task-section").style.width = "100%"
    document.getElementById("add-task-section").style.boxSizing = "border-box"
    document.getElementById("add-task-section").style.padding = "1rem"
})



show();
search();

function show() {
  let tasks = getTasks();
  loadToUi(tasks);
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify(tasks));
  show();
}



function edittask(index){
  let tasks = getTasks();
  let editabletask  = tasks[index]
  console.log(editabletask)
  if(window.innerWidth<768){
    document.querySelector(".task-to-edit").style.width = "95%"
  }else{
    
    document.querySelector(".task-to-edit").style.width = "40%"
  }
  document.querySelector(".view-task").style.display="flex"
  let title = document.querySelector(".edit-task-title")
  let desc = document.querySelector(".edit-task-desc")
  title.innerHTML = editabletask.title
  desc.innerHTML = editabletask.desc
  title.addEventListener("input",()=>{
    console.log(title.innerHTML)
    tasks[index].title = title.innerHTML
    localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify(tasks));
  })
  desc.addEventListener("input",()=>{
    console.log(desc.innerHTML)
    tasks[index].desc = desc.innerHTML 
    localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify(tasks));
  })
  
  

}

document.querySelector(".update-task").addEventListener("click",()=>{
  document.querySelector(".navbar").classList.add("navbar-move")
  document.querySelector(".view-task").style.display="none"
  show()
})

function changeStatus(index) {
  let tasks = getTasks();
  tasks[index].status = !tasks[index].status;

  localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify(tasks));
  show();
}

function addTask() {
  if (!localStorage.getItem(`${currentLoginUser}-tasks`)) {
    localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify([]));
  }

  if (
    inputTaskTitle.value &&
    inputTaskDesc.value &&
    category.value &&
    dueDate.value
  ) {
    let task = {
      title: inputTaskTitle.value,
      desc: inputTaskDesc.value,
      category: category.value,
      due: dueDate.value,
      status: false,
    };

    let tasks = getTasks();
    tasks.push(task);
    document.getElementById("add-task-section").style.height = "0"
    document.getElementById("add-task-section").style.overflow = "hidden"
    document.getElementById("add-task-section").style.padding = "0rem"
    localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify(tasks));
  }
  show();
}
document.querySelector(".enter-event").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function sortTask() {
  let sortType = document.getElementById("sort-task").value;
  let tasks = getTasks();

  tasks.sort(function (a, b) {
    switch (sortType) {
      case "date":
        let temp = new Date(a.due) - new Date(b.due);
        return temp;
      case "completed":
        return b.status - a.status;
      case "incompleted":
        return a.status - b.status;
      default:
        return 0;
    }
  });
  localStorage.setItem(`${currentLoginUser}-tasks`, JSON.stringify(tasks));

  loadToUi(tasks);
}

function filtertasks(val) {
  document.getElementById("search-bar-filter").value = val;
  document.getElementById("search-bar-filter").click();
}
const all = document.querySelector(".all");
const completedbutton = document.querySelector(".completed");
const incompletedbutton = document.querySelector(".incompleted");

function removefromall() {
  all.children[0].classList.remove("color-purple");
  all.children[1].children[0].classList.remove("weight");
  completedbutton.children[0].classList.remove("color-purple");
  completedbutton.children[1].children[0].classList.remove("weight");
  incompletedbutton.children[0].classList.remove("color-purple");
  incompletedbutton.children[1].children[0].classList.remove("weight");
}

function closeNav(){
  if(window.innerWidth<=1024){
    document.querySelector(".navbar").classList.add("navbar-move")
  }
}
all.onclick = () => {
  removefromall();
  filtertasks("all");
  all.children[0].classList.add("color-purple");
  all.children[1].children[0].classList.add("weight");
  closeNav()
  
};
completedbutton.onclick = () => {
  removefromall();
  filtertasks("completed");
  completedbutton.children[0].classList.add("color-purple");
  completedbutton.children[1].children[0].classList.add("weight");
  closeNav()
};
incompletedbutton.onclick = () => {
  removefromall();
  filtertasks("incompleted");
  incompletedbutton.children[0].classList.add("color-purple");
  incompletedbutton.children[1].children[0].classList.add("weight");
  closeNav()
};

function search(isDate = false) {
  let searchBarValue = document.getElementById("search-bar").value;
  let filterType = document.getElementById("search-bar-filter").value;
  let datesort = document.getElementById("date");
  let tasks = getTasks();

  searchedtasks = tasks.filter((task) => {
    return task.title.includes(searchBarValue);
  });

  if (isDate) {
    searchedtasks.sort(function (a, b) {
      let temp = new Date(a.due) - new Date(b.due);
      return temp;
    });
  }
  loadToUi(searchedtasks, filterType);
}

function loadToUi(parsedData, type = "all") {
  listEle.innerHTML = "";

  const workTaskList = document.createElement("div");
  workTaskList.classList.add("task-list-category-container");
  let underdiv = document.createElement("div");
  let h2Heading = document.createElement("h2");
  let textNodeHeading = document.createTextNode("WORK");
  h2Heading.appendChild(textNodeHeading);
  underdiv.appendChild(h2Heading);
  underdiv.classList = "category-name";
  workTaskList.appendChild(underdiv);

  const personalTaskList = document.createElement("div");
  personalTaskList.classList.add("task-list-category-container");
  let underdiv2 = document.createElement("div");
  let h2Personal = document.createElement("h2");
  let textNodePersonal = document.createTextNode("PERSONAL");
  h2Personal.appendChild(textNodePersonal);

  underdiv2.appendChild(h2Personal);
  underdiv2.classList = "category-name";
  personalTaskList.appendChild(underdiv2);

  const studyTaskList = document.createElement("div");
  studyTaskList.classList.add("task-list-category-container");
  let underdiv3 = document.createElement("div");
  let h2Study = document.createElement("h2");
  let textNodeStudy = document.createTextNode("STUDY");
  h2Study.appendChild(textNodeStudy);
  underdiv3.appendChild(h2Study);
  underdiv3.classList = "category-name";

  

  studyTaskList.appendChild(underdiv3);
  let taskscount =  [0,0,0]; 
  parsedData.forEach((task, index) => {
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    let taskContainerWrapper = document.createElement("div");
    taskContainerWrapper.classList.add("task-container-Wrapper");

    let title = document.createElement("div");

    let tasktitle=""
    if(task.title.length > 10){
        tasktitle = task.title.substring(0,7)+"..."
    }else{
      tasktitle = task.title
    }

    title.appendChild(document.createTextNode(tasktitle));
    title.classList.add("task-title");


    let taskdesc=""
    if(task.desc.length > 10){
      taskdesc = task.desc.substring(0,7)+"..."
    }else{
      taskdesc = task.desc
    }
    let taskdis = document.createElement("div");
    taskdis.appendChild(document.createTextNode(taskdesc));
    taskdis.classList.add("task-desc");

    let due = document.createElement("div");
    due.appendChild(document.createTextNode(task.due));
    due.classList.add("task-due");
    const newDate = new Date(task.due);
    const today = new Date();
    if (newDate.getDate() - today.getDate() < 2) {
      due.style.color = "red";
    }

    title.onclick=()=>{
      edittask(index)
    }
    taskdis.onclick=()=>{
      edittask(index)
    }

    taskContainerWrapper.appendChild(title);
    taskContainerWrapper.appendChild(taskdis);
    taskContainerWrapper.appendChild(due);

    let buttonContainerWrapper = document.createElement("div");
    buttonContainerWrapper.classList.add("button-container-Wrapper");

    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("delete task"));
    deleteButton.onclick = () => deleteTask(index);

    let statusButton = document.createElement("button");
    if (task.status == true) {
      statusButton.appendChild(document.createTextNode("completed"));
    } else {
      statusButton.appendChild(document.createTextNode("incompleted"));
    }
    statusButton.onclick = () => {
      changeStatus(index);
      sortTask();
    };
    buttonContainerWrapper.appendChild(statusButton);
    buttonContainerWrapper.appendChild(deleteButton);

    const photo = document.createElement("div");
    const photocon = document.createElement("div");
    photocon.classList.add("photo-con");
    const donestate = document.createElement("img");
    const notDoneState = document.createElement("img");
    donestate.src = "./images/tick.svg";
    notDoneState.src = "./images/cross.svg";
    if (task.status == true) {
      photocon.appendChild(donestate);
      photo.appendChild(photocon);
    } else {
      photocon.appendChild(notDoneState);
      photo.appendChild(photocon);
    }
    photo.classList.add("state-icons");
    // taskContainer.appendChild(photo);
    taskContainer.appendChild(taskContainerWrapper);
    taskContainer.appendChild(buttonContainerWrapper);

    if(task.status == true){
      taskContainer.style.background = "#C9F9EB"
    }

    
    
    
    function addOrNot(list, taskcon, task) {
      if (type == "all") {
        list.appendChild(taskcon);
      } else if (type == "incompleted") {
        if (task.status == false) {
          list.appendChild(taskcon);
        }
      } else if (type == "completed") {
        if (task.status == true) {
          list.appendChild(taskcon);
        }
      }
    }
    
    switch (task.category) {
      case "work":
        addOrNot(workTaskList, taskContainer, task);
        taskscount[0]++
        break;
        case "personal":
          addOrNot(personalTaskList, taskContainer, task);
          taskscount[1]++
          break;
          case "study":
            addOrNot(studyTaskList, taskContainer, task);
            taskscount[2]++
        break;
    }
  });

  for(let i = 0;i<3;i++){
      let empty = document.createElement("div")
      empty.innerHTML = "Add Tasks to Show"
      empty.classList.add("empty-task")

      if(taskscount[i]==0){
        if(i==0){
            workTaskList.appendChild(empty)
          }else if(i==1){
          personalTaskList.appendChild(empty)
          
        }else if(i==2){
          studyTaskList.appendChild(empty)

        }
      }
  }
  listEle.appendChild(workTaskList);
  listEle.appendChild(personalTaskList);
  listEle.appendChild(studyTaskList);
}

function getTasks() {
  return JSON.parse(localStorage.getItem(`${currentLoginUser}-tasks`)) || [];
}
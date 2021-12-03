const taskUrl = 'http://localhost:3000/showTask';
const completeUrl = 'http://localhost:3000/showComplete';
const taskBox = document.getElementById('taskBox');
const completeBox = document.getElementById('completeBox');

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(taskUrl)
.then((resp) => resp.json())
.then(function(data) {
  let tasks = data;
  return tasks.map(function(todo) {
      
    const taskId = document.createElement('label');
    taskId.setAttribute('id', 'taskId');
    let taskdiv = createNode('div');
    taskdiv.setAttribute("id", "taskDiv")
    let user = createNode('li');
    let task = createNode('li');
    let deadline = createNode('li');
    deadline.setAttribute("id", "deadline");
    const completeButton = createNode('button');
    completeButton.setAttribute('id', 'completeBtn');
    completeButton.innerHTML = "✓";
        completeButton.addEventListener("click", function (e) {
        completeTask(e.target);
        });
    const deleteButton = createNode('button');
    deleteButton.setAttribute('id', 'deleteBtn');
    deleteButton.innerHTML = "X"; 
        deleteButton.addEventListener("click", function (e) {
        deleteTask(e.target);
        });
    
    taskId.innerHTML = `${todo._id}`;
    user.innerHTML = `${todo.user}`; 
    task.innerHTML = `${todo.task}`; 
    deadline.innerHTML = `${todo.deadline}`; 
    
    append(taskdiv, taskId);
    append(taskdiv, user);
    append(taskdiv, task);
    append(taskdiv, deadline);
    append(taskdiv, completeButton);
    append(taskdiv, deleteButton);
    append(taskBox, taskdiv);
  })
})
.catch(function(error) {
  console.log(error);
});

function createTask() {
    const createUrl = 'http://localhost:3000/createTask';
    const userData = document.getElementById("userInput").value;
    const taskData = document.getElementById("taskInput").value;
    const deadLineData = document.getElementById("deadLineInput").value;
    (async () => {
        const rawResponse = await fetch(createUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: userData, task: taskData, deadline: deadLineData})
        });
        const content = await rawResponse.json();
        console.log(content);
        location.reload();
      })()
}

function deleteTask(e) {
    let value = e.parentNode.firstChild.getAttribute('id');
    let subjectData;
    const idData = e.parentNode.firstChild.innerHTML;


    value = String(value);
    if(value === 'taskId') {
        subjectData = 'task';
    }
    else if(value === 'completeId') {
        subjectData = "complete";
    }
    const deleteUrl = 'http://localhost:3000/delete';
    console.log(idData, subjectData);
    (async () => {
            await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: idData, subject: subjectData})
                
            });
            location.reload();
         }
         
    )()
}

//MOVE AND SHOW COMPLETED TASKS

fetch(completeUrl)
.then((resp) => resp.json())
.then(function(data) {
  let completeTasks = data;
  return completeTasks.map(function(complete) {
    
    const completeId = document.createElement('label');
    completeId.setAttribute("id", "completeId");
    let completediv = createNode('div');
    completediv.setAttribute('id', 'completediv')
    let user = createNode('li');
    let task = createNode('li');
    let deadline = createNode('li');
    
    const deleteButton = createNode('button');
    deleteButton.setAttribute("id", "deleteBtn");
    deleteButton.innerHTML = "X"; 
        deleteButton.addEventListener("click", function (e) {
        deleteTask(e.target);
        });
    
    completeId.innerHTML = `${complete._id}`;
    user.innerHTML = `${complete.user}`; 
    task.innerHTML = `${complete.task}`; 
    deadline.innerHTML = `${complete.deadline}`;
   
    append(completediv, completeId);
    append(completediv, user);
    append(completediv, task);
    append(completediv, deadline);
    append(completediv, deleteButton);
    append(completeBox, completediv);
  })
})
.catch(function(error) {
  console.log(error);
});

function completeTask(e){
    const moveUrl = 'http://localhost:3000/taskComplete';
    const idData = e.parentNode.firstChild.innerHTML;
    const date = e.parentNode.querySelector('#deadline').innerHTML;

    const today = new Date().toLocaleDateString();
    if(date === today) {
        (async () => {
            await fetch(moveUrl, {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: idData})
                
            });
            location.reload();
         }
         
    )()
    }
    else {

        console.log("It's not ready to move yet.")
    }
 
}




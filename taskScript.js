//elements:
const addButton = document.getElementById('add-button');
const TaskNameInput = document.getElementById('task-name');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');
const taskItems = document.getElementById('taskItems');

// elements for the filtering option
const filterAllBtn = document.getElementById('filter-all');
const filterCompletedBtn = document.getElementById('filter-completed');
const filterPendingBtn = document.getElementById('filter-pending');
const sortDropdown = document.getElementById('sort-tasks');


//container for tasks
let tasks=[];

//saving to local storage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const stored = localStorage.getItem('tasks');
    if(stored){
        tasks = JSON.parse(stored);
    }
}

loadTasks();
renderTasks();

//add eventListener to addButton:
addButton.addEventListener('click', function(){
    const name = TaskNameInput.value.trim();
    const due = dueDateInput.value;
    const priority = prioritySelect.value;

    if(name && due){
        const task = {name, due, priority, completed:false};
    
    tasks.push(task);
    saveTasks();

    renderTasks();
    TaskNameInput.value = '';
    dueDateInput.value='';
    prioritySelect.value = 'medium';
    }
    else{
        alert("Please Enter a valid task name and due date");
    }

});

//filter btns event listner
let currentFilter = 'all';

filterAllBtn.addEventListener("click", ()=>{
    currentFilter='all';
    renderTasks();
});
filterCompletedBtn.addEventListener('click', ()=>{
    currentFilter='completed';
    renderTasks();
});
filterPendingBtn.addEventListener('click', ()=>{
    currentFilter='pending';
    renderTasks();
});

//sort dropdown eventlistener
sortDropdown.addEventListener('change', ()=>{
    renderTasks();
});


//rendertasks
function renderTasks(){
    taskItems.innerHTML = '';

    let filteredTasks = [...tasks];
    if (currentFilter==='completed'){
        filteredTasks=tasks.filter(task=> task.completed);
    }
    else if (currentFilter==='pending'){
        filteredTasks=tasks.filter(task=> !task.completed);
    }

    const sortOption = sortDropdown.value;

    if(sortOption === 'date'){
        filteredTasks.sort((a,b) => new Date(a.due) - new Date(b.due));
    } 
    else if(sortOption==='priority'){
        const priorityOrder = {high: 1, medium: 2, low: 3};
        filteredTasks.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }


    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className='task-card';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            console.log('Task Completed:', task.completed); // Check if state is being updated
            renderTasks(); // Re-render after change
            saveTasks();
        };
        
        const strong = document.createElement('strong');
        strong.textContent = task.name;
        if (task.completed) {
            strong.style.textDecoration = 'line-through';
        }


        const dueSpan = document.createElement('span');
        dueSpan.textContent = `Due: ${task.due}`;

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
        prioritySpan.className = `priority-${task.priority}`;

        const deleteBin = document.createElement('button');
        deleteBin.textContent = '🗑️';
        deleteBin.className = 'delete-bin';
        deleteBin.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
        };
        const editButton =  document.createElement('button');
        editButton.textContent = '✏️';
        editButton.className = 'edit-button';
        editButton.onclick = () => {
            TaskNameInput.value = task.name;
            dueDateInput.value = task.due;
            prioritySelect.value = task.priority;

            // Remove the task to allow for immediate modification
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
        };

        div.append(checkbox, strong, document.createElement('br'), dueSpan, prioritySpan, editButton, deleteBin);
        li.appendChild(div);
        taskItems.appendChild(li);
    });
}


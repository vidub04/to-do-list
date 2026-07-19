//first pass parameter in function def
//in api pass that parameter as placeholder to send to python function
//then define python function with parameter as in url

async function Deletion(id) {
    await fetch(`https://to-do-list-six-dun-73.vercel.app/delete/${id}`,{method:"DELETE"});
    location.reload(); //for reloading entire page

}

async function markCompletion(id) {
    await fetch(`https://to-do-list-six-dun-73.vercel.app/mark/${id}`,{method:"PUT"});
    location.reload(); //for reloading entire page

}

function openModal() {
    document.getElementById("taskModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}


async function insert() {
    const task = document.getElementById("taskName").value;

    await fetch("https://to-do-list-six-dun-73.vercel.app/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: task
        })
    });

    location.reload();
}


async function loadTasks() {
    const response = await fetch("https://to-do-list-six-dun-73.vercel.app/showtasks");
    const tasks = await response.json();

    const taskList = document.getElementById("left");
    

    tasks.forEach(task => {
        const div = document.createElement("div");

        div.innerHTML = `
    <div class="task-row">
        <h3>${task.name}</h3>

        <div class="actions">
            <button onclick="markCompletion(${task.task_id})" class="add">Mark Complete</button>
            <button onclick="Deletion(${task.task_id})" class="add">Delete Task</button>
        </div>
    </div>
`;

        taskList.appendChild(div);
        
        
    });


    const res=await fetch("https://to-do-list-six-dun-73.vercel.app/showdone")
    const done=await res.json()

    const list=document.getElementById("right")

    done.forEach(task => {
        const d=document.createElement("div")

              d.innerHTML = `
    <div class="task-row">
        <h3>${task.name}</h3>

        <div class="actions">
            <button onclick="Deletion(${task.task_id})" class="add">Delete Task</button>
        </div>
    </div>
`;

        list.appendChild(d);
    });
}

loadTasks();
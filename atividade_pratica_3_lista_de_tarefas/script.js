document.addEventListener("DOMContentLoaded", () => {
    loadTask();
});

let completo = 0;
let incompleto = 0;

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim(); 

    if (taskText === "") {
        alert("Digite uma tarefa válida!");
        return;
    }

    completo++; //  total de tarefas + 1
    atualizarProgresso();

    let taskList = document.getElementById("taskList");
    let item = document.createElement("li");

    item.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Deletar</button>
    `;
    
    taskList.appendChild(item);
    taskInput.value = "";

    saveTask();
}

function toggleTask(element) {
    element.parentElement.classList.toggle("completed");

    if (element.parentElement.classList.contains("completed")) {
        incompleto++; // se completou, aumenta o contador
    } else {
        incompleto--; // se mudou pra incompleto, diminui o contador
    }

    atualizarProgresso();
    saveTask();
}

function deleteTask(button) {
    let taskItem = button.parentElement;

    if (taskItem.classList.contains("completed")) {
        incompleto--; // Se remover uma tarefavconcluída, atualizar o incompleto
    }
    
    completo--; // e diminui o total de tarefas
    atualizarProgresso();

    taskItem.remove();
    saveTask();
}

function atualizarProgresso() {
    document.getElementById("progresso").textContent = `${incompleto} de ${completo}`;
}

function saveTask() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.innerText.replace("Deletar", "").trim(),
            status: task.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let item = document.createElement("li");

        item.innerHTML = `
        <span onclick="toggleTask(this)">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Deletar</button>
        `;

        if (task.status) {
            item.classList.add("completed");
            incompleto++;
        }
        
        taskList.appendChild(item);
    });

    completo = tasks.length;
    atualizarProgresso();
}

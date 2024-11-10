document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  function saveTasks() {
    const tasks = [];
    //interaje sobre os itens de tarefa para obter o texto de cada um
    taskList.querySelectorAll("li").forEach((task) => {
      tasks.push(task.firstChild.textContent); // armaze apenas o texto ignorando o botão deletar
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Salva como uma string JSON
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks" || "[]")); //pega a lista ou array vazio
    tasks.forEach((taskText) => {
      const li = document.createElement("li"); // Cria um novo elemento <li>
      li.textContent = taskText;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        li.remove();
        saveTasks(); //chama função para atualizar o localStorage após a remoção
      });
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    // O método trim() remove espaços em branco extras no início e no final da string retornada
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      // Criar a nova tarefa
      const li = document.createElement("li");
      li.textContent = taskText;
      //cria o botão de excluir
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        li.remove();
      });
      //adciona o botao de excluir ao item de lista
      //appendChild coloca o elemento dentro dentro do li
      li.appendChild(deleteButton);
      //adciona a nova tarefa a lista
      taskList.appendChild(li);
      // limpar o campo de input após adcionar a tarefa
      taskInput.value = "";
      //chama a função para atualizar o localStorage
      saveTasks();
    } else {
      alert("Por favor, digite uma tarefa!");
    }
  }
  // Evento para adicionar a tarefa quando o botão for clicado
  addTaskButton.addEventListener("click", addTask);
  // Também permitir adicionar tarefa ao pressionar Enter
  taskInput.addEventListener("keydown", (event) => {
    // Escuta o evento de pressionamento de tecla no campo de input
    if (event.key === "Enter") {
      // Verifica se a tecla pressionada foi 'Enter'
      addTask(); // Chama a função addTask para adicionar a tarefa
    }
  });
  loadTasks(); // Carrega as tarefas salvas ao carregar a página
});

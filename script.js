document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  function saveTasks() {
    const tasks = [];
    //interaje sobre os itens de tarefa para obter o texto de cada um
    taskList.querySelectorAll("li").forEach((taskItem) => {
      const taskText =
        taskItem.firstChild.textContent.split(" (Adicionada em: ")[0];
      const taskDate = taskItem.firstChild.textContent
        .split(" (Adicionada em: ")[1]
        .slice(0, -1); // Extrai apenas a data
      // Adiciona a tarefa e a data como um objeto no array tasks
      tasks.push({ text: taskText, date: taskDate });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Salva como uma string JSON
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks" || "[]")); //pega a lista ou array vazio
    tasks.forEach((taskText) => {
      const li = document.createElement("li"); // Cria um novo elemento <li>
      li.textContent = `${task.text} (Adicionada em: ${task.date})`;
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
      // Obtém a data e formata como uma string legível (ex: "10/11/2024")
      const currentDate = new Date();
      const data = currentDate.getDate();
      const mes = currentDate.getMonth() + 1;
      const ano = currentDate.getFullYear();
      const formattedDate = `${data}/${mes}/${ano}`;
      // Inclui a data e o texto da tarefa
      li.textContent = `${taskText} (Adicionada em: ${formattedDate})`;
      //cria o botão de excluir
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        li.remove();
      });
      //botao para marcar como concluida
      const completeButton = document.createElement("button");
      completeButton.textContent = "✔";
      completeButton.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });
      //adciona o botao de deletar ao item da lista
      li.appendChild(completeButton);
      //adciona o botao de excluir ao item de lista
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

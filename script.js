document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskTableBody = document.querySelector(".task-table tbody");

  function saveTasksToLocalStorage() {
    const tasks = [];
    //iteração sobre cada linha da tabela
    taskTableBody.querySelectorAll("tr").forEach((row) => {
      //extração de dados
      const tastText = row.querySelector("td:nth-child(1)").textContent;
      const dateAdded = row.querySelector("td:nth-child(2)").textContent;
      const dateCompleted = row.querySelector("td:nth-child(3)").textContent;
      const isCompleted = row.classList.contains("completed");
      //criação de um objeto para cada tasks
      taskInput.push({
        tastText,
        dateAdded,
        dateCompleted,
        isCompleted,
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask() {
    const taskText = taskInput.value.trim(); //Remove espaços em branco extras
    if (taskText !== "") {
      const currentDate = new Date();
      const data = currentDate.getDate();
      const mes = currentDate.getMonth() + 1;
      const ano = currentDate.getFullYear();
      const formattedDate = `${data}/${mes}/${ano}`;

      //criar a linha da tabela
      const row = document.createElement("tr");
      //criar a coluna da tarefa e receber a tarefa
      const taskCell = document.createElement("td");
      taskCell.textContent = taskText;
      //criar a coluna da data de INICIO e receber a data
      const dateAddedCell = document.createElement("td");
      dateAddedCell.textContent = formattedDate;
      //criar a coluna da da data de conclusão (inicialmente vazia)
      const dateCompletedCell = document.createElement("td");
      dateCompletedCell.textContent = "";
      //criar a coluna para receber as celulas de concluir e deletar
      const buttonCell = document.createElement("td");
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("flex");
      // Criar o botão de Concluir
      const completeButtonCell = document.createElement("td");
      const completeButton = document.createElement("button");
      completeButton.textContent = "✔";
      completeButton.classList.add("complete-task");
      completeButton.addEventListener("click", () => {
        row.classList.toggle("completed"); // Marca a linha como concluída
        // Adiciona ou remove a classe 'completed' do botão
        completeButton.classList.toggle("completed");
        // Se a tarefa for concluída, preenche a data de conclusão
        if (row.classList.contains("completed")) {
          const completedDate = new Date();
          const completedData = completedDate.getDate();
          const completedMes = completedDate.getMonth() + 1;
          const completedAno = completedDate.getFullYear();
          const formattedCompletedDate = `${completedData}/${completedMes}/${completedAno}`;
          dateCompletedCell.textContent = formattedCompletedDate;
          saveTasksToLocalStorage();
        } else {
          // Se a tarefa for desmarcada, limpa a data de conclusão
          dateCompletedCell.textContent = "";
          saveTasksToLocalStorage();
        }
      });
      // Criar o botão de deletar
      const deleteButtonCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.classList.add("delete-task");
      deleteButton.addEventListener("click", () => {
        row.remove();
        saveTasksToLocalStorage();
      });
      // Adicionar as células à linha
      row.appendChild(taskCell);
      row.appendChild(dateAddedCell);
      row.appendChild(dateCompletedCell);
      row.appendChild(buttonCell);
      // Adicionar os botões dentro da container
      buttonContainer.appendChild(completeButton);
      buttonContainer.appendChild(deleteButton);
      buttonCell.appendChild(buttonContainer);
      // Adicionar a linha à tabela
      taskTableBody.appendChild(row);
      // Limpar o campo de entrada
      taskInput.value = "";
    } else {
      Toastify({
        text: "Por favor, digite uma tarefa!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
        },
      }).showToast();
      return;
    }
    saveTasksToLocalStorage();
  }
  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

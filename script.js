document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskTableBody = document.querySelector(".task-table tbody");

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Recupera as tarefas do localStorage ou um array vazio se não houver nada

    tasks.forEach((task) => {
      // Itera sobre cada tarefa recuperada
      const row = document.createElement("tr"); // Cria uma nova linha para a tabela

      // Criação da célula da tarefa
      const taskCell = document.createElement("td");
      taskCell.textContent = task.taskText; // Adiciona o texto da tarefa

      // Criação da célula da data de adição
      const dateAddedCell = document.createElement("td");
      dateAddedCell.textContent = task.dateAdded; // Adiciona a data de adição da tarefa

      // Criação da célula da data de conclusão
      const dateCompletedCell = document.createElement("td");
      dateCompletedCell.textContent = task.dateCompleted; // Adiciona a data de conclusão (se houver)

      // Criação da célula dos botões (concluir e excluir)
      const buttonCell = document.createElement("td");
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("flex");

      // Criação do botão de concluir
      const completeButton = document.createElement("button");
      completeButton.textContent = "✔"; // Texto do botão
      completeButton.classList.add("complete-task");

      // Se a tarefa foi concluída, marca a linha e o botão como concluído
      if (task.isCompleted) {
        row.classList.add("completed");
        completeButton.classList.add("completed");
      }

      // Lógica do botão de concluir (marca como concluído/desmarca)
      completeButton.addEventListener("click", () => {
        row.classList.toggle("completed"); // Alterna a classe 'completed' na linha
        completeButton.classList.toggle("completed"); // Alterna a classe 'completed' no botão

        // Atualiza a data de conclusão se a tarefa for concluída
        if (row.classList.contains("completed")) {
          const completedDate = new Date();
          const completedData = completedDate.getDate();
          const completedMes = completedDate.getMonth() + 1;
          const completedAno = completedDate.getFullYear();
          const formattedCompletedDate = `${completedData}/${completedMes}/${completedAno}`;
          dateCompletedCell.textContent = formattedCompletedDate;
        } else {
          dateCompletedCell.textContent = "";
        }
        saveTasksToLocalStorage();
      });
      // Criação do botão de deletar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x"; // Texto do botão de excluir
      deleteButton.classList.add("delete-task");
      deleteButton.addEventListener("click", () => {
        row.remove(); // Remove a linha da tabela
        saveTasksToLocalStorage(); // Salva as alterações no localStorage
      });
      // Adiciona os botões dentro do container de botões
      buttonContainer.appendChild(completeButton);
      buttonContainer.appendChild(deleteButton);
      buttonCell.appendChild(buttonContainer);
      // Adiciona as células na linha
      row.appendChild(taskCell);
      row.appendChild(dateAddedCell);
      row.appendChild(dateCompletedCell);
      row.appendChild(buttonCell);
      // Adiciona a linha à tabela
      taskTableBody.appendChild(row);
    });
  }

  function saveTasksToLocalStorage() {
    const tasks = [];
    //iteração sobre cada linha da tabela
    taskTableBody.querySelectorAll("tr").forEach((row) => {
      //extração de dados
      const taskText = row.querySelector("td:nth-child(1)").textContent;
      const dateAdded = row.querySelector("td:nth-child(2)").textContent;
      const dateCompleted = row.querySelector("td:nth-child(3)").textContent;
      const isCompleted = row.classList.contains("completed");
      //criação de um objeto para cada tasks
      tasks.push({
        taskText,
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
  // Carregar as tarefas ao iniciar a página
  loadTasksFromLocalStorage();
});

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskTableBody = document.querySelector(".task-table tbody");

  function addTask() {
    const taskText = taskInput.value.trim(); //Remove espaços em branco extras
    if (taskText !== "") {
      const currentDate = new Date();
      const data = currentDate.getDate();
      const mes = currentDate.getMonth() + 1;
      const ano = currentDate.getFullYear();
      const formattedDate = `${data}/${mes}/${ano}`;

      //criar a linha
      const row = document.createElement("tr");
      //criar a coluna da tarefa e receber a tarefa
      const taskCell = document.createElement("td");
      taskCell.textContent = taskText;
      //criar a coluna da data e receber a data
      const dateAddedCell = document.createElement("td");
      dateAddedCell.textContent = formattedDate;

      row.appendChild(taskCell);
      row.appendChild(dateAddedCell);
      taskTableBody.appendChild(row);
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
  }
  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

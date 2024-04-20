import { TodoList } from "./todo";

document.addEventListener("DOMContentLoaded", () => {
  const todoList = new TodoList();

  const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
  const discardButton = document.getElementById(
    "discardButton"
  ) as HTMLButtonElement;
  const addButton = document.getElementById("addButton") as HTMLButtonElement;
  const resetButton = document.getElementById(
    "resetButton"
  ) as HTMLButtonElement;

  const taskInput = document.getElementById("todo-task") as HTMLInputElement;
  const prioritySelect = document.getElementById(
    "todo-priority"
  ) as HTMLSelectElement;
  const todoListElement = document.getElementById("todo-list");
  const communicationElement = document.getElementById("communication");

  if (communicationElement) communicationElement.innerHTML = "";

  // Definiera en global variabel för att lagra index av todo som redigeras
  let editingTodoIndex: number | null = null;

  addButton.onclick = () => {
    const task = taskInput.value;
    const priority = parseInt(prioritySelect.value, 10);

    const success = todoList.addTodo(task, priority);
    if (!success) {
      {

        communication("Both task and prioritization must have values!", "red"); // Justerar förseningen för att dölja meddelandet efter toningseffekten
      }
      return;
    }
    else {
      communication("Task added successfully!", "green"); // Justerar förseningen för att dölja meddelandet efter toningseffekten
    }
    updateUI();
    taskInput.value = ""; // Rensa inmatningsfält efter att ha lagt till en todo

  };

  function communication(message: string, messageColor: string) {
    if (communicationElement) {
      communicationElement.innerHTML = message;
      communicationElement.style.transition = "opacity 1.5s"; // Anger övergångens varaktighet
      communicationElement.style.opacity = "1"; // Anger initial opacitet till helt synlig
      communicationElement.style.color = messageColor; // Anger initial färg på texten

      setTimeout(() => {
        communicationElement.style.opacity = "0"; // Anger opaciteten till 0 för en toningseffekt
      }, 3000); // Justerar förseningen (i millisekunder)

      setTimeout(() => {
        if (communicationElement) communicationElement.innerHTML = "";
      }, 4500);
    }
  }


  resetButton.onclick = () => {
    updateUI(); // Uppdatera UI
  };

  saveButton.onclick = () => {
    if (editingTodoIndex !== null) {
      const updatedTask = taskInput.value;
      let success = todoList.editTodo(
        editingTodoIndex,
        updatedTask,
        parseInt(prioritySelect.value, 10)
      );
      if (success) {
        updateUI();
        communication("Task updated successfully!", "green"); // Justerar förseningen för att dölja meddelandet efter toningseffekten
        editingTodoIndex = null; // Återställ variabeln för redigeringsTodoIndex
      }
      else communication("Task update failed!", "red"); // Justerar förseningen för att dölja meddelandet efter toningseffekten

    }
  };

  discardButton.onclick = () => {
    updateUI();
  };

  function updateUI() {
    if (!todoListElement) return;
    todoListElement.innerHTML = ""; // Rensa todo-listan

    // Skapa en tabell och dess rubriker
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);

    taskInput.value = ""; // Rensa todo-listelementet
    prioritySelect.value = "0"; // Återställ prioritet till ovald
    addButton.style.display = "inline-block"; // Visa lägga till-knappen
    saveButton.style.display = "none"; // Göm spara-knappen
    discardButton.style.display = "none"; // Göm kassera-knappen
    resetButton.style.display = "inline-block"; // Visa återställ-knappen

    // Definiera tabellrubriker
    const headers = ["Task", "Priority", "Created", "Completed", "Actions"];
    const trHead = document.createElement("tr");
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    // Lägg till en rad i tabellen för varje todo
    const todos = todoList.getTodos();
    todos.forEach((todo, index) => {
      const tr = document.createElement("tr");

      // Skapa celler för todo-information
      const taskCell = document.createElement("td");
      const priorityCell = document.createElement("td");
      const createdCell = document.createElement("td");
      const completedCell = document.createElement("td");
      const actionCell = document.createElement("td");

      // Fyll cellerna med data
      taskCell.textContent = todo.task;
      priorityCell.textContent =
        ["High", "Medium", "Low"][todo.priority - 1] || "Unknown";
      createdCell.textContent = todo.createdDate;
      completedCell.textContent = todo.completedDate ? todo.completedDate : "-";

      tr.appendChild(taskCell);
      tr.appendChild(priorityCell);
      tr.appendChild(createdCell);
      tr.appendChild(completedCell);

      // Skapa åtgärdsknappar
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "editButton";
      editButton.onclick = () => {
        editingTodoIndex = index; // Spara index för den todo som redigeras
        taskInput.value = todo.task; // Fyll i formuläret med todo-data för redigering
        prioritySelect.value = todo.priority.toString();
        addButton.style.display = "none";
        saveButton.style.display = "inline-block";
        discardButton.style.display = "inline-block";
        resetButton.style.display = "none";
      };
      actionCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "deleteButton";
      deleteButton.onclick = () => {
        let success = todoList.deleteTodo(index);
        updateUI();
        if (success) communication("Task deleted successfully!", "green");
        else communication("Task deletion failed!", "red"); 

      };
      actionCell.appendChild(deleteButton);


      if(completedCell.textContent === "-") {
      
      const completionButton = document.createElement("button");
      completionButton.textContent = "Mark as completed";
      completionButton.className = "completionButton";
      completionButton.onclick = () => {
        let success = todoList.markTodoCompleted(index);
        updateUI();
        if (success) communication("Task marked as completed!", "green"); 
        else communication("Task update failed!", "red"); 

      };
      actionCell.appendChild(completionButton);
    }
    else {
      const revokeButton = document.createElement("button");
      revokeButton.textContent = "Revoke completion";
      revokeButton.className = "revokeButton";
      revokeButton.onclick = () => {
        let success = todoList.revokeTodoCompleted(index);
        updateUI();
        if (success) communication("Task completion revoked!", "green"); 
        else communication("Task update failed!", "red"); 

      };
      actionCell.appendChild(revokeButton);
    
    }


      tr.appendChild(actionCell);
      tbody.appendChild(tr);
    });

    // Lägg till tabellen i todoListElement
    todoListElement.appendChild(table);
  }

  updateUI(); // Uppdatera UI vid applikationsstart
});

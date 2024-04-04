import { TodoList } from "./todo";

document.addEventListener("DOMContentLoaded", () => {
  const todoList = new TodoList();

  const form = document.getElementById("todo-form");
  const taskInput = document.getElementById("todo-task") as HTMLInputElement;
  const prioritySelect = document.getElementById(
    "todo-priority"
  ) as HTMLSelectElement;
  const todoListElement = document.getElementById("todo-list");

  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindra formuläret från att skickas

    const task = taskInput.value;
    const priority = parseInt(prioritySelect.value, 10); // Konvertera sträng till heltal

    const success = todoList.addTodo(task, priority);
    if (!success) {
      alert("Invalid values for task or priority");
      return;
    }

    updateUI();
    taskInput.value = ""; // Rensa input efter att ha lagt till en todo
  });

  function updateUI() {
    if (!todoListElement) return;
    // Rensa befintlig tabell innan uppdatering
    todoListElement.innerHTML = "";
  
    // Skapa en tabell och dess rubriker
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // Definiera rubrikerna för tabellen
    const headers = ["Task", "Priority", "Created", "Completed", "Actions"];
    const trHead = document.createElement("tr");
    headers.forEach(headerText => {
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
      
      switch (todo.priority) {
        case 1:
          priorityCell.textContent = "High";
          break;
        case 2:
          priorityCell.textContent = "Medium";
          break;
        case 3:
          priorityCell.textContent = "Low";
          break;
        default:
          // om ogiltig prioritet, sätt till "Unknown"
          break;
      }
      
      
      createdCell.textContent = todo.createdDate;
      completedCell.textContent = todo.completedDate ? todo.completedDate : "-";
  
      tr.appendChild(taskCell);
      tr.appendChild(priorityCell);
      tr.appendChild(createdCell);
      tr.appendChild(completedCell);
  
      // Skapa knappar för handlingar
      if (!todo.completed) {
        const completeButton = document.createElement("button");
        completeButton.textContent = "Mark as completed";
        completeButton.onclick = () => {
          todoList.markTodoCompleted(index); // Markera todo som slutförd
          updateUI();
        };
        actionCell.appendChild(completeButton);
      } else {
        const revokeButton = document.createElement("button");
        revokeButton.textContent = "Revoke completion";
        revokeButton.onclick = () => {
          todoList.revokeTodoCompleted(index); // Markera todo som ej slutförd
          updateUI();
        };
        actionCell.appendChild(revokeButton);
      }
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => {
        todoList.deleteTodo(index);
        updateUI();
      };
      actionCell.appendChild(deleteButton);
  
      tr.appendChild(actionCell);
      tbody.appendChild(tr);
    });
  
    // Lägg till tabellen till todoListElement
    todoListElement.appendChild(table);
  }
  

  updateUI(); // Uppdatera UI vid applikationsstart
});

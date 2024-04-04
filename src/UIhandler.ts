import { TodoList } from './todo';

document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();

    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('todo-task') as HTMLInputElement;
    const prioritySelect = document.getElementById('todo-priority') as HTMLSelectElement;
    const todoListElement = document.getElementById('todo-list');

    if(!form) return;
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Förhindra formuläret från att skickas
        
        const task = taskInput.value;
        const priority = parseInt(prioritySelect.value, 10); // Konvertera sträng till heltal

        const success = todoList.addTodo(task, priority);
        if (!success) {
            alert('Invalid values for task or priority');
            return;
        }

        updateUI();
        taskInput.value = ''; // Rensa input efter att ha lagt till en todo
    });

    function updateUI() {
        if(!todoListElement) return;
        todoListElement.innerHTML = ''; // Rensa befintlig lista innan uppdatering

        const todos = todoList.getTodos();
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.task} - Priority: ${todo.priority} - ${todo.completed ? 'Completed' : 'Not completed'} - Created: ${todo.createdDate} - Completed: ${todo.completedDate ? todo.completedDate : 'Not completed yet'}`;
            todoListElement.appendChild(todoItem);

            // Add a 'Mark as completed' button
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Mark as completed';
            completeButton.onclick = () => {
                todoList.markTodoCompleted(index);
                updateUI();
            };
            todoItem.appendChild(completeButton);
        });
    }

    updateUI(); // Uppdatera UI vid applikationsstart
});

export interface Todo {
  task: string; // Uppgiftens text
  completed: boolean; // Om uppgiften är avklarad eller inte
  priority: number; // Prioritet för uppgiften, 1 till 3 där 1 är högsta prioritet
  createdDate: string; // Skapelsedatum för uppgiften
  completedDate?: string; // Datum då uppgiften avklarades, är valfri
}

export class TodoList {
  todos: Todo[] = []; // Lista med alla todos

  constructor() {
    this.loadFromLocalStorage(); // Laddar todos från lokal lagring när TodoList instansieras
  }

  addTodo(task: string, priority: number): boolean {
    // Lägger till en todo. Returnerar false om ogiltiga värden angivits.
    if (!task || priority < 1 || priority > 3) {
      return false;
    }

    const newTodo: Todo = {
      task,
      completed: false,
      priority,
      createdDate: new Date().toISOString().split("T")[0], // Sätter dagens datum som skapelsedatum
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage(); // Spara den uppdaterade listan till lokal lagring
    return true;
  }

  markTodoCompleted(todoIndex: number): void {
    // Markerar en todo som avklarad
    if (this.todos[todoIndex]) {
      this.todos[todoIndex].completed = true;
      this.todos[todoIndex].completedDate = new Date().toISOString().split("T")[0];
      this.saveToLocalStorage(); // Spara ändringar i lokal lagring
    }
  }

  revokeTodoCompleted(todoIndex: number): void {
    // Återställer en todo till ej avklarad
    if (this.todos[todoIndex]) {
      this.todos[todoIndex].completed = false;
      this.todos[todoIndex].completedDate = undefined;
      this.saveToLocalStorage(); // Spara ändringar i lokal lagring
    }
  }

  editTodo(todoIndex: number, task: string, priority: number): void {
    // Redigerar en specifik todo
    if (this.todos[todoIndex]) {
      this.todos[todoIndex].task = task;
      this.todos[todoIndex].priority = priority;
      this.saveToLocalStorage(); // Spara ändringar i lokal lagring
    }
  }

  deleteTodo(todoIndex: number): void {
    // Tar bort en specifik todo
    if (this.todos[todoIndex]) {
      this.todos.splice(todoIndex, 1); // Ta bort todo vid angivet index
      this.saveToLocalStorage(); // Spara ändringar i lokal lagring
    }
  }

  getTodos(): Todo[] {
    // Returnerar listan med todos
    return this.todos;
  }

  saveToLocalStorage(): void {
    // Sparar todos i lokal lagring
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadFromLocalStorage(): void {
    // Laddar todos från lokal lagring
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }
}

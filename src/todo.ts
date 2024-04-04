  export interface Todo {
    task: string;
    completed: boolean;
    priority: number; // 1 till 3, där 1 är högsta prioritet
  }

  export class TodoList {
    todos: Todo[] = [];
  
    constructor() {
      this.loadFromLocalStorage();
    }
  
    addTodo(task: string, priority: number): boolean {
      if (!task || priority < 1 || priority > 3) {
        console.error("Felaktiga värden för task eller priority");
        return false;
      }
  
      const newTodo: Todo = { task, completed: false, priority };
      this.todos.push(newTodo);
      this.saveToLocalStorage();
      return true;
    }
  
    markTodoCompleted(todoIndex: number): void {
      if (this.todos[todoIndex]) {
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage();
      }
    }
  
    getTodos(): Todo[] {
      return this.todos;
    }
  
    saveToLocalStorage(): void {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  
    loadFromLocalStorage(): void {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    }
  }
  

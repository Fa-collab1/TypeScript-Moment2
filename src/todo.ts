  export interface Todo {
    task: string;
    completed: boolean;
    priority: number; // 1 till 3, där 1 är högsta prioritet
    createdDate: string;
    completedDate?: string;
  }

  export class TodoList {
    todos: Todo[] = [];
  
    constructor() {
      this.loadFromLocalStorage();
    }
  
    addTodo(task: string, priority: number): boolean {
      if (!task || priority < 1 || priority > 3) { // task får inte vara tom och priority måste vara mellan 1 och 3 (men task kommer inte kunna vara tom pga. required-attributet i input-elementet i index.html)
        console.error("Invalid values for task or priority"); //kommer inte heller kunna hända då vi har fasta värden i dropdown-menyn (men den här ska ju kunna användas till andra projekt också så det är bra att ha med det här ändå)
        return false;
      }
  
      const newTodo: Todo = { task, completed: false, priority, createdDate: new Date().toISOString().split('T')[0]};
      this.todos.push(newTodo);
      this.saveToLocalStorage();
      return true;
    }


  
    markTodoCompleted(todoIndex: number): void {
      if (this.todos[todoIndex]) {
        this.todos[todoIndex].completed = true;
        this.todos[todoIndex].completedDate = new Date().toISOString().split('T')[0];
        this.saveToLocalStorage();
      }
    }
  
    revokeTodoCompleted(todoIndex: number): void {
      if (this.todos[todoIndex]) {
        this.todos[todoIndex].completed = false;
        this.todos[todoIndex].completedDate = undefined;
        this.saveToLocalStorage();
      }
    }


    deleteTodo(todoIndex: number): void {
      if (this.todos[todoIndex]) {
        this.todos.splice(todoIndex, 1); // remove the todo at index
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
  

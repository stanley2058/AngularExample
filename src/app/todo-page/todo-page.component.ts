import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  @ViewChild("todoInput") todoInput: ElementRef<MatInput>;
  todoList: Todo[] = [];
  todoEditing: Todo;

  constructor() { }

  ngOnInit(): void {
    const todoJson = localStorage.getItem("todolist");
    if (todoJson) this.todoList = JSON.parse(todoJson);
  }

  changeStatus(todo: Todo): void {
    todo.status = !todo.status;

    localStorage.setItem("todolist", JSON.stringify(this.todoList));
  }

  deleteTodo(todo: Todo): void {
    this.todoList = this.todoList.filter(t => t.id !== todo.id);
    
    localStorage.setItem("todolist", JSON.stringify(this.todoList));
  }

  edit(todo: Todo): void {
    this.todoEditing = todo;
    this.todoInput.nativeElement.value = todo.context;
    
    localStorage.setItem("todolist", JSON.stringify(this.todoList));
  }
  
  finishEdit(): void {
    this.todoList.forEach(t => {
      if (t.id === this.todoEditing.id) {
        t.context = this.todoInput.nativeElement.value;
      }
    });
    this.todoEditing = null;
    this.todoInput.nativeElement.value = "";
    
    localStorage.setItem("todolist", JSON.stringify(this.todoList));
  }

  add(): void {
    const context = this.todoInput.nativeElement.value.trim();
    if (!context) return;
    this.todoList.push({
      id: uuidv4(),
      status: false,
      context
    });
    this.todoInput.nativeElement.value = "";
    
    localStorage.setItem("todolist", JSON.stringify(this.todoList));
  }

  inputKeypress($event: KeyboardEvent): void {
    if ($event.key === "Enter") {
      if (this.todoEditing) this.finishEdit();
      else this.add();
    }
  }
}

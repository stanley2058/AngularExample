import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoPageComponent } from './todo-page/todo-page.component';


const routes: Routes = [
  { path: "", component: TodoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

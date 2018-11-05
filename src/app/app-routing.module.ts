import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {TodoGuard} from './todo/todo.guard';
import {HomeComponent} from './home/home.component';
import {ChatComponent} from './chat/chat.component';
import {BlogComponent} from './blog/blog.component';
import {PostComponent} from './post/post.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'todo', component: TodoComponent, canActivate: [TodoGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, canActivate: [TodoGuard]},
  { path: 'blog', component: BlogComponent },
  { path: 'post/:id', component: PostComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

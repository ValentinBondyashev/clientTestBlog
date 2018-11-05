import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { TodoComponent } from './todo/todo.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {TodoGuard} from './todo/todo.guard';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import {BlogComponent} from './blog/blog.component';
import {BlogService} from './blog/blog.service';
import { PostComponent } from './post/post.component';
import {PostService} from './post/post.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    BlogComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TodoGuard, ChatService, BlogService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }

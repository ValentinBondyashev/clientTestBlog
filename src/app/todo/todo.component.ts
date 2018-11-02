import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [HttpService]
})
export class TodoComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    taskList: new FormControl(),
    taskName: new FormControl()
  });
  private tasks;
  constructor(private httpService: HttpService) {}

  ngOnInit () {
    this.httpService.getAllTasks().subscribe(data => {
        this.tasks = data['tasks'];
      },
      err => {
        console.log(err);
      }
    );
  }

  edit(i) {
    this.tasks[i]['edit'] = true;
  }

  save(id, i) {
    this.httpService.updateTask(this.form.value.taskName, id).subscribe(data => {
      this.httpService.getAllTasks().subscribe(tasks => {
          this.tasks = tasks['tasks'];
        },
        err => {
          console.log(err);
        }
      );
    });
    this.tasks[i]['edit'] = false;
    this.form.reset();
  }

  submit() {
    const task = {
      task: this.form.value.taskList,
      dateCreate: new Date,
      edit: false
    };
    if (this.form.value.taskList !== null) {
      this.httpService.createTask(task).subscribe(
        data => {
          this.tasks.push(data['task']);
        },
        err => console.log(err)
      );
      this.form.reset();
    }
    this.form.reset();
  }

  deleteTask(id) {
    this.httpService.deleteTask(id).subscribe(data => {
      this.httpService.getAllTasks().subscribe(tasks => {
          this.tasks = tasks['tasks'];
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}



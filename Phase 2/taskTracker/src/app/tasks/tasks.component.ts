import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { taskToBeDone } from './taskToBeDone';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks:Array<taskToBeDone> = [];
  constructor() { }

  ngOnInit(): void {
  }

  addTask(taskRef:NgForm)
  {
    let taskSetter = taskRef.value;
    let temp:taskToBeDone = {
      id:taskSetter.id,
      name:taskSetter.name,
      task:taskSetter.task,
      deadLine:taskSetter.deadLine

    };
    console.log("The id is " +temp.id)
    this.tasks.push(temp);
  }

}

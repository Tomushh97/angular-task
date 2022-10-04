import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NgModel } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean;
  faTimes = faTimes;
  faPenToSquare = faPenToSquare;
  showEditTask: boolean;
  subscription: Subscription;
  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggleEdit()
      .subscribe((value) => (this.showEditTask = value)); //* value to jest przeciwieństwo showEditTask które ustawia się w toggleAddTask w ui.service. Tu sie tez subskrybuje observabla z ui.service
  } //! tu też łapiemy value

  ngOnInit(): void {}
  //to definicja metody używanej w komponencie task-item
  onDelete(task: any) {
    this.onDeleteTask.emit(task); //to leci do tasks.component.html
  }
  onToggle(task: any) {
    this.onToggleReminder.emit(task); //to leci do tasks.component.html -> trzeba isc do komponentu rodzic "tasks" i tak samo jak onDeleteTask dodajemy onToggleReminder tam
  }
  onToggleEdit(task: any) {
    this.uiService.toggleEditTask(); //*wywołujemy metodę napisaną w ui.service.ts
  }
}

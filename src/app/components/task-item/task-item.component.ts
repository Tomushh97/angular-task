import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';
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
  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
  onToggle(task: Task) {
    this.onToggleReminder.emit(task); //to leci do tasks.component.html -> trzeba isc do komponentu rodzic "tasks" i tak samo jak onDeleteTask dodajemy onToggleReminder tam
  }
  onToggleEditForm(task: Task) {
    this.uiService.toggleEdit(task);
  }
}

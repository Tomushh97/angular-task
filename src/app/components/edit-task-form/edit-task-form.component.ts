import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
})
export class EditTaskFormComponent implements OnInit {
  @Input() task: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean;
  showEditTask: boolean;
  selectedTask: Task | null;
  subscriptionEdit: Subscription;

  constructor(private uiService: UiService) {
    this.subscriptionEdit = this.uiService.onToggleEdit$.subscribe(
      (selectedTask) => {
        this.selectedTask = selectedTask;
        this.showEditTask = this.selectedTask !== null;
      }
    );
  }

  ngOnInit(): void {}
  onSubmit() {
    if (!this.text) {
      return;
    }
    const editedTask = {
      ...this.task,
      text: (this.task.text = this.text),
      day: this.day,
      reminder: this.reminder,
    };
    this.onEditTask.emit(editedTask);
    this.text = '';
    this.showEditTask = false;
  }
}

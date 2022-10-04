import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  deleteTask(task: Task) {
    //osobny obiekt, nie array więc bez []
    this.taskService.deleteTask(task).subscribe(
      //to jest jak then
      () => (this.tasks = this.tasks.filter((t) => t.id !== task.id)) // !filtruje taski które NIE są o id które usuwamy
    );
  }
  toggleReminder(task: Task) {
    //!tutaj to jest to co po '=' w task.component.html  (onToggleReminder)="toggleReminder(task)"
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe(); //!wykonanie metody z service która obsługuje aktualizowanie w bazie rekordów
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
  editTask(task: Task) {
    this.taskService.editTask(task).subscribe();
  }
}

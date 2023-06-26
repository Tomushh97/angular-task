import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from 'src/app/Task';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false; //! ustawienie domyślne, oddziałuje na zmienną prywatną o tej samej nazwie w header.component
  private subjectAdd = new Subject<any>();
  private subjectEdit = new Subject<Task | null>();
  private showEditTask: boolean = false;
  private selectedTask: Task | null;
  onToggleEdit$ = this.subjectEdit.asObservable();

  constructor() {}

  toggleAddTask(): void {
    //! wywołujemy to, kiedy klikamy button "add"
    this.showAddTask = !this.showAddTask; //!podmiana wartości na przeciwną
    this.subjectAdd.next(this.showAddTask); //! tu przekazuje się przez .next do header.component, gdzie przez subscribe jest łapane i ustawiana jest wartość właściwości tej klasy na taką jaka została zmieniona
  }
  toggleEditTask(): void {
    this.showEditTask = !this.showEditTask;
    this.subjectEdit.next(this.selectedTask);
  }

  toggleEdit(task: Task): void {
    if (this.selectedTask === task) {
      this.selectedTask = null;
    } else {
      this.selectedTask = task;
    }
    this.subjectEdit.next(this.selectedTask);
  }
  onToggleAdd(): Observable<any> {
    //! żeby zrobić coś kiedy się uruchomi toggleAddTask po kliknieciu Add, trzeba zasubskrybować onToggle -> to się dzieje w header.component
    return this.subjectAdd.asObservable();
  }
  onToggleEdit(task: Task): Observable<any> {
    if (this.selectedTask === task) {
      this.showEditTask = true;
    } else {
      this.showEditTask = false;
    }
    return this.subjectEdit.asObservable();
  }
}

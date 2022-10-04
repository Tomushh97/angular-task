import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false; //! ustawienie domyślne, oddziałuje na zmienną prywatną o tej samej nazwie w header.component
  private subjectAdd = new Subject<any>();
  private subjectEdit = new Subject<any>();
  private showEditTask: boolean = false;

  constructor() {}

  toggleAddTask(): void {
    //! wywołujemy to, kiedy klikamy button "add"
    this.showAddTask = !this.showAddTask; //!podmiana wartości na przeciwną
    this.subjectAdd.next(this.showAddTask); //! tu przekazuje się przez .next do header.component, gdzie przez subscribe jest łapane i ustawiana jest wartość właściwości tej klasy na taką jaka została zmieniona
  }
  toggleEditTask(): void {
    this.showEditTask = !this.showEditTask;
    this.subjectEdit.next(this.showEditTask);
  }

  onToggleAdd(): Observable<any> {
    //! żeby zrobić coś kiedy się uruchomi toggleAddTask po kliknieciu Add, trzeba zasubskrybować onToggle -> to się dzieje w header.component
    return this.subjectAdd.asObservable();
  }
  onToggleEdit(): Observable<any> {
    //! żeby zrobić coś kiedy się uruchomi toggleAddTask po kliknieciu Add, trzeba zasubskrybować onToggle -> to się dzieje w header.component
    return this.subjectEdit.asObservable();
  }
}

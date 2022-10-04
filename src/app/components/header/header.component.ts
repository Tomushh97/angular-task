import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Lista zadań';
  showAddTask: boolean;
  subscription: Subscription;
  //! żeby używać serwisu, trzeba go dodać do konstruktora vvv
  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggleAdd()
      .subscribe((value) => (this.showAddTask = value)); //* value to jest przeciwieństwo showAddTask które ustawia się w toggleAddTask w ui.service. Tu sie tez subskrybuje observabla z ui.service
  } //! tu też łapiemy value

  ngOnInit(): void {}

  toggleAddTask() {
    this.uiService.toggleAddTask(); //*wywołujemy metodę napisaną w ui.service.ts
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}

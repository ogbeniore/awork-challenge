import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [UserListComponent]
})
export class AppComponent {
}

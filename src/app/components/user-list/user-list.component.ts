import { Component, inject, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common'; // For NgClass etc
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { GroupingCriteria } from '../../user-processing.worker';
import { FormsModule } from '@angular/forms'; // If using ngModel, or just use input event

@Component({
  selector: 'app-user-list',
  standalone: true, // It was not explicitly standalone in prev file but inferred. Let's make sure.
  imports: [ScrollingModule, UserCardComponent, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  usersService = inject(UsersService);

  ngOnInit() {
    this.usersService.loadUsers();
  }

  isHeader(item: any): item is { isHeader: true; label: string } {
    return !!item.isHeader;
  }

  onGroupChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as GroupingCriteria;
    this.usersService.updateCriteria(value);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.usersService.updateSearch(value);
  }
}

import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', padding: '0 1rem', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', padding: '0 1rem 1rem 1rem', opacity: 1, overflow: 'hidden' })),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
    ])
  ]
})
export class UserCardComponent {
  user = input.required<User>();
  expanded = signal(false);

  toggle() {
    this.expanded.update(v => !v);
  }
}

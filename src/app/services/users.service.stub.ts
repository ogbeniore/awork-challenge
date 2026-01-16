import { Injectable, signal } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';
import { UserResult } from '../models/api-result.model';
import { MockResult } from '../mock-data';
import { GroupingCriteria } from '../user-processing.worker';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceStub {
  criteria = signal<GroupingCriteria>('alphabetically');
  isLoading = signal<boolean>(false);
  displayNodes = signal<(User | { isHeader: true, label: string })[]>([]);

  /**
   * Fetches 5000 mock users from the api
   * @param {number} page
   * @returns {Observable<User[]>}
   */
  getUsers(page = 1): Observable<User[]> {
    return of(MockResult).pipe(
      map(apiResult => User.mapFromUserResult(apiResult.results as UserResult[]))
    );
  }

  loadUsers() {
    this.isLoading.set(true);
    const users = User.mapFromUserResult(MockResult.results as UserResult[]);
    this.displayNodes.set(users);
    this.isLoading.set(false);
  }

  updateCriteria(criteria: GroupingCriteria) {
    this.criteria.set(criteria);
  }

  updateSearch(query: string) {
    // No-op for stub
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResult } from '../models/api-result.model';
import { map, tap } from 'rxjs';
import { GroupingCriteria, WorkerInput, WorkerOutput } from '../user-processing.worker';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://randomuser.me/api';
  private worker: Worker | undefined;

  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  
  criteria = signal<GroupingCriteria>('alphabetically');
  searchQuery = signal<string>('');
  
  displayNodes = signal<(User | { isHeader: true, label: string })[]>([]);

  constructor(private httpClient: HttpClient) {
    this.initWorker();
  }

  private initWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../user-processing.worker', import.meta.url));
      this.worker.onmessage = ({ data }: { data: WorkerOutput }) => {
        this.displayNodes.set(data.flattenedNodes);
        this.isLoading.set(false);
      };
    } else {
      console.warn('Web Workers are not supported in this environment.');
    }
  }

  loadUsers() {
    this.isLoading.set(true);
    this.httpClient
      .get<ApiResult>(`${this.apiUrl}?results=5000&seed=awork&ud=1`) // ud=1 forced to get new fields if needed, seed keeps it consistent
      .pipe(
        map(apiResult => User.mapFromUserResult(apiResult.results))
      )
      .subscribe({
        next: (users) => {
          this.users.set(users);
          this.reprocess();
        },
        error: () => this.isLoading.set(false)
      });
  }

  updateCriteria(criteria: GroupingCriteria) {
    this.criteria.set(criteria);
    this.reprocess();
  }

  updateSearch(query: string) {
    this.searchQuery.set(query);
    this.reprocess();
  }

  private reprocess() {
    if (this.worker) {
      this.isLoading.set(true);
      const input: WorkerInput = {
        action: 'process',
        users: this.users(),
        criteria: this.criteria(),
        searchQuery: this.searchQuery()
      };
      this.worker.postMessage(input);
    }
  }
}

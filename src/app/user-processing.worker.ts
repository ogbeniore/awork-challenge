/// <reference lib="webworker" />

import { User } from './models/user.model';

export type GroupingCriteria = 'alphabetically' | 'age' | 'nationality';

export interface WorkerInput {
  action: 'process';
  users: User[];
  criteria: GroupingCriteria;
  searchQuery?: string;
}

export interface GroupedUsers {
  [key: string]: User[];
}

export interface WorkerOutput {
  grouped: GroupedUsers;
  groups: string[];
  flattenedNodes: (User | { isHeader: true, label: string })[];
}

addEventListener('message', ({ data }: { data: WorkerInput }) => {
  if (data.action === 'process') {
    const { users, criteria, searchQuery } = data;

    // 1. Search/Filter
    let filteredUsers = users;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredUsers = users.filter(u => 
        (u.firstname?.toLowerCase().includes(query) || 
         u.lastname?.toLowerCase().includes(query) || 
         u.email?.toLowerCase().includes(query))
      );
    }

    // 2. Grouping
    const grouped: GroupedUsers = {};
    
    filteredUsers.forEach(user => {
      let key = 'Other';

      switch (criteria) {
        case 'alphabetically':
          key = user.firstname?.charAt(0).toUpperCase() || '#';
          break;
        case 'age':
          const age = user.age || 0;
          if (age < 20) key = 'Under 20';
          else if (age < 30) key = '20-29';
          else if (age < 40) key = '30-39';
          else if (age < 50) key = '40-49';
          else if (age < 60) key = '50-59';
          else key = '60+';
          break;
        case 'nationality':
          key = user.nat || 'Unknown';
          break;
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(user);
    });

    // 3. Sorting Groups
    // Sort keys: Alphabetical naturally sorts well. Age needs specific order.
    let groups = Object.keys(grouped).sort();

    if (criteria === 'age') {
      const ageOrder = ['Under 20', '20-29', '30-39', '40-49', '50-59', '60+'];
      groups = groups.sort((a, b) => ageOrder.indexOf(a) - ageOrder.indexOf(b));
    }

    // 4. Flatten for Virtual Scroll
    const flattenedNodes: (User | { isHeader: true, label: string })[] = [];
    groups.forEach(group => {
      flattenedNodes.push({ isHeader: true, label: group });
      flattenedNodes.push(...grouped[group]);
    });

    postMessage({ grouped, groups, flattenedNodes } as WorkerOutput);
  }
});

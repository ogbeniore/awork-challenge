# Feature Documentation

## Overview
This solution transforms the basic user list into a high-performance, scalable application capable of rendering and grouping 5,000+ users seamlessly.

## Key Technical Decisions

### 1. Web Worker for Heavy Processing
**Problem**: Grouping, filtering, and sorting 5,000 items on the main thread blocks the UI, causing frame drops (jank).
**Solution**: Offloaded all data transformation logic to a dedicated Web Worker (`user-processing.worker.ts`).
- **Benefit**: The main thread remains free for UI rendering / interactions.
- **Implementation**: The worker receives the raw user list and criteria, processes it, and returns a flattened list ready for the Virtual Scroll viewport.

### 2. Virtual Scrolling (Angular CDK)
**Problem**: Rendering 5,000 DOM nodes (plus headers) simultaneously crashes or severely slows down the browser.
**Solution**: Implemented `cdk-virtual-scroll-viewport` from `@angular/cdk/scrolling`.
- **Benefit**: Only renders the visible subset of items (e.g., ~10-20 items). 
- **Efficiency**: Keeps memory usage stable regardless of list size.

### 3. State Management with Signals
**Decision**: Adopted Angular Signals over RxJS for the view state.
- **Reasoning**: Signals provide a cleaner, glitch-free reactive graph for UI updates (`users` -> `worker` -> `displayNodes`).

### 4. Client-Side Search
**Decision**: Implemented search functionality within the Web Worker.
- **Reasoning**: Since we already have the full dataset in memory, client-side search is instant and reduces API load. Performing it in the worker prevents UI freezing during typing.

## Bonus Features
- **Dynamic Grouping**: Users can switch between Alphabetical, Age, and Nationality grouping instantly.
- **Search**: Real-time filtering without API calls.
- **UI Polish**: Added smooth expansion animations and a clean, responsive design.

## How to Run
1. `npm install`
2. `npm start`
3. Navigate to `http://localhost:4200`

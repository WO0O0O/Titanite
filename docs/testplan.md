# Test Plan

## Overview
This document outlines the testing strategy for the Market Sentinel project.

## Phases of Testing
1. **Unit Testing**: 
   - Test Zustand stores for correct signal state management.
   - Test TanStack Query hooks for correct data fetching and caching.
   - Test boolean logic evaluator in the Signal Builder.
2. **Component Testing**:
   - Test individual UI components (Dashboard cards, Signal Builder inputs) using React Testing Library.
3. **Integration Testing**:
   - Test the flow between the Signal Builder and the Dashboard.
4. **End-to-End Testing**:
   - Simulate user journeys (e.g., creating a signal, viewing alerts on the dashboard).

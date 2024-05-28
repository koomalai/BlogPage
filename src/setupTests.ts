import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { server } from './Mocks/server';

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(() => { server.listen() })

// Reset handlers after each test `important for test isolation`
afterEach(() => {server.resetHandlers()})

//  Close worker after all tests
afterAll(() => {server.close()})

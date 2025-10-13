# Testing Strategy Guide

## Philosophy: Test Behavior, Not Implementation

Our testing strategy prioritizes **developer velocity** and **actual bug prevention** over coverage metrics. We test things that:
- Have complex business logic
- Are likely to break silently
- Would cause significant user impact if broken
- Have broken before (regression prevention)

We explicitly **don't** test things that:
- Change frequently with UI iterations
- Would only break in obvious, visible ways
- Are simple pass-through or rendering logic

## Testing Pyramid for This Project

```
        E2E Tests (3-5 tests)
       /                      \
      /   Integration Tests    \
     /   (Redux + Domain)       \
    /                            \
   /      Unit Tests              \
  /   (Pure Functions Only)        \
 /_________________________________ \
         NO UI Component Tests
```

## 1. UI Component Testing ❌ DON'T DO THIS

### What NOT to Test

```javascript
// ❌ BAD: Testing implementation details
test('renders three Grid components', () => {
  const wrapper = render(<DashboardScreen />);
  expect(wrapper.find('Grid')).toHaveLength(3);
});

// ❌ BAD: Testing MUI component props
test('button has correct color', () => {
  render(<SubmitButton />);
  expect(screen.getByRole('button')).toHaveAttribute('color', 'primary');
});

// ❌ BAD: Testing state changes
test('sets loading to true when fetching', () => {
  const wrapper = shallow(<ProjectList />);
  wrapper.instance().fetchProjects();
  expect(wrapper.state('isLoading')).toBe(true);
});

// ❌ BAD: Testing that things render
test('displays user name', () => {
  render(<UserProfile user={{ name: 'John' }} />);
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

### Why We Don't Test UI Components

1. **High Maintenance**: Every UI change breaks tests
2. **Low Value**: TypeScript already catches type errors
3. **False Security**: Tests pass but app still broken
4. **Obvious Failures**: If a button doesn't render, you'll see it immediately

## 2. Redux Store Testing ✅ DO THIS

### Test Reducers with Business Logic

```javascript
// ✅ GOOD: Testing complex state transitions
// src/store/__tests__/projectFile.test.js

import { reducer, actions, selectors } from '../projectFile';
import { ProjectFile, ProjectFileArray } from '../../domain';

describe('projectFile reducer', () => {
  const initialState = {
    current: {
      data: new ProjectFile(),
      isLoading: false,
      isLoaded: false,
    },
    list: {
      data: {},
      isLoading: {},
      isLoaded: {},
    },
    error: null,
  };

  test('GENERATE_ESTIMATE_FULFILLED updates current and list', () => {
    const projectId = 'proj-123';
    const projectFile = new ProjectFile({
      id: 'file-456',
      name: 'Test Estimate',
      type: ProjectFile.TYPE_ESTIMATE_PDF,
      status: ProjectFile.STATUS_DONE,
      project: { id: projectId }
    });

    // Setup initial state with existing list
    const stateWithList = {
      ...initialState,
      list: {
        data: {
          [projectId]: new ProjectFileArray([
            new ProjectFile({ id: 'old-file', name: 'Old File' })
          ])
        },
        isLoading: { [projectId]: false },
        isLoaded: { [projectId]: true }
      }
    };

    const action = {
      type: 'GENERATE_ESTIMATE_PROJECT_FILE_FULFILLED',
      payload: projectFile
    };

    const newState = reducer(stateWithList, action);

    // Test that current is updated
    expect(newState.current.data.id).toBe('file-456');
    expect(newState.current.data.name).toBe('Test Estimate');
    expect(newState.current.isLoading).toBe(false);
    expect(newState.current.isLoaded).toBe(true);

    // Test that list is updated with new file
    const projectList = newState.list.data[projectId];
    expect(projectList).toHaveLength(2);
    expect(projectList.get('file-456')).toBeDefined();
  });

  test('handles concurrent loading states for multiple projects', () => {
    const action1 = {
      type: 'LIST_PROJECT_FILE_PENDING',
      meta: { project: { id: 'proj-1' } }
    };

    const action2 = {
      type: 'LIST_PROJECT_FILE_PENDING', 
      meta: { project: { id: 'proj-2' } }
    };

    let state = reducer(initialState, action1);
    state = reducer(state, action2);

    expect(state.list.isLoading['proj-1']).toBe(true);
    expect(state.list.isLoading['proj-2']).toBe(true);
    expect(state.error).toBeNull();
  });

  test('clears state on logout', () => {
    const stateWithData = {
      ...initialState,
      current: {
        data: new ProjectFile({ id: 'test' }),
        isLoading: false,
        isLoaded: true,
      }
    };

    const action = { type: 'LOGOUT_USER_PENDING' };
    const newState = reducer(stateWithData, action);

    expect(newState).toEqual(initialState);
  });
});

// ✅ GOOD: Testing selectors with complex logic
describe('projectFile selectors', () => {
  test('list selector returns empty array for non-existent project', () => {
    const state = {
      projectFile: {
        list: { data: {} }
      }
    };

    const result = selectors.list(state, 'non-existent-id');
    expect(result).toBeInstanceOf(ProjectFileArray);
    expect(result).toHaveLength(0);
  });

  test('list selector returns correct project files', () => {
    const projectFiles = new ProjectFileArray([
      new ProjectFile({ id: 'file-1', name: 'File 1' }),
      new ProjectFile({ id: 'file-2', name: 'File 2' })
    ]);

    const state = {
      projectFile: {
        list: { 
          data: { 'proj-123': projectFiles }
        }
      }
    };

    const result = selectors.list(state, 'proj-123');
    expect(result).toHaveLength(2);
    expect(result.get('file-1').name).toBe('File 1');
  });
});
```

### Test Async Action Creators

```javascript
// ✅ GOOD: Testing action creators return correct structure
describe('projectFile actions', () => {
  test('generateEstimate creates correct action structure', () => {
    const project = new Project({ id: 'proj-123', name: 'Test' });
    const action = actions.generateEstimate(project);

    expect(action.type).toBe('GENERATE_ESTIMATE_PROJECT_FILE');
    expect(action.meta.project).toBe(project);
    expect(action.payload).toBeInstanceOf(Promise);
  });

  test('list action includes proper Parse query', () => {
    const project = new Project({ id: 'proj-123' });
    const action = actions.list(project);

    expect(action.type).toBe('LIST_PROJECT_FILE');
    expect(action.meta.project).toBe(project);
    // Note: We can't easily test the Parse.Query internals,
    // but we can verify it returns a Promise
    expect(action.payload).toBeInstanceOf(Promise);
  });
});
```

## 3. Domain Model Testing ✅ DO THIS

### Test Business Logic and Validation

```javascript
// ✅ GOOD: Testing domain model business rules
// src/domain/__tests__/ProjectFile.test.js

import { ProjectFile } from '../ProjectFile';

describe('ProjectFile Domain Model', () => {
  describe('isSavable validation', () => {
    test('requires name to be savable', () => {
      const file = new ProjectFile({
        type: ProjectFile.TYPE_ESTIMATE_PDF,
        status: ProjectFile.STATUS_PENDING
      });
      
      expect(file.isSavable()).toBe(false);
      
      file.name = 'Valid Name';
      expect(file.isSavable()).toBe(true);
    });

    test('requires valid status', () => {
      const file = new ProjectFile({
        name: 'Test File',
        type: ProjectFile.TYPE_ESTIMATE_PDF,
        status: 'INVALID_STATUS'
      });
      
      expect(file.isSavable()).toBe(false);
    });

    test('requires valid type', () => {
      const file = new ProjectFile({
        name: 'Test File',
        status: ProjectFile.STATUS_PENDING,
        type: 'INVALID_TYPE'
      });
      
      expect(file.isSavable()).toBe(false);
    });
  });

  describe('url getter', () => {
    test('returns null when no file', () => {
      const projectFile = new ProjectFile();
      expect(projectFile.url).toBeNull();
    });

    test('handles Parse.File with url function', () => {
      const mockFile = {
        url: jest.fn().mockReturnValue('https://example.com/file.pdf')
      };
      
      const projectFile = new ProjectFile({ file: mockFile });
      expect(projectFile.url).toBe('https://example.com/file.pdf');
      expect(mockFile.url).toHaveBeenCalled();
    });

    test('handles plain object with url property', () => {
      const mockFile = {
        url: 'https://example.com/file.pdf'
      };
      
      const projectFile = new ProjectFile({ file: mockFile });
      expect(projectFile.url).toBe('https://example.com/file.pdf');
    });
  });

  describe('status helpers', () => {
    test('identifies correct status', () => {
      const pendingFile = new ProjectFile({ status: ProjectFile.STATUS_PENDING });
      const doneFile = new ProjectFile({ status: ProjectFile.STATUS_DONE });
      
      expect(pendingFile.status).toBe('PENDING');
      expect(doneFile.status).toBe('DONE');
    });
  });
});
```

### Test Collection Operations

```javascript
// ✅ GOOD: Testing domain array operations
// src/domain/__tests__/ProjectFileArray.test.js

describe('ProjectFileArray', () => {
  test('addUpdate replaces existing item', () => {
    const array = new ProjectFileArray([
      new ProjectFile({ id: 'file-1', name: 'Original' })
    ]);

    const updated = new ProjectFile({ id: 'file-1', name: 'Updated' });
    array.addUpdate(updated);

    expect(array).toHaveLength(1);
    expect(array.get('file-1').name).toBe('Updated');
  });

  test('addUpdate adds new item if not exists', () => {
    const array = new ProjectFileArray([
      new ProjectFile({ id: 'file-1', name: 'First' })
    ]);

    const newFile = new ProjectFile({ id: 'file-2', name: 'Second' });
    array.addUpdate(newFile);

    expect(array).toHaveLength(2);
    expect(array.get('file-2').name).toBe('Second');
  });

  test('remove deletes item by id', () => {
    const array = new ProjectFileArray([
      new ProjectFile({ id: 'file-1' }),
      new ProjectFile({ id: 'file-2' }),
      new ProjectFile({ id: 'file-3' })
    ]);

    array.remove({ id: 'file-2' });

    expect(array).toHaveLength(2);
    expect(array.get('file-2')).toBeUndefined();
    expect(array.get('file-1')).toBeDefined();
    expect(array.get('file-3')).toBeDefined();
  });
});
```

## 4. E2E Testing ✅ DO THIS SPARINGLY

### E2E Testing Principles

- **Test complete user journeys**, not individual pages
- **Test the happy path** and one or two critical error paths
- **Keep tests independent** - each test should work in isolation
- **Use realistic data** but clean up after yourself
- **Test what would cause a customer support ticket** if broken

### E2E Test Examples

```javascript
// ✅ GOOD: Testing critical user journey
// tests/e2e/estimate-generation.spec.js

import { test, expect } from '@playwright/test';

test.describe('Estimate Generation Flow', () => {
  test('anonymous user can generate and download estimate', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    
    // Fill out project details
    await page.fill('[name="projectName"]', 'E2E Test Project');
    await page.fill('[name="projectDescription"]', 'Automated test project');
    
    // Select some features
    await page.click('text=User Authentication');
    await page.click('text=Payment Processing');
    await page.click('text=Email Notifications');
    
    // Submit form
    await page.click('button:has-text("Generate Estimate")');
    
    // Verify preview dialog appears
    await expect(page.locator('text=Generating Project Plan')).toBeVisible();
    
    // Verify progress bar
    await expect(page.locator('[role="progressbar"]')).toBeVisible();
    
    // Verify validation options appear
    await expect(page.locator('text=Create Account')).toBeVisible({ timeout: 35000 });
    await expect(page.locator('text=Validate With Google')).toBeVisible();
  });

  test('authenticated user can save and access project', async ({ page }) => {
    // Login first
    await page.goto('/');
    await loginAsTestUser(page);
    
    // Create project
    await page.fill('[name="projectName"]', 'Saved Test Project');
    await page.click('button:has-text("Generate Estimate")');
    
    // Wait for processing
    await expect(page.locator('text=Download Estimate')).toBeVisible({ timeout: 60000 });
    
    // Verify project is saved
    await page.click('button[aria-label="Close"]');
    await page.goto('/dashboard');
    await expect(page.locator('text=Saved Test Project')).toBeVisible();
    
    // Verify can reopen project
    await page.click('text=Saved Test Project');
    await expect(page.url()).toContain('/estimate-project/');
    await expect(page.locator('[name="projectName"]')).toHaveValue('Saved Test Project');
  });
});

// Helper function
async function loginAsTestUser(page) {
  await page.click('button:has-text("Sign In")');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForSelector('text=Dashboard');
}
```

### What TO Test with E2E

```javascript
// ✅ GOOD: Critical business flows
test('user can complete purchase', async ({ page }) => {
  // Test the entire flow from selection to payment confirmation
});

// ✅ GOOD: Integration between systems
test('Parse auth works with Google OAuth', async ({ page }) => {
  // Test that Google login creates Parse session
});

// ✅ GOOD: Complex multi-step workflows
test('project moves through all status stages', async ({ page }) => {
  // Create, process, complete, archive
});

// ✅ GOOD: Error recovery
test('handles network failure during estimate generation', async ({ page }) => {
  // Simulate network failure and verify graceful handling
});
```

### What NOT to Test with E2E

```javascript
// ❌ BAD: Testing individual UI components
test('button changes color on hover', async ({ page }) => {
  // Use CSS and visual testing for this
});

// ❌ BAD: Testing form validation for every field
test('shows error for invalid email format', async ({ page }) => {
  // Test one validation in your critical path, not all
});

// ❌ BAD: Testing every possible path
test('all 47 combinations of features work', async ({ page }) => {
  // Test the most common 2-3 combinations only
});

// ❌ BAD: Testing static content
test('footer contains copyright text', async ({ page }) => {
  // This will never break in a way that matters
});
```

## 5. Utility Function Testing ✅ DO THIS

```javascript
// ✅ GOOD: Testing pure utility functions
// src/utils/__tests__/calculations.test.js

describe('price calculations', () => {
  test('calculates estimate with correct multipliers', () => {
    const features = [
      { baseHours: 10, complexity: 1.5 },
      { baseHours: 20, complexity: 2.0 }
    ];
    
    expect(calculateTotalHours(features)).toBe(55); // (10*1.5) + (20*2.0)
  });

  test('applies team size penalties correctly', () => {
    const baseHours = 100;
    expect(applyTeamSizePenalty(baseHours, 1)).toBe(100);
    expect(applyTeamSizePenalty(baseHours, 2)).toBe(110); // 10% overhead
    expect(applyTeamSizePenalty(baseHours, 5)).toBe(140); // 40% overhead
  });
});
```

## Testing Commands

```json
{
  "scripts": {
    // Run only valuable tests (skip UI components)
    "test": "vitest src/store src/domain src/utils",
    
    // Run tests in watch mode during development
    "test:watch": "vitest src/store src/domain src/utils --watch",
    
    // Run E2E tests (separate, slower)
    "test:e2e": "playwright test",
    
    // Run E2E tests in UI mode for debugging
    "test:e2e:ui": "playwright test --ui",
    
    // Full test suite for CI/CD
    "test:all": "npm run test && npm run test:e2e",
    
    // Skip tests, just check types and linting
    "check": "tsc --noEmit && eslint ."
  }
}
```

## When to Add New Tests

### Add a Test When:

1. **You fix a bug** - Prevent regression
   ```javascript
   test('handles undefined project.id gracefully', () => {
     // Test for the bug you just fixed
   });
   ```

2. **Logic is complex** - More than 2-3 conditional branches
   ```javascript
   test('calculateOptimalTeamSize handles all project sizes', () => {
     // Complex algorithm needs tests
   });
   ```

3. **Multiple developers touch the code** - Prevent breaking changes
   ```javascript
   test('API contract remains consistent', () => {
     // Ensure interface doesn't change
   });
   ```

4. **Cost of failure is high** - Payment, auth, data loss
   ```javascript
   test('never processes payment twice', () => {
     // Critical business logic
   });
   ```

### Don't Add a Test When:

1. **It's just rendering** - TypeScript + eyeballs are enough
2. **It would test MUI** - Trust the library
3. **The failure would be obvious** - If it breaks, you'll see it
4. **It's a simple pass-through** - No logic to test

## Test File Organization

```
src/
├── store/
│   ├── __tests__/
│   │   ├── projectFile.test.js    # Reducer & selector tests
│   │   └── auth.test.js
│   └── projectFile.js
├── domain/
│   ├── __tests__/
│   │   ├── ProjectFile.test.js    # Domain model tests
│   │   └── ProjectFileArray.test.js
│   └── ProjectFile.js
├── utils/
│   ├── __tests__/
│   │   └── calculations.test.js   # Utility function tests
│   └── calculations.js
└── components/                     # NO TESTS HERE
    └── EstimatorScreen.jsx

tests/
└── e2e/
    ├── estimate-generation.spec.js
    ├── auth-flow.spec.js
    └── helpers/
        └── auth.js                 # Shared E2E helpers
```

## Summary

- **Test behavior and business logic**, not implementation
- **Skip UI component unit tests** entirely
- **Focus on Redux reducers, domain models, and utilities**
- **Write 3-5 E2E tests** for critical paths
- **Prioritize developer velocity** over coverage metrics
- **Add tests when fixing bugs** to prevent regression

Remember: A test that never catches bugs is worse than no test at all - it's technical debt that slows you down without providing value.

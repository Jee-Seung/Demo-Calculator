# TDD (Test-Driven Development) Rule

## Overview
This project follows Test-Driven Development (TDD) methodology for all core business logic. UI components are excluded from this requirement.

## Scope

### What requires TDD:
- **Core calculation logic** (`MathEngine`, expression parsing, evaluation)
- **Unit conversion logic** (`UnitConverter`, conversion calculations)
- **History management** (`HistoryManager`, search, filtering)
- **Data storage layer** (`LocalStorageManager`)
- **Utility functions** (validators, helpers, formatters)
- **State management** (state updates, observers)

### What does NOT require TDD:
- **UI components** (HTML templates, DOM manipulation)
- **Event handlers** (simple click handlers, input bindings)
- **CSS/Styling**
- **Integration with external libraries** (Tailwind, Math.js CDN)

## TDD Workflow

### Red-Green-Refactor Cycle

1. **RED**: Write a failing test first
   ```javascript
   // ❌ Test fails - feature not implemented yet
   it('should evaluate simple addition', () => {
     const engine = new MathEngine();
     expect(engine.evaluate('2 + 2')).toBe(4);
   });
   ```

2. **GREEN**: Write minimal code to make the test pass
   ```javascript
   // ✅ Test passes - implement just enough
   class MathEngine {
     evaluate(expression) {
       return eval(expression);
     }
   }
   ```

3. **REFACTOR**: Improve code quality while keeping tests green
   ```javascript
   // ✅ Tests still pass - improved implementation
   class MathEngine {
     evaluate(expression) {
       return this.safeEvaluate(expression);
     }
     
     safeEvaluate(expr) {
       return math.evaluate(expr);
     }
   }
   ```

## Test Requirements

### Coverage Targets
- **Core logic**: Minimum 90% code coverage
- **Utility functions**: Minimum 85% code coverage
- **Overall project**: Minimum 80% code coverage

### Test Organization
```
tests/
├── unit/
│   ├── calculator/
│   │   ├── MathEngine.test.js
│   │   └── Display.test.js
│   ├── converter/
│   │   └── UnitConverter.test.js
│   ├── history/
│   │   └── HistoryManager.test.js
│   └── storage/
│       └── LocalStorage.test.js
└── integration/
    ├── CalculatorFlow.test.js
    └── HistoryFlow.test.js
```

## Best Practices

### ✅ DO:
- Write tests **before** implementing the feature
- Test **one behavior** per test case
- Use **descriptive test names** that explain the expected behavior
- Follow **AAA pattern** (Arrange, Act, Assert)
- Keep tests **independent** and **isolated**
- Test **edge cases** and **error conditions**
- Mock external dependencies

### ❌ DON'T:
- Skip writing tests to "save time"
- Write tests after the code is done (test-last approach)
- Test implementation details instead of behavior
- Write tests that depend on other tests
- Ignore failing tests
- Test UI rendering logic (e.g., DOM manipulation)

## Example: TDD Workflow

### Step 1: Write Test (RED)
```javascript
// tests/unit/calculator/MathEngine.test.js
import { describe, it, expect } from 'vitest';
import MathEngine from '@/scripts/calculator/MathEngine.js';

describe('MathEngine', () => {
  describe('evaluate', () => {
    it('should evaluate basic addition', () => {
      const engine = new MathEngine();
      expect(engine.evaluate('2 + 2')).toBe(4);
    });
  });
});
```

### Step 2: Run Test (Should Fail)
```bash
npm run test
# ❌ FAIL: MathEngine is not defined
```

### Step 3: Implement Minimal Code (GREEN)
```javascript
// src/scripts/calculator/MathEngine.js
class MathEngine {
  evaluate(expression) {
    return eval(expression);
  }
}

export default MathEngine;
```

### Step 4: Run Test (Should Pass)
```bash
npm run test
# ✅ PASS: All tests passed
```

### Step 5: Add More Tests
```javascript
it('should handle multiplication and division', () => {
  const engine = new MathEngine();
  expect(engine.evaluate('3 * 4')).toBe(12);
  expect(engine.evaluate('10 / 2')).toBe(5);
});

it('should throw error for invalid expression', () => {
  const engine = new MathEngine();
  expect(() => engine.evaluate('invalid')).toThrow();
});
```

### Step 6: Refactor (Keep Tests GREEN)
```javascript
// Improved implementation
import { evaluate } from 'mathjs';

class MathEngine {
  evaluate(expression) {
    try {
      const result = evaluate(expression);
      return this.formatResult(result);
    } catch (error) {
      throw new Error(`Invalid expression: ${expression}`);
    }
  }
  
  formatResult(value) {
    return parseFloat(value.toPrecision(10));
  }
}
```

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (during development)
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test MathEngine.test.js
```

## Definition of Done

A feature is considered **complete** when:
1. ✅ All tests are written **before** implementation
2. ✅ All tests **pass**
3. ✅ Code coverage meets the **minimum threshold** (90% for core logic)
4. ✅ No test is **skipped** or **ignored**
5. ✅ Code is **refactored** and clean
6. ✅ Edge cases and error conditions are **tested**

## Enforcement

- **Pre-commit hook**: Run tests before allowing commits
- **CI/CD**: All tests must pass before merging to main
- **Code Review**: Verify tests were written first
- **Coverage Report**: Automatically generated on each PR

---

**Remember**: Writing tests first is not optional—it's a project requirement for all core logic!

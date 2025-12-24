# SOLID Principles

## Overview
This project follows SOLID principles for all core business logic and architecture design. These principles ensure maintainable, scalable, and testable code.

## The Five SOLID Principles

### 1. Single Responsibility Principle (SRP)
**A class should have one, and only one, reason to change.**

#### ✅ Good Example:
```javascript
// Each class has a single, well-defined responsibility

class MathEngine {
  evaluate(expression) {
    // Only responsible for mathematical evaluation
    return math.evaluate(expression);
  }
}

class Display {
  update(value) {
    // Only responsible for displaying values
    this.element.textContent = value;
  }
}

class HistoryStorage {
  save(item) {
    // Only responsible for storing history
    localStorage.setItem('history', JSON.stringify(item));
  }
}
```

#### ❌ Bad Example:
```javascript
// This class does too much - violates SRP
class Calculator {
  evaluate(expression) { /* ... */ }
  displayResult(result) { /* ... */ }
  saveToHistory(item) { /* ... */ }
  searchHistory(query) { /* ... */ }
  convertUnits(value, from, to) { /* ... */ }
  // Too many responsibilities!
}
```

---

### 2. Open/Closed Principle (OCP)
**Software entities should be open for extension, but closed for modification.**

#### ✅ Good Example:
```javascript
// Base class - closed for modification
class Operation {
  execute(a, b) {
    throw new Error('Must be implemented by subclass');
  }
}

// Extended through inheritance - open for extension
class Addition extends Operation {
  execute(a, b) {
    return a + b;
  }
}

class Multiplication extends Operation {
  execute(a, b) {
    return a * b;
  }
}

// Using strategy pattern
class Calculator {
  constructor(operation) {
    this.operation = operation;
  }
  
  calculate(a, b) {
    return this.operation.execute(a, b);
  }
}

// Add new operations without modifying existing code
const calc = new Calculator(new Addition());
```

#### ❌ Bad Example:
```javascript
// Must modify this class every time we add a new operation
class Calculator {
  calculate(a, b, operation) {
    if (operation === 'add') {
      return a + b;
    } else if (operation === 'multiply') {
      return a * b;
    } else if (operation === 'divide') {  // Modifying existing class
      return a / b;
    }
    // Have to keep adding if-else blocks
  }
}
```

---

### 3. Liskov Substitution Principle (LSP)
**Objects of a superclass should be replaceable with objects of a subclass without breaking the application.**

#### ✅ Good Example:
```javascript
class Storage {
  save(key, value) {
    throw new Error('Must be implemented');
  }
  
  get(key) {
    throw new Error('Must be implemented');
  }
}

class LocalStorage extends Storage {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

class MemoryStorage extends Storage {
  constructor() {
    super();
    this.data = {};
  }
  
  save(key, value) {
    this.data[key] = value;
  }
  
  get(key) {
    return this.data[key];
  }
}

// Can substitute any storage implementation
class HistoryManager {
  constructor(storage) {
    this.storage = storage;  // Works with any Storage subclass
  }
  
  addItem(item) {
    const history = this.storage.get('history') || [];
    history.push(item);
    this.storage.save('history', history);
  }
}

// Both work identically
const manager1 = new HistoryManager(new LocalStorage());
const manager2 = new HistoryManager(new MemoryStorage());
```

---

### 4. Interface Segregation Principle (ISP)
**No client should be forced to depend on methods it does not use.**

#### ✅ Good Example:
```javascript
// Small, focused interfaces (using JavaScript duck typing)

class BasicCalculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
}

class ScientificCalculator extends BasicCalculator {
  sin(angle) { return Math.sin(angle); }
  cos(angle) { return Math.cos(angle); }
  log(value) { return Math.log(value); }
}

// Classes only implement what they need
class SimpleDisplay {
  constructor(calculator) {
    this.calculator = calculator;  // Only needs basic operations
  }
  
  calculate(a, b, op) {
    // Uses only add, subtract, multiply, divide
    return this.calculator[op](a, b);
  }
}
```

#### ❌ Bad Example:
```javascript
// Fat interface - forces implementations to provide unused methods
class AllInOneCalculator {
  add(a, b) { /* ... */ }
  sin(angle) { /* ... */ }
  convertUnits(value, from, to) { /* ... */ }
  searchHistory(query) { /* ... */ }
  exportToPDF() { /* ... */ }
}

// Simple calculator forced to implement unnecessary methods
class SimpleCalc extends AllInOneCalculator {
  add(a, b) { return a + b; }
  sin(angle) { throw new Error('Not supported'); }  // Forced to implement
  convertUnits() { throw new Error('Not supported'); }
  searchHistory() { throw new Error('Not supported'); }
  exportToPDF() { throw new Error('Not supported'); }
}
```

---

### 5. Dependency Inversion Principle (DIP)
**High-level modules should not depend on low-level modules. Both should depend on abstractions.**

#### ✅ Good Example:
```javascript
// Abstraction (interface-like)
class StorageInterface {
  save(key, value) { throw new Error('Must implement'); }
  get(key) { throw new Error('Must implement'); }
}

// Low-level module
class LocalStorageImpl extends StorageInterface {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  get(key) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}

// High-level module depends on abstraction, not concrete implementation
class HistoryManager {
  constructor(storage) {  // Depends on StorageInterface abstraction
    if (!(storage instanceof StorageInterface)) {
      throw new Error('Storage must implement StorageInterface');
    }
    this.storage = storage;
  }
  
  addItem(item) {
    const history = this.storage.get('history') || [];
    history.push(item);
    this.storage.save('history', history);
  }
}

// Easy to test with mock
class MockStorage extends StorageInterface {
  constructor() {
    super();
    this.data = {};
  }
  save(key, value) { this.data[key] = value; }
  get(key) { return this.data[key]; }
}

// Dependency injection
const manager = new HistoryManager(new LocalStorageImpl());
const testManager = new HistoryManager(new MockStorage());
```

#### ❌ Bad Example:
```javascript
// High-level module directly depends on low-level implementation
class HistoryManager {
  constructor() {
    this.storage = localStorage;  // Tightly coupled to localStorage
  }
  
  addItem(item) {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push(item);
    localStorage.setItem('history', JSON.stringify(history));
    // Hard to test, can't swap implementations
  }
}
```

---

## Applying SOLID to This Project

### Project Architecture Following SOLID

```
src/scripts/
├── calculator/
│   ├── MathEngine.js          # SRP: Only handles math evaluation
│   ├── Display.js             # SRP: Only handles display updates
│   ├── Keypad.js              # SRP: Only handles input events
│   └── Calculator.js          # Coordinates components (DIP)
│
├── converter/
│   ├── UnitConverter.js       # SRP: Only handles conversions
│   ├── ConversionRates.js     # SRP: Only stores conversion data
│   └── ConverterView.js       # SRP: Only handles converter UI
│
├── history/
│   ├── HistoryManager.js      # SRP: Only manages history logic
│   ├── HistoryView.js         # SRP: Only handles history UI
│   └── SearchEngine.js        # SRP: Only handles search
│
├── storage/
│   ├── StorageInterface.js    # DIP: Abstract storage interface
│   └── LocalStorageImpl.js    # DIP: Concrete implementation
│
└── utils/
    ├── validators.js          # SRP: Only validation logic
    └── formatters.js          # SRP: Only formatting logic
```

### Dependency Injection Pattern

```javascript
// Main application setup
import Calculator from './calculator/Calculator.js';
import MathEngine from './calculator/MathEngine.js';
import Display from './calculator/Display.js';
import LocalStorageImpl from './storage/LocalStorageImpl.js';
import HistoryManager from './history/HistoryManager.js';

// Inject dependencies
const storage = new LocalStorageImpl();
const mathEngine = new MathEngine();
const display = new Display(document.querySelector('#display'));
const historyManager = new HistoryManager(storage);

const calculator = new Calculator({
  mathEngine,
  display,
  historyManager
});
```

---

## Code Review Checklist

When reviewing code, verify adherence to SOLID:

- [ ] **SRP**: Does each class have a single, clear responsibility?
- [ ] **OCP**: Can new features be added without modifying existing code?
- [ ] **LSP**: Can subclasses be used interchangeably with their parent?
- [ ] **ISP**: Are interfaces small and focused?
- [ ] **DIP**: Do high-level modules depend on abstractions, not concrete implementations?

---

## Benefits of SOLID

- ✅ **Maintainability**: Easier to understand and modify
- ✅ **Testability**: Classes are easier to test in isolation
- ✅ **Flexibility**: Easy to add new features without breaking existing code
- ✅ **Reusability**: Components can be reused in different contexts
- ✅ **Scalability**: Architecture scales well as project grows

---

**Remember**: SOLID principles are guidelines, not strict rules. Apply them pragmatically to improve code quality!

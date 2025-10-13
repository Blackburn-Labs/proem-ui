# Domain Classes

This directory contains domain classes that represent business entities in our application. Most domain classes extend either `BasicDomain` (for single objects) or `BasicArray` (for collections), which provide common functionality for Parse.com integration, change tracking, validation, and serialization.

**Note:** Not all domains need to extend `BasicDomain` or `BasicArray`. Some domains that are not arrays or do not need to be persisted can be implemented as vanilla JavaScript class definitions.

## Base Classes

### BasicDomain

`BasicDomain` is the base class for all domain objects that are persisted using Parse Platform. It extends `Parse.Object` and provides:

- **Dynamic property management** with automatic getters/setters
- **Change tracking** to monitor unsaved modifications  
- **Validation framework** with business rule checking
- **Cloning and serialization** capabilities
- **Parse.com integration** for seamless persistence

### BasicArray

`BasicArray` extends native JavaScript Array and provides:

- **Type-safe collections** with enforced item types
- **CRUD operations** (add, update, remove) with intelligent handling
- **Query methods** for finding items by ID or index
- **Collection manipulation** (sort, move, clone)
- **Serialization support** for API communication

## Common Usage Patterns

### Creating a Simple Domain Class

For basic entities that need persistence, follow this pattern:

```javascript
import BasicDomain from './BasicDomain';

export default class SimpleEntity extends BasicDomain {
    static DEFAULTS = {
        name: '',
        description: '',
        isActive: true,
        createdAt: null,
        updatedAt: null,
    }

    static FIELDS = Object.keys(SimpleEntity.DEFAULTS);
    
    constructor(props) {
        super('SimpleEntity', props, SimpleEntity.DEFAULTS);
    }

    isSavable() {
        return this.name && this.name.trim().length > 0;
    }

    getLabel() {
        return this.name || `SimpleEntity ${this.id}`;
    }
}

global.Parse.Object.registerSubclass('SimpleEntity', SimpleEntity);
```

***NOTE***: Its important that you never include `id` in the `DEFAULTS`. The object IDs are automatically added by Parse Object (as is `createdAt` and `updatedAt`) so adding it to the default list causes errors.

### Creating a Domain Class with Enums

For entities with status fields or predefined values:

```javascript
import BasicDomain from './BasicDomain';

export default class StatusEntity extends BasicDomain {
    // Define enum constants
    static STATUS_ACTIVE = 'ACTIVE';
    static STATUS_INACTIVE = 'INACTIVE';
    static STATUS_PENDING = 'PENDING';

    // Array of all valid statuses
    static STATUSES = [
        StatusEntity.STATUS_ACTIVE,
        StatusEntity.STATUS_INACTIVE,
        StatusEntity.STATUS_PENDING,
    ];

    // Human-readable labels for UI display
    static STATUS_LABELS = {
        [StatusEntity.STATUS_ACTIVE]: 'Active',
        [StatusEntity.STATUS_INACTIVE]: 'Inactive', 
        [StatusEntity.STATUS_PENDING]: 'Pending Approval',
    };

    static DEFAULTS = {
        name: '',
        status: StatusEntity.STATUS_PENDING,
        email: '',
    }

    static FIELDS = Object.keys(StatusEntity.DEFAULTS);
    
    constructor(props) {
        super('StatusEntity', props, StatusEntity.DEFAULTS);
    }

    // Validation with enum checking
    isSavable() {
        return this.name && 
               this.email && 
               StatusEntity.STATUSES.includes(this.status);
    }

    // Convenience methods for status checking
    isActive() {
        return this.status === StatusEntity.STATUS_ACTIVE;
    }

    get statusLabel() {
        return StatusEntity.STATUS_LABELS[this.status] || 'Unknown';
    }
}

global.Parse.Object.registerSubclass('StatusEntity', StatusEntity);
```

### Creating Array Classes

For collections of domain objects:

```javascript
import BasicArray from './BasicArray';
import MyDomainClass from './MyDomainClass';

export default class MyDomainArray extends BasicArray {
    // Required: specify the item class type
    get myItemClass() { 
        return MyDomainClass; 
    }

    get myClass() { 
        return MyDomainArray; 
    }

    // Common pattern: find by key property
    getByKey(key) {
        return this.find(item => item.key === key);
    }

    // Custom sorting logic
    sortByName() {
        return this.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Custom serialization for API
    toSimpleJSON() {
        return this.map(item => ({
            id: item.id,
            name: item.name,
            key: item.key,
        }));
    }
}
```

## Key Features and Methods

### Validation Framework

Implement business rules in the `isSavable()` method:

```javascript
isSavable() {
    // Required fields
    if (!this.name || !this.email) return false;
    
    // Business rules
    if (this.status === 'ACTIVE' && !this.approvedBy) return false;
    
    // Format validation
    if (!this.email.includes('@')) return false;
    
    return true;
}
```

### Collection Operations

`BasicArray` provides comprehensive collection management:

```javascript
const collection = new MyEntityArray();

// Adding items
collection.add({ name: 'New Item' });
collection.addUpdate({ id: 1, name: 'Updated Item' }); // Updates if exists, adds if new

// Querying
const item = collection.get('item-id');
const found = collection.getByKey('item-key');
const hasItem = collection.contains(item);

// Manipulation
collection.move(0, 2); // Move item from index 0 to 2
collection.remove(item);
collection.removeAt(1);

// Serialization
const json = collection.toJSON();
const ids = collection.toIds(); // Array of just IDs
```

## Best Practices

### 1. Always Define DEFAULTS and FIELDS
```javascript
static DEFAULTS = { /* all properties with default values */ }
static FIELDS = Object.keys(MyClass.DEFAULTS);
```

### 2. Register Parse Subclasses
```javascript
global.Parse.Object.registerSubclass('ParseClassName', JavaScriptClass);
```

### 3. Implement Proper Validation
```javascript
isSavable() {
    // Check required fields, business rules, data formats
    return /* boolean validation result */;
}
```

### 4. Use Enums for Status Fields
```javascript
static STATUS_ACTIVE = 'ACTIVE';
static STATUSES = [MyClass.STATUS_ACTIVE /* ... */];
static STATUS_LABELS = { [MyClass.STATUS_ACTIVE]: 'Active' };
```

### 5. Provide Helper Methods
```javascript
getLabel() { return this.name || `${this.constructor.name} ${this.id}`; }
isActive() { return this.status === MyClass.STATUS_ACTIVE; }
isEmpty() { return !this.name && !this.description; }
```

## Transient Properties Pattern

For performance optimization, domain objects can include transient properties - data that is loaded for convenience but not persisted as part of the domain object itself. This should be used conservatively.

### Example: Transient Properties

```javascript
import BasicDomain from './BasicDomain';

export default class EntityWithTransients extends BasicDomain {
    static DEFAULTS = {
        name: '',
        description: '',
        isActive: true,
    }

    static FIELDS = Object.keys(EntityWithTransients.DEFAULTS);

    // Private fields for transient data
    #relatedItems = null;
    #cachedData = null;

    constructor(props) {
        super('EntityWithTransients', props, EntityWithTransients.DEFAULTS);

        // Load transient data if provided
        if (props?.relatedItems) {
            this.#relatedItems = props.relatedItems;
        }
        if (props?.cachedData) {
            this.#cachedData = props.cachedData;
        }
    }

    // Getters and setters for transient properties
    get relatedItems() { return this.#relatedItems; }
    set relatedItems(value) { this.#relatedItems = value; }

    get cachedData() { return this.#cachedData; }
    set cachedData(value) { this.#cachedData = value; }
}

global.Parse.Object.registerSubclass('EntityWithTransients', EntityWithTransients);
```

### When to Use Transient Properties

- **Performance optimization**: When related data is frequently accessed together
- **UI convenience**: When components need related data without additional queries
- **Temporary state**: For data that doesn't belong in the persistent model

### Important Notes

- Transient properties are not saved to Parse when the object is persisted
- Use private fields (`#property`) to clearly separate transient from persistent data
- Consider the memory footprint when loading large amounts of transient data
- Document transient properties clearly in your domain class comments
- Both `BasicArray` and `BasicDomain` provide a `clone` function - It is important to always clone objects in the reducer/store so that React will be able to detect the change in objects.

This domain architecture provides a robust foundation for Parse.com-based applications with comprehensive change tracking, validation, serialization, and relationship management capabilities.

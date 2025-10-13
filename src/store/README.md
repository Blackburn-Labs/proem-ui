# Redux Store Standards

This document defines our Redux patterns and coding standards for all reducer files in the `src/store` directory.

## File Structure & Naming

Store files should be named after their domain (e.g., `workspace.js`, `project.js`, `cars.js`) and placed in the `src/store` directory.

## Export Pattern

All store files must follow this export pattern:

```javascript
// Named exports for actions and selectors
export const actions = { /* ... */ };
export const selectors = { /* ... */ };

// Reducer as default export
export default reducer;
```

## Core Principles

### 1. Action Type Constants
Always define constants for action types to prevent typos and mismatches:

```javascript
// Action type constants
const LIST = 'LIST_PROEJCT';
const ADD = 'ADD_PROEJCT';
const UPDATE = 'UPDATE_PROEJCT';
const DELETE = 'DELETE_PROEJCT';
const SET = 'SET_PROEJCT';
```

### 2. Domain Objects Only
All objects in the Redux store must be domain objects that extend `BasicDomain` or `BasicArray`:
- Individual items: Extend `BasicDomain` (which extends `Parse.Object`)
- Collections: Extend `BasicArray` (e.g., `ProjectArray`, `ProfileArray`)

This allows Parse to handle serialization, deserialization, and tokenization automatically.

### 3. BasicArray Methods
When working with collections, always use these `BasicArray` methods:
- `clone()` - Creates a deep copy of the array
- `add(item)` - Adds an item to the array
- `update(item)` - Updates an existing item
- `updateAt(index, item)` - Updates item at specific index
- `addUpdate(item)` - Adds if new, updates if exists
- `sort(compareFn)` - Sorts the array
- `remove(id)` - Removes item by ID
- `removeAt(index)` - Removes item at index
- `get(id)` - Gets item by ID
- `getAt(index)` - Gets item at index
- `contains(id)` - Checks if item exists

### 4. BasicDomain Methods
Domain objects inherit from `BasicDomain` which provides:
- `clone()` - Creates a deep copy (though Parse SDK often provides cloned objects already)
- All Parse.Object methods (`save()`, `destroy()`, `toJSON()`, etc.)

## Standard Template

Every reducer file should follow this example template:

```javascript
import { createSelector } from '@reduxjs/toolkit';
import { Parse } from '../utils/parseProvider';
import { Organization, OrganizationArray } from '../../domain';

// Action type constants
const LIST = 'LIST_ORGANIZATIONS';
const ADD = 'ADD_ORGANIZATION';
const UPDATE = 'UPDATE_ORGANIZATION';
const DELETE = 'DELETE_ORGANIZATION';
const SET = 'SET_ORGANIZATION';

const initialState = {
    list: {
        data: new OrganizationArray(),
        isLoading: false,
        isLoaded: false,
    },
    selected: null,
    error: null,
};

export function reducer(state = initialState, action) {
    const { type, payload, meta } = action;

    switch (type) {
        case 'LOGOUT_USER_PENDING': {
            return initialState;
        }

        case `${LIST}_PENDING`: {
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: true,
                },
                error: null,
            };
        }

        case `${LIST}_FULFILLED`: {
            return {
                ...state,
                list: {
                    data: new OrganizationArray(payload),
                    isLoading: false,
                    isLoaded: true,
                },
                error: null,
            };
        }

        case `${LIST}_REJECTED`: {
            return {
                ...state,
                list: {
                    data: new OrganizationArray(),
                    isLoading: false,
                    isLoaded: true,
                },
                error: payload?.message || 'Failed to fetch organizations',
            };
        }

        case `${ADD}_PENDING`:
        case `${UPDATE}_PENDING`:
        case `${DELETE}_PENDING`: {
            return {
                ...state,
                error: null,
            };
        }

        case `${ADD}_REJECTED`:
        case `${UPDATE}_REJECTED`: {
            return {
                ...state,
                error: payload?.message || 'Failed to create/update organization',
            };
        }

        case `${ADD}_FULFILLED`:
        case `${UPDATE}_FULFILLED`: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.clone().addUpdate(payload),
                },
                selected: payload.id ? payload.id : state.selected,
            };
        }

        case `${DELETE}_FULFILLED`: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.clone().remove(meta?.organization?.id),
                },
                selected: state.selected === meta?.organization?.id ? null : state.selected,
            };
        }

        case `${DELETE}_REJECTED`: {
            return {
                ...state,
                error: payload?.message || 'Failed to delete organization',
            };
        }

        case `${SET}_FULFILLED`: {
            return {
                ...state,
                selected: payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const actions = {
    list: (status = Organization.STATUS_ACTIVE) => ({
        type: LIST,
        payload: new Parse.Query(Organization)
            .equalTo('status', status)
            .select(Organization.FIELDS)
            .findAll()
    }),
    create: (organization) => ({
        type: ADD,
        meta: { organization },
        payload: organization.save(),
    }),
    update: (organization) => ({
        type: UPDATE,
        meta: { organization },
        payload: organization.save(),
    }),
    remove: (organization) => ({
        type: DELETE,
        meta: { organization },
        payload: organization.destroy(),
    }),
    set: (id) => ({
        type: SET,
        meta: { id },
        payload: Promise.resolve(id),
    }),
}

export const selectors = {
    list: (state) => state.organizations.list.data,
    listMeta: createSelector(
        [(state) => state.organizations.list.isLoading, (state) => state.organizations.list.isLoaded],
        (isLoading, isLoaded) => ({
            isLoading,
            isLoaded,
        })
    ),
    current: createSelector(
        [(state) => state.organizations.list.data, (state) => state.organizations.selected],
        (organizationsData, selectedId) => {
            if (!selectedId) return null;
            return organizationsData.find(org => org.id === selectedId) || null;
        }
    ),
    currentId: (state) => state.organizations.selected,
    error: (state) => state.organizations.error,
}

export default reducer;
```

## Action Patterns

### Local Functions
For actions that resolve locally without API calls:

```javascript
export const actions = {
    clear: () => ({ 
        type: 'CLEAR_SOMETHING', 
        payload: Promise.resolve(null) 
    }),
    set: (id) => ({
        type: SET,
        meta: { id },
        payload: Promise.resolve(id),
    }),
};
```

### Parse Query Actions
Prefer Parse Queries over cloud functions when possible:

```javascript
export const actions = {
    // Get single record
    get: (id) => ({
        type: 'GET_CAR',
        meta: { id },
        payload: new Parse.Query(Car)
            .select(Car.FIELDS)
            .get(id),
    }),

    // List multiple records
    list: (skip = 0, limit = 50) => ({
        type: 'LIST_CARS',
        meta: { skip, limit },
        payload: new Parse.Query(Car)
            .skip(skip)
            .limit(limit)
            .select(Car.FIELDS)
            .find(),
    }),

    // Save single record (create or update)
    save: (car) => ({
        type: 'SAVE_CAR',
        meta: { car },
        payload: car.save(),
    }),

    // Save multiple records
    saveAll: (cars) => ({
        type: 'SAVE_ALL_CARS',
        meta: { cars }, 
        payload: Parse.Object.saveAll(cars),
    }),

    // Delete record
    remove: (car) => ({
        type: 'DELETE_CAR',
        meta: { car },
        payload: car.destroy(),
    }),
};
```

### Parse Cloud Functions
For complex operations requiring server-side logic:

```javascript
export const actions = {
    sendCarNotice: (car) => ({
        type: 'SEND_CAR_NOTICE',
        meta: { car },
        payload: Parse.Cloud.run('sendCarNotice', { car: car.toJSON() }),
    }),
};
```

## Important Rules

### ✅ DO:
- **ALWAYS** return a Promise as the payload
- Pass all parameters to `meta` for debugging
- Use `select()` with specific fields for performance
- Convert Parse Objects to JSON when passing to Cloud functions
- Use shorter action names (`get` not `getOrganization`)
- Use template literals for async action states (`${LIST}_PENDING`)

### ❌ DON'T:
- Never use `await` inside action creators
- Never use async functions in the payload
- Never store plain JavaScript objects - always use domain objects
- Never manually construct arrays - use domain array classes

**❌ WRONG:**
```javascript
export const list = () => ({
    type: 'FETCH_ORGANIZATIONS',
    payload: (async () => {  // DON'T use async
        const orgs = await new Parse.Query(Organization).find();  // DON'T await
        return new OrganizationArray(orgs);  // DON'T transform
    })(),
});
```

**✅ CORRECT:**
```javascript
export const list = () => ({
    type: 'FETCH_ORGANIZATIONS',
    payload: new Parse.Query(Organization)
        .select(Organization.FIELDS)
        .find()  // Returns Promise directly
});
```

## UI Usage Examples

### In React Components

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../store/organizations';

function OrganizationList() {
    const dispatch = useDispatch();
    const organizations = useSelector(selectors.list);
    const { isLoading, isLoaded } = useSelector(selectors.listMeta);
    const currentOrg = useSelector(selectors.current);
    const error = useSelector(selectors.error);

    // Fetch organizations on mount
    useEffect(() => {
        dispatch(actions.list());
    }, [dispatch]);

    // Select an organization
    const handleSelect = (orgId) => {
        dispatch(actions.set(orgId));
    };

    // Create new organization
    const handleCreate = (orgData) => {
        const newOrg = new Organization(orgData);
        dispatch(actions.create(newOrg));
    };

    // Update organization
    const handleUpdate = (org) => {
        org.set('name', 'New Name');
        dispatch(actions.update(org));
    };

    // Delete organization
    const handleDelete = (org) => {
        dispatch(actions.remove(org));
    };

    if (isLoading) return <Spinner />;
    if (error) return <Error message={error} />;
    
    return (
        <div>
            {organizations.map(org => (
                <OrganizationCard 
                    key={org.id}
                    organization={org}
                    isSelected={org.id === currentOrg?.id}
                    onSelect={() => handleSelect(org.id)}
                    onUpdate={() => handleUpdate(org)}
                    onDelete={() => handleDelete(org)}
                />
            ))}
        </div>
    );
}
```

### With Redux Hooks

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../store/users';

function UserProfile({ userId }) {
    const dispatch = useDispatch();
    const users = useSelector(selectors.list);
    const user = users.get(userId);  // Using BasicArray's get method

    const handleSave = () => {
        user.set('firstName', 'John');
        user.set('lastName', 'Doe');
        dispatch(actions.update(user));
    };

    return (
        <form onSubmit={handleSave}>
            {/* Form fields */}
        </form>
    );
}
```

## Middleware Requirements

This pattern assumes you're using `redux-promise-middleware` which automatically appends:
- `_PENDING` when the promise is initiated
- `_FULFILLED` when the promise resolves successfully
- `_REJECTED` when the promise fails

Configure in your store setup:
```javascript
import promiseMiddleware from 'redux-promise-middleware';

const store = configureStore({
    reducer: rootReducer,
    middleware: [promiseMiddleware],
});
```

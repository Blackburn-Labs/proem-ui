# Actions Library
This is used to make HTTP promises easier to manage. 

An example of using Axios (just to make copy/paste easier) ...
/actions/exampleAction.js
```javascript
import axios from 'axios';

const baseUrl = `http://localhost:8080/api`;

export function getItem(id) {
    return {
        type: 'GET_ITEM',
        payload: axios.get(`${baseUrl}/get.json?id=${id}`),
    };
}
```

In the page you would use code as such:
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { getItem } from '../../actions/exampleAction';

@connect
export default class ExamplePage extends React.Component {
    getSomething = (id) => {
        this.props.dispatch(getItem(id));
    };
    ...
}
```

In the reducer, you would use code such as:
```javascript
export default function reducer(state = initState, action) {
    switch (action.type) {
        case 'GET_ITEM_PENDING': {
            ...
        }
        
        case 'GET_ITEM_REJECTED': {
            ...
        }

        case 'GET_ITEM_FULFILLED': {
            ...
        }

        default: {
            return state;
        }
   }
}
```

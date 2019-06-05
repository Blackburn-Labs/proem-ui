# Actions Library
This is used to make HTTP promises easier to manage. 

An example of using Axios (just to make copy/paste easier) ...
/actions/exampleAction.js
```javascript
import axios from 'axios';

const baseUrl = `${Config.apiUrl}/classes/ClassName`;
const baseName = 'EXAMPLE';

export function getItem(id) {
    return {
        type: `${baseName}_GET`,
        payload: axios.get(`${baseUrl}/${id}`),
    };
}
```

In the page you would use code as such:
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions, { actionProvider } from '../../actions';

const propMap = store => ({});

const propTypes = {
    actions: PropTypes.instanceOf(Actions),
};

const defaultProps = {};

class ExamplePage extends Component {
    handleSomething = (id) => {
        const { actions: { ExampleAction } } = this.props;
        ExampleAction.getItem(id);
    };
    
    // ...
}

ExamplePage.propTypes = propTypes;
ExamplePage.defaultProps = defaultProps;
export default connect(propMap, actionProvider)(ExamplePage);
```

In the reducer, you would use code such as:
```javascript
const baseName = 'EXAMPLE';

export default function reducer(state = initState, action) {
    switch (action.type) {
        case `${baseName}_GET_PENDING`: {
            // ...
        }
        
        case `${baseName}_GET_REJECTED`: {
            // ...
        }

        case `${baseName}_GET_FULFILLED`: {
            // ...
        }

        default: {
            return state;
        }
   }
}
```

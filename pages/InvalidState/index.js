import React, { Component } from 'react';

import { Message } from '../../domain';
import MessageBox from '../../components/MessageBox';

class InvalidState extends Component {
    render() {
        return (
            <MessageBox
                message={new Message({
                    title: 'Invalid System State',
                    details: 'Sorry, an unknown state or command was given.',
                    type: 'error',
                })}
            />
        );
    }
}

export default InvalidState;

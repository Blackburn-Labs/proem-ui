import React from 'react';

import { CloseIcon } from 'utils/Icons';
import MessageBox from '.';
import { Message } from '../../domain';

export default { title: 'MessageBox' };

export const emptyMessage = () => <MessageBox message={new Message({})} />;

export const errorMessage = () => (
    <MessageBox message={
        new Message({
            type: 'error',
            title: 'Test Message',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        })
    }
    />
);

export const warnMessage = () => (
    <MessageBox message={
        new Message({
            type: 'warn',
            title: 'Test Message',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        })
    }
    />
);

export const infoMessage = () => (
    <MessageBox message={
        new Message({
            type: 'info',
            title: 'Test Message',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        })
    }
    />
);

export const successMessage = () => (
    <MessageBox message={
        new Message({
            type: 'success',
            title: 'Test Message',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        })
    }
    />
);


export const customIconMessage = () => (
    <MessageBox
        icon={<CloseIcon />}
        message={
            new Message({
                type: 'success',
                title: 'Test Message',
                details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
            })
        }
    />
);

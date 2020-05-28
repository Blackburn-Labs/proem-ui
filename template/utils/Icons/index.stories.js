import React from 'react';
import * as Icons from '.';

const iconNames = Object.keys(Icons);
const iconModules = Object.values(Icons);

export default { title: 'Icons Library' };

const test = [Icons.CloseIcon, Icons.ErrorIcon];
export const IconLibrary = () => (
    <>
        {iconNames.map((iconName, ix) => (
            <dl key={iconName} style={{ display: 'inline-block', padding: '1em', textAlign: 'center' }}>
                <dd style={{ margin: 'auto' }}>{iconModules[ix]()}</dd>
                <dt>{iconName}</dt>
            </dl>
        ))}
    </>
);

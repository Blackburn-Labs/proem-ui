/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';

function InvalidState() {
  console.error('Invalid System State Error.');
  return (
    <div>
      <h1>{'Invalid System State'}</h1>
      <p>{'Sorry, an unknown state or command was given.'}</p>
    </div>
  );
}

export default InvalidState;

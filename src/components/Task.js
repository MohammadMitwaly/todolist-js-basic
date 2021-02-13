import React from 'react';

export default (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          textDecoration: props.task.complete ? 'line-through' : '',
          fontSize: 24,
        }}
        onClick={props.completeTask}
      >
        {props.task.text}
      </div>
      <button onClick={props.removeTask}>❌</button>
    </div>
  );
};

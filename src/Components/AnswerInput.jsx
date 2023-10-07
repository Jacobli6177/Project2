import React, { useState } from 'react';

const AnswerInput = ({ onCheckAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckAnswer(userAnswer);
    setUserAnswer(''); // Clear the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userAnswer}
        onChange={handleChange}
        placeholder="Type your answer..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AnswerInput;


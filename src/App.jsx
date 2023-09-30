import './App.css'
import React, { useState } from 'react';
const CardComponent = ({ card }) => {
  const [showQuestion, setShowQuestion] = useState(true);

  const toggleCard = () => {
    setShowQuestion(!showQuestion);
  };
  return (
    <div className="card" onClick={toggleCard}>
      {showQuestion ? <div className="question">{card.question}</div> : <div className="answer">{card.answer}</div>}
    </div>
  );
};

const App = () => {
  const cardSet = [
    { question: ' Start ?', answer: 'Click the next button to display flashcards' },
    { question: ' What does 안녕하세요 mean ?', answer: 'Hello' },
    { question: 'What does 주세요 mean?', answer: 'Please' },
    { question: 'What does 죄송합니다 mean ?', answer: 'Sorry'},
    { question: 'What does 고맙습니다 mean', answer: 'Thank you'},
    { question: 'What does 네 mean', answer: 'Yes'},
    { question: 'What does  아니요 mean', answer: 'No'},
    { question: 'What does 도와 주세요 ', answer: 'Help'},
    { question: 'What does 저기요 mean', answer: 'Excuse me'},
    { question: 'What does  내일 밥 같이 먹을래요 mean', answer: 'Shall we eat together tomorrow'},

  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex(Math.floor(Math.random() * cardSet.length));
  };
  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => {
      return prevIndex === 0 ? cardSet.length - 1 : prevIndex - 1;
    });
  };
  return (
    <div className="app">
      <div className='container'>
        <div className="card-set-info">
          <h1>Korean Word Vocabulary</h1>
          <p>Learn some basic Korean words and phrases.</p>
          <p className='card-size'>Total Cards: {cardSet.length}</p>
        </div>
        <div className='card-text'>
        <CardComponent card={cardSet[currentCardIndex]} />
        </div>
        <button onClick={handlePrevCard}>Previous</button>
        <button onClick={handleNextCard}>Next</button>
      </div>
    </div>
  );
};

export default App;
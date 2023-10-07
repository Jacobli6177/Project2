import './App.css'
import AnswerInput from './Components/AnswerInput';
import React, { useState } from 'react';
const CardComponent = ({ card, isAnswerCorrect, onToggleCard }) => {
  const [showQuestion, setShowQuestion] = useState(true);

  const toggleCard = () => {
    setShowQuestion(!showQuestion);
    onToggleCard(); // Moved the function call to the parent component
  };

  return (
    <div className="card" onClick={toggleCard}>
      {showQuestion ? <div className="question">{card.question}</div> : <div className="answer">{card.answer}</div>}
      {isAnswerCorrect !== null && (
        <div className={isAnswerCorrect ? 'correct' : 'incorrect'}>
          {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
        </div>
      )}
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
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleCheckAnswer = (userAnswer) => {
    const isCorrect = userAnswer.trim().toLowerCase() === cardSet[currentCardIndex].answer.toLowerCase();
  
    if (isCorrect) {
      setCurrentStreak(prevStreak => prevStreak + 1);
      setLongestStreak(prevStreak => Math.max(prevStreak, currentStreak + 1));
    } else {
      setCurrentStreak(0);
    }
  
    setIsAnswerCorrect(isCorrect);
    setUserAnswer(''); // Clear the input field after submitting
  };
  const handleNextCard = () => {
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % cardSet.length); // Go to the next card in order
    setIsAnswerCorrect(null); // Reset correctness status when changing cards
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => {
      return prevIndex === 0 ? cardSet.length - 1 : prevIndex - 1;
    });
    setIsAnswerCorrect(null); // Reset correctness status when changing cards
  };
  
  const handleShuffleCards = () => {
    setCurrentCardIndex(Math.floor(Math.random() * cardSet.length));
    setIsAnswerCorrect(null)
  };
  
  return (
    <div className="app">
      <div className='container'>
        <div className="card-set-info">
          <h1>Korean Word Vocabulary</h1>
          <p>Learn some basic Korean words and phrases.</p>
          <p className='card-size'>Total Cards: {cardSet.length}</p>
        </div>
        <div className="streak-info">
          <p>Current Streak: {currentStreak} Longest Streak: {longestStreak}</p>
        </div>
        <div className='card-text'>
          <CardComponent 
            card={cardSet[currentCardIndex]} 
            isAnswerCorrect={isAnswerCorrect} 
          />
        </div>
        <AnswerInput onCheckAnswer={handleCheckAnswer} 
        userAnswer={userAnswer}/>
        <button onClick={handlePrevCard}>Previous</button>
        <button onClick={handleNextCard}>Next</button>
        <button onClick={handleShuffleCards}>Shuffle</button>
      </div>
    </div>
  );
};

export default App;
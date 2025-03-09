import React, { useState } from 'react';
import '../style/QuestionCard.css';

const QuestionCard = ({ question, options, onAnswer, number, total }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption);
      setShowFeedback(true);
      
      // Reset after a short delay
      setTimeout(() => {
        setSelectedOption(null);
        setShowFeedback(false);
      }, 1000);
    }
  };
  
  return (
    <div className="question-card">
      <div className="question-progress">
        <div className="question-number">
          Question {number} sur {total}
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar progress-yellow" 
            style={{ width: `${(number / total) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="question-content">
        <h3 className="question-text">{question}</h3>
        
        <div className="options-container">
          {options.map((option, index) => (
            <div 
              key={index}
              className={`option ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="option-marker">
                {selectedOption === index ? <i className="fas fa-check"></i> : index + 1}
              </div>
              <div className="option-text">{option}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="question-actions">
        <button 
          className="btn btn-next"
          disabled={selectedOption === null}
          onClick={handleSubmit}
        >
          {showFeedback ? (
            <span>Enregistré <i className="fas fa-check"></i></span>
          ) : (
            <span>Suivant <i className="fas fa-arrow-right"></i></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;

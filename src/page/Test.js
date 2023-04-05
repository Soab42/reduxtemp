import React, { useState } from "react";

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([
    {
      question: "What is the capital of France?",
      choices: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
      userAnswer: null
    },
    {
      question: "What is the highest mountain in the world?",
      choices: ["K2", "Mount Everest", "Makalu", "Cho Oyu"],
      correctAnswer: 1,
      userAnswer: null
    },
    {
      question: "What is the largest mammal in the world?",
      choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: 1,
      userAnswer: null
    }
  ]);

  const [totalMark, setTotalMark] = useState(0);

  function handleAnswerClick(answerIndex, questionIndex) {
    const newQuizQuestions = [...quizQuestions];

    newQuizQuestions[questionIndex].userAnswer = answerIndex;
    setQuizQuestions(newQuizQuestions);
  }
  console.log(quizQuestions);
  function handleQuizSubmit() {
    const newTotalMark = quizQuestions.reduce((accumulator, currentValue) => {
      if (currentValue.userAnswer === currentValue.correctAnswer) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    setTotalMark(newTotalMark);
  }

  return (
    <div>
      {quizQuestions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h3>{question.question}</h3>
          {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <input
                type="radio"
                name={`question${questionIndex}`}
                onClick={() => handleAnswerClick(choiceIndex, questionIndex)}
              />
              <label>{choice}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleQuizSubmit}>Submit</button>
      {totalMark > 0 && <p>Total mark: {totalMark}</p>}
    </div>
  );
}

export default Quiz;

/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function SingleQuiz({ quiz, setAnswer, answer }) {
  const { options, question, id } = quiz;
  const [selected, setSelected] = useState([]);

  const points = (selectedData) => {
    const selectedOptions = options.filter((option) =>
      selectedData.includes(option.id)
    );
    const trueSelected = selectedOptions.filter(
      (option) => option.isCorrect === true
    );
    const trueAnswers = options.filter((option) => option.isCorrect === true);
    if (
      trueSelected.length === trueAnswers.length &&
      selected.length === trueAnswers.length
    ) {
      return setAnswer(answer + 1);
    }
    return setAnswer(answer + 1);
  };

  const handleChange = (option) => {
    let newSelected = [...selected];
    if (selected.includes(option.id)) {
      newSelected = newSelected.filter((sid) => sid !== option.id);
    } else {
      newSelected.push(option.id);
    }
    setSelected(newSelected);
    points(newSelected);
  };

  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <div className="quizOptions">
        {/* <!-- Option 1 --> */}
        {options?.map((option) => (
          <label htmlFor={`option${option.id}_q${id}`} key={option.id}>
            <input
              type="checkbox"
              id={`option${option.id}_q${id}`}
              className="eachAnswer"
              name={option.isCorrect.toString()}
              onChange={() => handleChange(option)}
            />
            {option.option}
          </label>
        ))}
      </div>
    </div>
  );
}

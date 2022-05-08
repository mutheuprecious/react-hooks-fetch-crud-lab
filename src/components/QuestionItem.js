import React from "react";

function QuestionItem({ question , handleQuizDelete, handleQuizUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDeleteQuizClick() {
    handleQuizDelete(question)
  }

  function handleOptionChange(event) {
    handleQuizUpdate(question, event.target.value)
  }
    return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}onChange={handleOptionChange} >{options}</select>
      </label>
      <button onClick={handleDeleteQuizClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;

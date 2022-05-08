import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuizes] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then((res) => res.json())
    .then((questions) => setQuizes(questions))
  }, []);

  function handleAddNewQuiz(quiz) {
    setQuizes([...questions, quiz])
  }

  function handleQuizDelete(quiz) {
    fetch(`http://localhost:4000/questions/${quiz.id}`, {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => {
      const updatedList = questions.filter((question) => question.id !== quiz.id)
      setQuizes(updatedList)
    })
  }

  function handleQuizUpdate(quiz, index) {
    fetch(`http://localhost:4000/questions/${quiz.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...quiz,
        correctIndex: Number(index),
      })
    })
    .then((res) => res.json())
    .then((updatedQuiz) => {
      const updatedList = questions.map((question) => {
        if(question.id === updatedQuiz.id) {
          return updatedQuiz
        } else {
          return question
        }
      });
      setQuizes(updatedList)
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuiz={handleAddNewQuiz}/> : <QuestionList questions={questions} onDeleteQuiz={handleQuizDelete} onUpdateQuiz={handleQuizUpdate}/>}
    </main>
  );
}

export default App;

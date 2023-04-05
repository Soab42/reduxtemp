/* eslint-disable no-plusplus */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAddQuizMarkMutation } from "../../features/marks/quizMarksApi";
import { useGetQuizzesByVideoIdQuery } from "../../features/quizes/quizesApi";

export default function Quizes() {
  const { video_id } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const { user } = useSelector((s) => s.auth);
  const {
    data: quizzesFromDb,
    isLoading,
    isError
  } = useGetQuizzesByVideoIdQuery(video_id);
  const [addQuizMark] = useAddQuizMarkMutation();
  useEffect(() => {
    setQuizes(quizzesFromDb);
    setSelectedAnswers(quizzesFromDb?.map((quiz) => []));
  }, [quizzesFromDb]);

  const submitQuiz = (e) => {
    e.preventDefault();

    // Calculate results
    const results = quizzes?.map((quiz, i) => {
      const selectedOptions = quiz?.options?.filter((option) =>
        selectedAnswers[i]?.includes(option.id)
      );
      const trueSelected = selectedOptions?.filter(
        (option) => option.isCorrect === true
      );
      const trueAnswers = quiz?.options?.filter(
        (option) => option.isCorrect === true
      );
      const isCorrect =
        trueSelected?.length === trueAnswers?.length &&
        selectedAnswers[i]?.length === trueAnswers.length;
      return {
        question: quiz.question,
        mark: isCorrect ? 1 : 0
      };
    });

    // ... submit the data, e.g. using an API or dispatching an action
    const totalCorrect = results?.reduce((acc, res) => acc + res.mark, 0);
    const data = {
      student_id: user?.id,
      student_name: user?.name,
      video_id: quizzes[0]?.video_id,
      video_title: quizzes[0]?.video_title,
      totalQuiz: quizzes?.length,
      totalCorrect,
      totalWrong: quizzes?.length - totalCorrect,
      totalMark: quizzes?.length * 5,
      mark: totalCorrect * 5
    };
    // console.log(data);
    addQuizMark(data).unwrap(navigate("/leaderboard"));

    // Clear selected answers
    setSelectedAnswers(quizzesFromDb?.map((quiz) => []));
  };

  const handleChange = (quizIndex, optionId, isChecked) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      if (isChecked) {
        newSelectedAnswers[quizIndex] = [
          ...newSelectedAnswers[quizIndex],
          optionId
        ];
      } else {
        newSelectedAnswers[quizIndex] = newSelectedAnswers[quizIndex]?.filter(
          (id) => id !== optionId
        );
      }
      return newSelectedAnswers;
    });
  };

  let content;
  if (isLoading) {
    content = <div>loading....</div>;
  } else if (!isLoading && isError) {
    content = <div>{"There is an error"}</div>;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Quizzes for
              {quizzes?.length > 0 && quizzes[0]?.video_title}
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <form onSubmit={submitQuiz}>
            <div className="space-y-8 ">
              {quizzes?.map((quiz, quizIndex) => (
                <div className="quiz" key={quiz.id}>
                  <h4 className="question">{quiz.question}</h4>

                  <div className="quizOptions">
                    {/* <!-- Option 1 --> */}
                    {quiz?.options?.map((option) => (
                      <label
                        htmlFor={`option${option.id}_q${quiz.id}`}
                        key={option.id}
                      >
                        <input
                          type="checkbox"
                          id={`option${option.id}_q${quiz.id}`}
                          className="eachAnswer"
                          name={option.isCorrect.toString()}
                          onChange={(e) =>
                            handleChange(quizIndex, option.id, e.target.checked)
                          }
                          checked={selectedAnswers[quizIndex].includes(
                            option.id
                          )}
                        />
                        {option.option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {quizzes?.length > 0 && (
              <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
                Submit
              </button>
            )}
          </form>
        </div>
      </section>
    );
  } else if (quizzes?.length === 0) {
    content = <div>There is no quiz in this video</div>;
  }
  return content;
}

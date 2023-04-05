import React, { useState } from "react";
import AddQuiz from "../../components/admin/AddQuiz";
import QuizLine from "../../components/admin/QuizLine";
import { useGetQuizzesQuery } from "../../features/quizes/quizesApi";

export default function Quiz() {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    // add the quiz
    // set the isModalOpen state variable to false to close the modal
    setIsModalOpen(false);
  };
  let content;
  if (isLoading) {
    content = <div>loading....</div>;
  } else if (!isLoading && isError) {
    content = <div>{"There is an Error"}</div>;
  } else if (!isLoading && !isError && quizzes.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Question</th>
              <th className="table-th">Video</th>
              <th className="table-th justify-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {quizzes?.map((quiz) => (
              <QuizLine key={quiz.id} quiz={quiz} />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (quizzes?.length === 0) {
    content = (
      <div className="w-full text-center text-5xl grid mt-32">
        There are currently no Quiz in the system. You can add Quiz.
        <br />
        <span className="w-full m-2 mt-16  ">
          <button
            className="rounded-full px-6 py-3 text-slate-200 font-bold text-4xl hover:bg-blue-700 animate-bounce hover:animate-none hover:text-slate-300"
            onClick={openModal}
          >
            Add Quiz
          </button>
        </span>
      </div>
    );
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button
              className="btn ml-auto"
              onClick={openModal}
              hidden={quizzes?.length === 0}
            >
              Add Quiz
            </button>
            <AddQuiz
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
            />
          </div>
          {/* add zero system */}
          {content}
        </div>
      </div>
    </section>
  );
}

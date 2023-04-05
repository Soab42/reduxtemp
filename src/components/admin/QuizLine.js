/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { useDeleteQuizMutation } from "../../features/quizes/quizesApi";
import { deleteSvg, editSvg } from "../ui/svg";
import EditQuiz from "./EditQuiz";

export default function QuizLine({ quiz }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteQuiz] = useDeleteQuizMutation();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    // add the quiz
    // set the isModalOpen state variable to false to close the modal
    setIsModalOpen(false);
  };
  return (
    <tr key={quiz?.id}>
      <td className="table-td">{quiz?.question}</td>
      <td className="table-td">{quiz?.video_title}</td>
      <td className="table-td flex gap-x-2 justify-center">
        <div onClick={() => deleteQuiz(quiz?.id)}>{deleteSvg}</div>
        <div onClick={openModal}>{editSvg}</div>
        <EditQuiz
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          id={quiz.id}
        />
      </td>
    </tr>
  );
}

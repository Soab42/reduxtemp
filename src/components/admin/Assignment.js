/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDeleteAssignmentMutation } from "../../features/assignment/assignmentApi";
import { deleteSvg, editSvg } from "../ui/svg";
import EditAssignment from "./EditAssignment";

export default function Assignment({ assignment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAssignment] = useDeleteAssignmentMutation();
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <tr key={assignment?.id}>
      <td className="table-td">{assignment?.title}</td>
      <td className="table-td">{assignment?.video_title}</td>

      <td className="table-td">100</td>
      <td className="table-td flex gap-x-2">
        <div onClick={() => deleteAssignment(assignment?.id)}>{deleteSvg}</div>
        <div onClick={openModal}>{editSvg}</div>
        <EditAssignment
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          id={assignment?.id}
        />
      </td>
    </tr>
  );
}

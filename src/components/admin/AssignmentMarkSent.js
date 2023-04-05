/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import moment from "moment";
import React, { useState } from "react";
import { useUpdateAssignmentMarkMutation } from "../../features/marks/assignmentMarksApi";
import { tick } from "../ui/svg";

export default function AssignmentMarkSent({ assignmentMark }) {
  const [mark, setMark] = useState("");
  const [updateAssignmentMark] = useUpdateAssignmentMarkMutation();
  const submitMark = (id) => {
    const data = { mark, status: "sent" };
    updateAssignmentMark({ id, data });
  };
  return (
    <tr key={assignmentMark.id}>
      <td className="table-td">{assignmentMark.title}</td>
      <td className="table-td">
        {/* 10 Mar 2023 10:58:13 PM */}
        {moment(assignmentMark.createdAt).format("DD MMM YYYY hh:mm:ss A")}
      </td>
      <td className="table-td">{assignmentMark.student_name}</td>
      <td className="table-td">{assignmentMark.repo_link}</td>
      {assignmentMark.status === "pending" ? (
        <td className="table-td input-mark">
          <input
            max={assignmentMark.totalMark}
            type="number"
            onChange={(e) => setMark(Number(e.target.value))}
          />
          <div onClick={() => submitMark(assignmentMark.id)}>{tick}</div>
        </td>
      ) : (
        <td className="table-td font-bold">{assignmentMark.mark}</td>
      )}
    </tr>
  );
}

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
// /* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";

export default function Leader({ user, studentData }) {
  const { student, totalQuizMark, totalAssignmentMark, totalMark, rank } =
    studentData || [];

  return (
    <tbody>
      <tr
        className={`ring-[.02rem] hover:bg-slate-900 cursor-pointer ${
          user?.id === student?.id && "border-2 border-cyan"
        } `}
      >
        <td className="table-td text-center font-bold flex justify-center">
          {rank == 1 ? <img src="/trophy.png" className="w-6" /> : rank}
        </td>
        <td className="table-td text-center font-bold">{student?.name}</td>
        <td className="table-td text-center font-bold">{totalQuizMark}</td>
        <td className="table-td text-center font-bold">
          {totalAssignmentMark}
        </td>
        <td className="table-td text-center font-bold">{totalMark}</td>
      </tr>
    </tbody>
  );
}

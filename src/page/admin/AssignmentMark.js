/* eslint-disable camelcase */
import React from "react";

import AssignmentMarkSent from "../../components/admin/AssignmentMarkSent";
import { useGetAssignmentMarksQuery } from "../../features/marks/assignmentMarksApi";

export default function AssignmentMark() {
  const {
    data: assignmentMarks,
    isError,
    isLoading
  } = useGetAssignmentMarksQuery();
  const totalAssignmentMark = assignmentMarks?.length || 0;
  const totalAssignmentMarkPending =
    assignmentMarks?.filter(
      (assignmentMark) => assignmentMark.status === "pending"
    )?.length || 0;
  const MarkSent = totalAssignmentMark - totalAssignmentMarkPending || 0;
  let content;
  if (isLoading) {
    content = <div>loading....</div>;
  } else if (!isLoading && isError) {
    content = <div>{"There is an Error"}</div>;
  } else if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = (
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <ul className="assignment-status">
            <li>
              Total <span>{totalAssignmentMark}</span>
            </li>
            <li>
              Pending <span>{totalAssignmentMarkPending}</span>
            </li>
            <li>
              Mark Sent <span>{MarkSent}</span>
            </li>
          </ul>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Assignment</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">Student Name</th>
                  <th className="table-th">Repo Link</th>
                  <th className="table-th">Mark</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">
                {assignmentMarks?.map((assignmentMark) => (
                  <AssignmentMarkSent
                    key={assignmentMark.id}
                    assignmentMark={assignmentMark}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else if (assignmentMarks?.length === 0) {
    content = (
      <div className="w-full text-center text-5xl grid mt-32">
        There are currently no Assignment submitted !
      </div>
    );
  }
  return <section className="py-6 bg-primary">{content}</section>;
}

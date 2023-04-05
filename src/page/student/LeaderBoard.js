/* eslint-disable eqeqeq */

/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Leader from "../../components/student/Leader";
import { useGetAssignmentMarksQuery } from "../../features/marks/assignmentMarksApi";
import { useGetQuizMarksQuery } from "../../features/marks/quizMarksApi";
import { useGetStudentsQuery } from "../../features/users/usersApi";

export default function LeaderBoard() {
  const { data: students } = useGetStudentsQuery();
  const { user } = useSelector((x) => x.auth);
  // console.log(user);
  const quizMarks = useGetQuizMarksQuery();
  const assignmentMarks = useGetAssignmentMarksQuery();

  const studentMarks = useMemo(
    () =>
      students?.map((student) => {
        const studentQuizMarks = quizMarks.data?.filter(
          (mark) => mark.student_id === student.id
        );
        const studentAssignmentMarks = assignmentMarks.data?.filter(
          (mark) => mark.student_id === student.id
        );
        const totalQuizMark =
          studentQuizMarks?.reduce((acc, point) => acc + point.mark, 0) || 0;
        const totalAssignmentMark =
          studentAssignmentMarks?.reduce((acc, point) => acc + point.mark, 0) ||
          0;
        const totalMark = totalQuizMark + totalAssignmentMark;

        return {
          student,
          totalQuizMark,
          totalAssignmentMark,
          totalMark
        };
      }),
    [students, quizMarks.data, assignmentMarks.data]
  );

  // Sort the students by their total marks
  studentMarks?.sort((a, b) => b.totalMark - a.totalMark);

  // Assign a rank to each student based on their position in the sorted array
  // const rankedStudents = studentMarks?.map((studentMark, index) => ({
  //   ...studentMark,
  //   rank: index + 1
  // }));
  let rank = 1;
  let prevMark = null;
  let prevRank = null;
  const rankedStudents = studentMarks?.map((studentData, index) => {
    const { student, totalMark } = studentData;
    if (totalMark !== prevMark) {
      // new rank for unmatched total marks
      rank = prevRank + 1;
    }
    // Store the current data for the next iteration
    prevRank = rank;
    prevMark = totalMark;
    // Assign the current rank to the student
    return {
      ...studentData,
      rank
    };
  });

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>
            {rankedStudents?.map(
              (student) =>
                student?.student?.id === user?.id && (
                  <Leader
                    user={user}
                    studentData={student}
                    key={student?.student?.id}
                  />
                )
            )}
          </table>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>
            {rankedStudents?.slice(0, 20).map((student) => (
              <Leader
                user={user}
                studentData={student}
                key={student?.student?.id}
              />
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import AddAssignment from "../../components/admin/AddAssignment";
import Assignment from "../../components/admin/Assignment";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";

export default function AssignmentA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    setIsModalOpen(false);
  };
  let content;
  if (isLoading) {
    content = <div>loading....</div>;
  } else if (!isLoading && isError) {
    content = <div>{"There is an Error"}</div>;
  } else if (!isLoading && !isError && assignments.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Title</th>
              <th className="table-th">Video Title</th>
              <th className="table-th">Mark</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {assignments?.map((assignment) => (
              <Assignment key={assignment.id} assignment={assignment} />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (assignments?.length === 0) {
    content = (
      <div className="w-full text-center text-5xl grid mt-32">
        There are currently no Assignment in the system. You can add Assignment.
        <br />
        <span className="w-full m-2 mt-16  ">
          <button
            className="rounded-full px-6 py-3 text-slate-200 font-bold text-4xl hover:bg-blue-700 animate-bounce hover:animate-none hover:text-slate-300"
            onClick={openModal}
          >
            Add Assignment
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
              hidden={assignments?.length === 0}
            >
              Add Assignment
            </button>
          </div>
          <AddAssignment
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />

          {content}
        </div>
      </div>
    </section>
  );
}

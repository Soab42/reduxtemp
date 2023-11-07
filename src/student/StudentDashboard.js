import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Studenthashboard() {
  const home = useLocation().pathname === "/";
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState();
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await fetch("http://localhost:4000")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response as JSON
        })
        .then((responseData) => {
          setData(responseData); // Update the state with the fetched data
          setLoading(false); // Set loading to false
        })
        .catch((error) => {
          console.error("Fetch error:", error);

          setLoading(false); // Handle errors and set loading to false
        });
    }
    getData();
  }, []);
  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (data) {
    content = (
      <table className="border-separate border-spacing-2 w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="w-1/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              ID
            </th>
            <th className="w-2/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Name
            </th>
            <th className="w-2/5 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((student) => (
              <tr key={student.id} className="hover:bg-slate-700/20">
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {student.id}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {student.name}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {student.email}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="main ">
      <nav className="flex h-10 justify-center items-center w-full gap-5 bg-cyan-600/20 mb-2">
        <div className={`btn ${home && "active"}`}>
          <Link to="/">Home</Link>
        </div>
        <div className={`btn ${!home && "active"}`}>
          <Link to="/registration">Registration</Link>
        </div>
      </nav>
      <div className="title">Student List</div>
      <div className="w-full px-32">{content}</div>
    </div>
  );
}

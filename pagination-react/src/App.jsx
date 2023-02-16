import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { fetchData } from "./utils/api";
import Loading from "./Components/Loading";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const numOfTotalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  function prevPageHandler() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }
  function nextPageHandler() {
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  }
  function getIndexNumber(index) {
    return currentPage !== 1
      ? currentPage * todosPerPage - todosPerPage + index + 1
      : index + 1;
  }

 

  useEffect(() => {
    
    fetchData()
      .then((data) => {
        setTodos(data.data);
        setTimeout(() => {
          toast.success("Successfully Loaded");
           setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error(error.message);
           setLoading(false);
        }, 1000);
        
      });
 
  }, []);

  return (
    <div className="content-center px-96 py-16">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" relative rounded-lg  sm:rounded-lg">
            No. of Page :{" "}
            <select
              className="font-bold place-items-right mb-3 text-xl border-2 border-red-500 rounded-md"
              onChange={(e) => setTodosPerPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <table className="w-full table-auto rounded-lg mb-8 text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleTodos.map((todo, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-2 py-2">{getIndexNumber(index)}</td>
                    <th
                      scope="row"
                      className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {todo.title}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visibleTodos.length > 0 ? (
            <nav aria-label="Page w-full mt-24   navigation example">
              <ul className="inline-flex ">
                <li>
                  <a
                    onClick={prevPageHandler}
                    className="px-3 cursor-pointer py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
                {pages.map((page, idx) => (
                  <li key={idx}>
                    <a
                      onClick={() => setCurrentPage(page)}
                      aria-current="page"
                      className={`px-3 cursor-pointer py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 ${
                        currentPage === page ? "" : "dark:text-white"
                      }`}
                    >
                      {`${page}`}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    onClick={nextPageHandler}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            <div className="font-bold text-5xl text-red-500 mt-48">
              {" "}
              Error Retrieving data{" "}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

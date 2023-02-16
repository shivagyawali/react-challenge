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
    <div className="grid place-items-center ">
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-16">
          <select
            className="font-bold text-right text-xl border-2 border-red-500 rounded-md"
            onChange={(e) => setTodosPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <div className="mt-5">
            {visibleTodos.map((todo, index) => (
              <p className="text-xl" key={index}>
                {getIndexNumber(index)} {todo.title}
              </p>
            ))}
          </div>
          {visibleTodos.length > 0 ? (
            <div className="flex mt-8 mb-10 gap-6 ">
              <span
                className={` text-xl ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "font-bold cursor-pointer"
                }`}
                onClick={prevPageHandler}
              >
                prev
              </span>
              <p className="text-xl">
                {pages.map((page, idx) => (
                  <span
                    onClick={() => setCurrentPage(page)}
                    className={`cursor-pointer gap-6 ${
                      currentPage === page ? "font-bold text-red-500" : ""
                    }`}
                    key={idx}
                  >{`${page}   `}</span>
                ))}
              </p>
              <span
                className={`text-xl ${
                  currentPage === numOfTotalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "cursor-pointer font-bold"
                }`}
                onClick={nextPageHandler}
              >
                next
              </span>
            </div>
          ) : (
            <div className="font-bold text-5xl text-red-500 mt-48">
              {" "}
              Error Retrieving data{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

const Pagination = ({ pageDataLimit, posts }) => {
  const [currPageNo, setCurrPageNo] = useState(1);
  const [currPagePosts, setCurrPagePosts] = useState([]);
  const [pageNumberGroup, setPageNumberGroup] = useState([]);

  useEffect(() => {
    setCurrPagePosts(getPageData());
    setPageNumberGroup(getPageNumberGroup());
    console.log("run");
  }, [posts, currPageNo]);

  const nextPage = () => setCurrPageNo((prev) => prev + 1);
  const previousPage = () => setCurrPageNo((prev) => prev - 1);
  const changePageTo = (pageNumber) => setCurrPageNo(pageNumber);
  const getPageData = () => {
    const startIndex = currPageNo * pageDataLimit - pageDataLimit;
    const endIndex = startIndex + pageDataLimit;
    return posts.slice(startIndex, endIndex);
  };
  const getPageNumberGroup = () => {
    let start = Math.floor((currPageNo - 1) / 3) * 3;
    console.log(new Array(3).fill(" ").map((_, index) => start + index + 1));
    return new Array(3).fill(" ").map((_, index) => start + index + 1);
  };

  return (
    <div>
      <h1 className="heading">Posts in Pagination</h1>
      <ul className="posts-container list-style-none">
        {currPagePosts.map(({ id, title, body }) => {
          return (
            <li key={id} className="post">
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
      <div className="page-num-container">
        <button
          className={`page-change-btn ${currPageNo === 1 ? "disabled" : ""}  `}
          disabled={currPageNo === 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <ul className="page-num-container list-style-none">
          {pageNumberGroup.map((value, index) => {
            return (
              <li
                className={`page-number ${
                  currPageNo === value ? "active" : ""
                } `}
                key={index}
                onClick={() => changePageTo(value)}
              >
                {value}
              </li>
            );
          })}
        </ul>
        <button
          disabled={currPageNo === Math.floor(posts.length / pageDataLimit)}
          className={`page-change-btn ${
            currPageNo === Math.floor(posts.length / pageDataLimit)
              ? "disabled"
              : ""
          }  `}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { Pagination };

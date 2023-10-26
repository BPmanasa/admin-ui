import React from "react";
import "./pagination.css";

function Pagination({
  userData,
  handleDeleteSelected,
  userDataPerPage,
  totalUserData,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUserData / userDataPerPage); i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  return (
    <div>
      {userData.length ? (
        <div>
          <div className="delete-button">
            <button className="btn btn-danger" onClick={handleDeleteSelected}>
              DELETE SELECTED
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-center m-3">
            <nav aria-label="Page navigation">
              <ul className="pagination gap-2">
                <li className="page-item">
                  <a
                    className="page-link rounded-circle custom-rounded-button"
                    onClick={() => paginate(1)}
                    href="!#"
                    aria-label="First"
                    disabled={isFirstPage}
                  >
                    <span aria-hidden="true">&laquo;&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className={`page-link rounded-circle custom-rounded-button ${
                      isFirstPage ? "disabled" : ""
                    }`}
                    onClick={() => paginate(currentPage - 1)}
                    href="!#"
                    aria-label="Previous"
                    disabled={isFirstPage}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <a
                      onClick={() => paginate(number)}
                      href="!#"
                      className={`page-link rounded-circle custom-rounded-button ${
                        currentPage === number ? "active" : ""
                      }`}
                      aria-label={`Page ${number}`}
                    >
                      {number}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a
                    className={`page-link rounded-circle custom-rounded-button ${
                      isLastPage ? "disabled" : ""
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                    href="!#"
                    aria-label="Next"
                    disabled={isLastPage}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link page-link rounded-circle custom-rounded-button"
                    onClick={() => paginate(pageNumbers.length)}
                    href="!#"
                    aria-label="Last"
                    disabled={isLastPage}
                  >
                    <span aria-hidden="true">&raquo;&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Pagination;

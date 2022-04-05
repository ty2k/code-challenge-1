import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({
  count,
  currentPage,
  displayedPerPage,
  linkPartial,
  totalPages,
}) => {
  return (
    <div className="pagination">
      <ul>
        {currentPage !== 1 && (
          <li key="back">
            <Link to={`${linkPartial}/${currentPage - 1}`}>← Previous</Link>
          </li>
        )}
        {Array.from(Array(totalPages), (e, i) => {
          return (
            <li key={i}>
              {currentPage === i + 1 && <span>{currentPage}</span>}
              {currentPage !== i + 1 && (
                <Link to={`${linkPartial}/${i + 1}`}>{i + 1}</Link>
              )}
            </li>
          );
        })}
        {currentPage !== totalPages && (
          <li key="forward">
            <Link to={`${linkPartial}/${currentPage + 1}`}>Next →</Link>
          </li>
        )}
      </ul>
      <span>
        Showing <strong>{displayedPerPage}</strong> of <strong>{count}</strong>{' '}
        places
      </span>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  displayedPerPage: PropTypes.number.isRequired,
  linkPartial: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;

import React from "react";
import { Link } from "react-router-dom";

function Direction(props) {
    const {prevPage, nextPage} = props;
  return (
    <div style={style.nav}>
      <nav>
        {prevPage && (
          <li>
            <Link to={prevPage} className="nav-link">
              Bài trước
            </Link>
          </li>
        )}
        <li>
          <Link to={nextPage} className="nav-link">
            Bài tiếp theo
          </Link>
        </li>
      </nav>
    </div>
  );
}

const style = {
    nav: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }
};

export default Direction;

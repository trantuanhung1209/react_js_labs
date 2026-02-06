import { Link } from "react-router-dom";

function Exercise1() {

  return (
    <>
        <h2>Review useState Hook</h2>
        <nav>
            <ul>
                <li>
                    <Link to="/use-state">
                        Go to Exercise 1 - useState Hook
                    </Link>
                </li>
                <li>
                    <Link to="/use-effect">
                        Go to Exercise 1 - useEffect Hook
                    </Link>
                </li>
                <li>
                    <Link to="/use-reducer">
                        Go to Exercise 1 - useReducer Hook
                    </Link>
                </li>
                <li>
                    <Link to="/use-ref">
                        Go to Exercise 1 - useRef Hook
                    </Link>
                </li>
                <li>
                    <Link to="/use-memo">
                        Go to Exercise 1 - useMemo Hook
                    </Link>
                </li>
                <li>
                    <Link to="/use-callback">
                        Go to Exercise 1 - useCallback Hook
                    </Link>
                </li>
                <li>
                    <Link to="/memo">
                        Go to Exercise 1 - React.memo
                    </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Exercise1
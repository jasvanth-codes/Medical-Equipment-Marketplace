import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb() {

  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="breadcrumb">

      <Link to="/">Home</Link>

      {pathnames.map((value, index) => {

        const to =
          "/" + pathnames.slice(0, index + 1).join("/");

        return (
          <span key={to}>
            {" / "}
            <Link to={to}>
              {value.charAt(0).toUpperCase() +
                value.slice(1)}
            </Link>
          </span>
        );

      })}

    </div>
  );
}

export default Breadcrumb;
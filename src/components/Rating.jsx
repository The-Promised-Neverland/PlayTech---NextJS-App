import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <>
      <div className="rating">
        <span>
          {value >= 1 ? (
            <FaStar style={{ color: "black" }} />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt style={{ color: "black" }} />
          ) : (
            <FaRegStar style={{ color: "black" }} />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <FaStar style={{ color: "black" }} />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt style={{ color: "black" }} />
          ) : (
            <FaRegStar style={{ color: "black" }} />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <FaStar style={{ color: "black" }} />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt style={{ color: "black" }} />
          ) : (
            <FaRegStar style={{ color: "black" }} />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <FaStar style={{ color: "black" }} />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt style={{ color: "black" }} />
          ) : (
            <FaRegStar style={{ color: "black" }} />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <FaStar style={{ color: "black" }} />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt style={{ color: "black" }} />
          ) : (
            <FaRegStar style={{ color: "black" }} />
          )}
        </span>
        {/*text && text meansn if theres text it will show text else will show null*/}
      </div>
      {text && <span className="rating-text">{text}</span>}
    </>
  );
};

export default Rating;

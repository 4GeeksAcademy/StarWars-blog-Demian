import PropTypes from "prop-types";
import ItemCard from "./ItemCard";

export const CategoryRow = ({ title, items }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-3">{title}</h3>

      <div
        className="d-flex flex-nowrap overflow-auto"
        style={{ gap: "1rem" }}
      >
        {items.map((item) => (
          <div key={item.uid} className="flex-shrink-0">
            <ItemCard
              name={item.name}
              uid={item.uid}
              category={title.toLowerCase()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

CategoryRow.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};


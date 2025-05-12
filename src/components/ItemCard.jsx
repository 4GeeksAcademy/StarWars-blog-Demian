import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ItemCard = ({ name, uid, category }) => {
  const { dispatch, store } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    image: "",
    properties: {},
    category: "",
  });

  const uniqueId = `${category}/${uid}`;
  const isFavorite = store.favorites.some(item => item._id === uniqueId);

  const handleLearnMore = async () => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${category}/${uid}`);
      const data = await res.json();

      const properties = data.result.properties || {};
      const rawDescription = data.result.description || "";

      const defaultDescriptions = [
        "A person within the Star Wars universe",
        "A planet.",
        "A species within the Star Wars universe",
        "A starship",
        "A vehicle"
      ];

      const description =
        category === "films"
          ? properties.opening_crawl
          : defaultDescriptions.includes(rawDescription)
            ? ""
            : rawDescription;

      setModalData({
        title: properties.name || properties.title || "No title",
        description,
        image: "https://placehold.jp/400x400.png",
        properties,
        category,
      });

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "remove_favorite", payload: { _id: uniqueId } });
    } else {
      dispatch({
        type: "add_favorite",
        payload: {
          name,
          category,
          uid,
          _id: `${category}/${uid}`,
        }
      });
    }
  };

  return (
    <>
      <div className="card h-100" style={{ width: "16rem" }}>
        <img
          src="https://placehold.jp/150x150.png"
          className="card-img-top"
          alt={name}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{name}</h5>

          <div className="mt-auto d-flex justify-content-between">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handleLearnMore}
            >
              Learn more...
            </button>
            <button
              className={`btn btn-outline-warning btn-sm ${isFavorite ? "text-danger" : ""}`}
              onClick={toggleFavorite}
            >
              <i className={`fas fa-heart ${isFavorite ? "text-danger" : ""}`}></i>
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalData.title}
        description={modalData.description}
        image={modalData.image}
        properties={modalData.properties}
        category={modalData.category}
      />
    </>
  );
};

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  category: PropTypes.string,
};

export default ItemCard;

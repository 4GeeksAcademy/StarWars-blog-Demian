import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Modal from "./Modal";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    image: "",
    properties: {},
    category: "",
    _id: null,
  });
  const dropdownRef = useRef();

  const toggleFavorites = () => setShowFavorites(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowFavorites(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemove = (id) => {
    dispatch({ type: "remove_favorite", payload: { _id: id } });
};

  const handleOpenModal = async (category, uid) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${category}/${uid}`);
      const data = await res.json();
      const properties = data.result.properties || {};
      const rawDescription = data.result.description || "";
      const _id = `${category}/${uid}`;

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
        _id
      });

      setShowModal(true);
      setShowFavorites(false);
    } catch (error) {
      console.error("Error loading details:", error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light position-relative">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Star Wars Data Bank</span>
        </Link>

        <div className="position-relative" ref={dropdownRef}>
          <button className="btn btn-outline-primary" onClick={toggleFavorites}>
            Favorites
          </button>

          {showFavorites && (
            <div
              className="dropdown-menu show p-2"
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                minWidth: "250px",
                zIndex: 1000,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
              }}
            >
              {store.favorites.length === 0 ? (
                <div className="text-muted px-2">No favorites yet</div>
              ) : (
                store.favorites.map((fav) => (
                  <div
                    key={`${fav.category}/${fav.uid}`}
                    className="d-flex justify-content-between align-items-center px-2 py-1"
                  >
                    <span
                      className="text-primary"
                      role="button"
                      onClick={() => handleOpenModal(fav.category, fav.uid)}
                    >
                      {fav.name}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(`${fav.category}/${fav.uid}`)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
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
    </nav>
  );
};

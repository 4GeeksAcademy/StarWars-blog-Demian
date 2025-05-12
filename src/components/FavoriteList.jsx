import useGlobalReducer from "../hooks/useGlobalReducer";

const FavoriteList = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (_id) => {
    dispatch({ type: "remove_favorite", payload: { _id } });
  };
  console.log(store.favorites);
  return (
    <div className="accordion" id="accordionFavorites">
      {store.favorites.map((favorite) => (
        <div className="card" key={favorite._id}>
          <div className="card-header" id={`heading-${favorite._id}`}>
            <h5 className="mb-0 d-flex justify-content-between align-items-center">
              <button
                className="btn btn-link text-start"
                type="button"
                data-toggle="collapse"
                data-target={`#collapse-${favorite._id}`}
                aria-expanded="false"
                aria-controls={`collapse-${favorite._id}`}
              >
                {favorite.name}
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleRemoveFavorite(favorite._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </h5>
          </div>

          <div
            id={`collapse-${favorite._id}`}
            className="collapse"
            aria-labelledby={`heading-${favorite._id}`}
            data-parent="#accordionFavorites"
          >
            <div className="card-body">
              <img
                src="https://placehold.jp/100x100.png"
                alt={favorite.name}
                className="img-fluid mb-2"
              />
              <p>UID: {favorite.uid}</p>
              <p>Category: {favorite.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;

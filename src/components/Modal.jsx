import PropTypes from "prop-types";

const Modal = ({ show, onClose, title, description, image, properties, category }) => {
  if (!show) return null;

  const cleanDescription = (description) => {
    const defaultDescriptions = [
      "A person within the Star Wars universe",
      "A planet.",
      "A species within the Star Wars universe",
      "A starship",
      "A vehicle"
    ];
    return defaultDescriptions.includes(description) ? "Description not available." : description;
  };

  const cleanTitle = (title) => {
    const defaults = [
      "A person within the Star Wars universe",
      "A planet.",
      "A species within the Star Wars universe",
      "A starship",
      "A vehicle"
    ];
    return defaults.includes(title) ? "No title available" : title;
  };

  const cleanedDescription = cleanDescription(description);
  const cleanedTitle = cleanTitle(title);

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{cleanedTitle}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-3 d-flex align-items-center justify-content-center">
                <img
                  src={image}
                  alt={cleanedTitle}
                  className="img-fluid"
                  style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
                />
              </div>
              <div className="col-12 col-md-6">
                <p>{cleanedDescription}</p>
                <ul>
                  {category === "films" && (
                    <>
                      <li><strong>Release Date:</strong> {properties.release_date}</li>
                      <li><strong>Director:</strong> {properties.director}</li>
                      <li><strong>Producer:</strong> {properties.producer}</li>
                    </>
                  )}
                  {category === "people" && (
                    <>
                      <li><strong>Gender:</strong> {properties.gender}</li>
                      <li><strong>Skin Color:</strong> {properties.skin_color}</li>
                      <li><strong>Hair Color:</strong> {properties.hair_color}</li>
                      <li><strong>Height:</strong> {properties.height}</li>
                      <li><strong>Eye Color:</strong> {properties.eye_color}</li>
                      <li><strong>Mass:</strong> {properties.mass}</li>
                      <li><strong>Homeworld:</strong> {properties.homeworld}</li>
                      <li><strong>Birth Year:</strong> {properties.birth_year}</li>
                    </>
                  )}
                  {category === "planets" && (
                    <>
                      <li><strong>Climate:</strong> {properties.climate}</li>
                      <li><strong>Surface Water:</strong> {properties.surface_water}</li>
                      <li><strong>Name:</strong> {properties.name}</li>
                      <li><strong>Diameter:</strong> {properties.diameter}</li>
                      <li><strong>Rotation Period:</strong> {properties.rotation_period}</li>
                      <li><strong>Terrain:</strong> {properties.terrain}</li>
                      <li><strong>Gravity:</strong> {properties.gravity}</li>
                      <li><strong>Orbital Period:</strong> {properties.orbital_period}</li>
                      <li><strong>Population:</strong> {properties.population}</li>
                    </>
                  )}
                  {category === "species" && (
                    <>
                      <li><strong>Classification:</strong> {properties.classification}</li>
                      <li><strong>Designation:</strong> {properties.designation}</li>
                      <li><strong>Eye Colors:</strong> {properties.eye_colors}</li>
                      <li><strong>Skin Colors:</strong> {properties.skin_colors}</li>
                      <li><strong>Language:</strong> {properties.language}</li>
                      <li><strong>Hair Colors:</strong> {properties.hair_colors}</li>
                      <li><strong>Homeworld:</strong> {properties.homeworld}</li>
                      <li><strong>Average Lifespan:</strong> {properties.average_lifespan}</li>
                      <li><strong>Average Height:</strong> {properties.average_height}</li>
                    </>
                  )}
                  {category === "starships" && (
                    <>
                      <li><strong>Consumables:</strong> {properties.consumables}</li>
                      <li><strong>Name:</strong> {properties.name}</li>
                      <li><strong>Cargo Capacity:</strong> {properties.cargo_capacity}</li>
                      <li><strong>Passengers:</strong> {properties.passengers}</li>
                      <li><strong>Max Atmospheric Speed:</strong> {properties.max_atmosphering_speed}</li>
                      <li><strong>Crew:</strong> {properties.crew}</li>
                      <li><strong>Length:</strong> {properties.length}</li>
                      <li><strong>Model:</strong> {properties.model}</li>
                      <li><strong>Cost in Credits:</strong> {properties.cost_in_credits}</li>
                      <li><strong>Manufacturer:</strong> {properties.manufacturer}</li>
                      <li><strong>MGLT:</strong> {properties.MGLT}</li>
                      <li><strong>Starship Class:</strong> {properties.starship_class}</li>
                      <li><strong>Hyperdrive Rating:</strong> {properties.hyperdrive_rating}</li>
                    </>
                  )}
                  {category === "vehicles" && (
                    <>
                      <li><strong>Consumables:</strong> {properties.consumables}</li>
                      <li><strong>Name:</strong> {properties.name}</li>
                      <li><strong>Cargo Capacity:</strong> {properties.cargo_capacity}</li>
                      <li><strong>Passengers:</strong> {properties.passengers}</li>
                      <li><strong>Max Atmospheric Speed:</strong> {properties.max_atmosphering_speed}</li>
                      <li><strong>Crew:</strong> {properties.crew}</li>
                      <li><strong>Length:</strong> {properties.length}</li>
                      <li><strong>Model:</strong> {properties.model}</li>
                      <li><strong>Cost in Credits:</strong> {properties.cost_in_credits}</li>
                      <li><strong>Manufacturer:</strong> {properties.manufacturer}</li>
                      <li><strong>Vehicle Class:</strong> {properties.vehicle_class}</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  properties: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
};

export default Modal;

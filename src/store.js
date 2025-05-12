export const initialStore = () => {
  return {
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_categories':
      return {
        ...store,
        ...action.payload
      };
    case 'load_films':
      return { ...store, films: action.payload };

    case 'load_people':
      return { ...store, people: action.payload };

    case 'load_planets':
      return { ...store, planets: action.payload };

    case 'load_species':
      return { ...store, species: action.payload };

    case 'load_starships':
      return { ...store, starships: action.payload };

    case 'load_vehicles':
      return { ...store, vehicles: action.payload };

    case 'add_favorite':
      return { ...store, favorites: [...store.favorites, action.payload] };

    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(item => item._id !== action.payload._id)
      };

    default:
      throw Error('Unknown action.');
  }
}

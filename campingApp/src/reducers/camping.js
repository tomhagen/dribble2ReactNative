// Action
const SET_CAMPING = 'SET_CAMPING';
const SET_LOCATION = 'SET_LOCATION';
const SET_LOADING = 'SET_LOADING';
const SET_FILTER = 'SET_FILTER';

// Reducer
const initialState = {
  camping: [
    {
      id: 1,
      type: 'rv',
      name: 'Camping Paradise',
      description: 'Popular spot for trekkers.',
      rating: 4.9,
      distance: 2.9,
      price: 'Free',
      image:
        'https://images.unsplash.com/photo-1525811902-f2342640856e?fit=crop&w=900&h=600&q=130',
      latlng: {
        latitude: 37.79335,
        longitude: -122.4424,
      },
    },
    {
      id: 2,
      type: 'tenting',
      name: 'Lake Florida',
      description: 'This is for all sunset lovers.',
      rating: 4.9,
      distance: 2.9,
      price: 'Free',
      image:
        'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?fit=crop&w=900&h=600&q=130',
      latlng: {
        latitude: 37.78865,
        longitude: -122.4324,
      },
    },
    {
      id: 3,
      type: 'rv',
      name: 'Camping Paradise 2',
      description: 'Popular spot for trekkers.',
      rating: 4.9,
      distance: 2.9,
      price: 'Free',
      image:
        'https://images.unsplash.com/photo-1525811902-f2342640856e?fit=crop&w=900&h=600&q=130',
      latlng: {
        latitude: 37.79335,
        longitude: -122.4224,
      },
    },
    {
      id: 4,
      type: 'rv',
      name: 'Camping Paradise 3',
      description: 'Popular spot for trekkers.',
      rating: 4.9,
      distance: 2.9,
      price: 'Free',
      image:
        'https://images.unsplash.com/photo-1525811902-f2342640856e?fit=crop&w=900&h=600&q=130',
      latlng: {
        latitude: 37.78495,
        longitude: -122.4624,
      },
    },
    {
      id: 5,
      type: 'tenting',
      name: 'Lake Florida 2',
      description: 'This is for all sunset lovers.',
      rating: 4.9,
      distance: 2.9,
      price: 'Free',
      image:
        'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?fit=crop&w=900&h=600&q=130',
      latlng: {
        latitude: 37.79865,
        longitude: -122.4524,
      },
    },
  ],
  location: {
    latitude: 37.78035,
    longitude: -122.4394,
  },
  filter: {
    sort: 'distance',
    type: 'all',
    price: 'free',
    option_full: true,
    option_rated: true,
    option_free: false,
  },
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPING:
      return {...state, camping: action.payload};

    case SET_LOCATION:
      return {...state, location: action.payload};

    case SET_LOADING:
      return {...state, loading: action.payload};

    case SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

// Actions
export const setCamping = (payload) => {
  return {
    type: SET_CAMPING,
    payload,
  };
};

export const setLocation = (payload) => {
  return {
    type: SET_LOCATION,
    payload,
  };
};

export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};
export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

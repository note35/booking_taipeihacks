import { combineReducers } from 'redux';
import { 
  RENAME_PLACES, 
  UPDATE_FB_LOGIN_STATUS, 
  UPDATE_TAGGED_PLACES,
  SET_CHARTFILTER,
  UPDATE_CHART_DATA,
  SET_PHOTOFILTER,
  SET_COMPAREFILTER,
} from '../actions'

const initState = {
  data: [],
  isLoading: true,
}

const taggedPlaces = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_TAGGED_PLACES:
      return { 
        data: [...state.data, ...action.places.data],
        isLoading: false,
      };
    default:
      return state;
  }
}

const FB = ( state = {}, action) => {
  switch (action.type) {
    case UPDATE_FB_LOGIN_STATUS:
      return { ...state, loginStatue: action.status };
    default:
      return state;
  }
}

const intitCompareFilter = {
    cityA: 'Taipei',
    cityB: 'Amsterdam',
    valueA: 'wonderful',
    valueB: 'wonderful',
  };
const CompareFilter = ( state = intitCompareFilter, action ) => {
  switch (action.type) {
    case SET_COMPAREFILTER:
      let filter = action.filter;
      return { ...state, ...filter };
    default:
      return state;
  }
}

const intitChartFilter = {
  score: 'wonderful',
  city: 'Taipei',
}

const ChartFilter = ( state = intitChartFilter, action ) => {
  switch (action.type) {
    case SET_CHARTFILTER:
      return action.filter;
    default:
      return state;
  }
}

const intitPhotoFilter = {
  score: 'wonderful',
  city: 'Taipei',
}

const PhotoFilter = ( state = intitPhotoFilter, action ) => {
  switch (action.type) {
    case SET_PHOTOFILTER:
      return action.filter;
    default:
      return state;
  }
}

const initChartData = {
  Taipei: {
    wonderful: {
      img_urls: [],
      main_color: [],
    },
    very_good: {
      img_urls: [],
      main_color: [],
    },
    good: {
      img_urls: [],
      main_color: [],
    }, 
    pleasant: {
      img_urls: [],
      main_color: [],
    },
    no_rating: {
      img_urls: [],
      main_color: [],
    },
  },
  Amsterdam: {
    wonderful: {
      img_urls: [],
      main_color: [],
    },
    very_good: {
      img_urls: [],
      main_color: [],
    },
    good: {
      img_urls: [],
      main_color: [],
    }, 
    pleasant: {
      img_urls: [],
      main_color: [],
    },
    no_rating: {
      img_urls: [],
      main_color: [],
    },
  },
  Wakayama: {
    wonderful: {
      img_urls: [],
      main_color: [],
    },
    very_good: {
      img_urls: [],
      main_color: [],
    },
    good: {
      img_urls: [],
      main_color: [],
    }, 
    pleasant: {
      img_urls: [],
      main_color: [],
    },
    no_rating: {
      img_urls: [],
      main_color: [],
    },
  },
  Tainan: {
    wonderful: {
      img_urls: [],
      main_color: [],
    },
    very_good: {
      img_urls: [],
      main_color: [],
    },
    good: {
      img_urls: [],
      main_color: [],
    }, 
    pleasant: {
      img_urls: [],
      main_color: [],
    },
    no_rating: {
      img_urls: [],
      main_color: [],
    },
  },
  Hakodate: {
    wonderful: {
      img_urls: [],
      main_color: [],
    },
    very_good: {
      img_urls: [],
      main_color: [],
    },
    good: {
      img_urls: [],
      main_color: [],
    }, 
    pleasant: {
      img_urls: [],
      main_color: [],
    },
    no_rating: {
      img_urls: [],
      main_color: [],
    },
  },
}

const ChartData = ( state = initChartData, action ) => {
  switch (action.type) {
    case UPDATE_CHART_DATA:
      return action.chartData;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  ChartFilter,
  ChartData,
  PhotoFilter,
  CompareFilter,
})

export default rootReducer
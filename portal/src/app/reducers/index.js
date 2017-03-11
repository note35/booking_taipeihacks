import { combineReducers } from 'redux';
import { 
  RENAME_PLACES, 
  UPDATE_FB_LOGIN_STATUS, 
  UPDATE_TAGGED_PLACES,
  SET_CHARTFILTER,
  UPDATE_CHART_DATA,
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

const intitChartFilter = {
  score: 'wonderful',
}

const ChartFilter = ( state = intitChartFilter, action ) => {
  switch (action.type) {
    case SET_CHARTFILTER:
      return action.filter;
    default:
      return state;
  }
}

const initChartData = {

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
})

export default rootReducer
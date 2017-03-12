import 'whatwg-fetch';

// fetch('http://localhost:5000/evaluation_statistics/Taipei')
//   .then(function(response) {
//     return response.json()
//   }).then(function(json) {
//     console.log('parsed json', json)
//   }).catch(function(ex) {
//     console.log('parsing failed', ex)
//   })

import { put, fork, takeEvery, call } from 'redux-saga/effects';

// import loadFBSDK from '../lib/FB';

import { 
  updateFBLoginStatus, 
  updateTaggedPlaces, 
  fbLogin, 
  fetchTaggedPlaces, 
  fetchChartData, 
  updateChartData 
} from 'actions';

const chartData = {
  wonderful: {
    'main_color': [ 
      { 
        name: 'Oranges',
        main_color_scale: 50,
        main_color_orig: 50, 
        sub_color:[
          {
            name: 'OrangeRed',
            main_color_scale: 0,
            main_color_orig: 0,
            hex: '#ffff00',
          },
        ]
      },
      { 
        name: 'Blue',
        main_color_scale: 30,
        main_color_orig: 30, 
        sub_color:[
          {
            name: 'OrangeRed',
            main_color_scale: 0,
            main_color_orig: 0,
            hex: '#ffff00',
          },
        ]
      },
      { 
        name: 'Yellow',
        main_color_scale: 20,
        main_color_orig: 20, 
        sub_color:[
          {
            name: 'OrangeRed',
            main_color_scale: 0,
            main_color_orig: 0,
            hex: '#ffff00',
          },
        ]
      }
    ]
  },
  very_good: {
    'main_color': [ 
      { 
        name: 'Red',
        main_color_scale: 50,
        main_color_orig: 50, 
        sub_color:[
          {
            name: 'OrangeRed',
            main_color_scale: 0,
            main_color_orig: 0,
            hex: '#ffff00',
          },
        ]
      },
      { 
        name: 'Green',
        main_color_scale: 30,
        main_color_orig: 30, 
        sub_color:[
          {
            name: 'OrangeRed',
            main_color_scale: 0,
            main_color_orig: 0,
            hex: '#ffff00',
          },
        ]
      },
      { 
        name: 'Black',
        main_color_scale: 20,
        main_color_orig: 20, 
        sub_color:[
          {
            name: 'OrangeRed',
            main_color_scale: 0,
            main_color_orig: 0,
            hex: '#ffff00',
          },
        ]
      }
    ]
  }
}

function getChartData( city ) {
  const query = `http://localhost:5000/evaluation_statistics/${city}`;
  return fetch(query).then(res => res.json());
}

export function* fetchChartDataTask() {
  const chartDataTaipei = yield call(getChartData.bind(this, 'Taipei'));
  const chartDataAmsterdam = yield call(getChartData.bind(this, 'Amsterdam'));

  const chartData = { Taipei: chartDataTaipei, Amsterdam: chartDataAmsterdam };
  console.log(chartData);
  yield put(updateChartData(chartData));
}


// Saga event
export function* fetchChartDataSaga() {
  yield takeEvery('FETCH_CHART_DATA', fetchChartDataTask)
}

export default function* rootSaga() {
  yield [
    fork(fetchChartDataSaga),
  ]
}
import 'whatwg-fetch';

fetch('http://localhost:5000/hotel_list/Taipei')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

import { put, fork, takeEvery } from 'redux-saga/effects';

import loadFBSDK from '../lib/FB';

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

export function* fetchChartDataTask() {
  // const status = yield SDK.getLoginStatusAsync();
  yield put(updateChartData(chartData));
}

export function* fbLoginTask() {
  const SDK = yield loadFBSDK();
  const response = yield SDK.loginAsync();
  yield put(updateFBLoginStatus(response));

  if (response.status === 'connected') {
    yield put(fetchTaggedPlaces());
  }
}

export function* fetchFBLoginStatus() {
  const SDK = yield loadFBSDK();
  const status = yield SDK.getLoginStatusAsync();
  yield put(updateFBLoginStatus(status));
}

// export function* fetchPagingTaggedPlaces(url) {
//   const places = yield SDK.apiAsync('/me/tagged_places', 'GET', {});
//   yield put(updateTaggedPlaces(places));
// }

export function* fetchTaggedPlacesTask() {
  let places;
  const SDK = yield loadFBSDK();
  const response = yield SDK.getLoginStatusAsync();
  
  yield put(updateFBLoginStatus(response));

  if (response.status === 'connected') {
    places = yield SDK.apiAsync('/me/tagged_places', 'GET', {});

    yield put(updateTaggedPlaces(places));

    // get rest of places
    while( places.paging.next ){
      places = yield SDK.apiAsync(places.paging.next, 'GET', {});
      yield put(updateTaggedPlaces(places));
    }

  }else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    yield put(fbLogin());

  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    yield put(fbLogin());
  }
}


// Saga event
export function* fetchChartDataSaga() {
  yield takeEvery('FETCH_CHART_DATA', fetchChartDataTask)
}

export function* fbLoginSaga() {
  yield takeEvery('FB_LOGIN', fbLoginTask)
}

export function* fetchFBLoginStatusSaga() {
  yield takeEvery('FETCH_FB_LOGIN_STATUS', fetchFBLoginStatus)
}


export function* fetchTaggedPlacesSaga() {
  yield takeEvery('FETCH_TAGGED_PLACES', fetchTaggedPlacesTask)
}

export default function* rootSaga() {
  yield [
    // helloSaga(),
    // fetchFBLoginStatusSaga(),
    // fork(fbLoginSaga),
    // fork(fetchTaggedPlacesSaga),
    fork(fetchChartDataSaga),
  ]
}
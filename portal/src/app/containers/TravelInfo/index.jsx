import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from 'components/Layout';

import ChartView from 'containers/ChartView';
import ChartFilter from 'containers/ChartFilter';

import css from './TravelInfo.css';

const { Content, Header, Row } = Layout;

const columns = [{
  title: 'Place',
  key: 'place',
}, {
  title: 'Date',
  key: 'date',
}];
//http://maps.google.com/maps?q=24.197611,120.780512
const detailColumns = [
  {
    title: 'country',
    key: 'country',
  }, 
  {
    title: 'city',
    key: 'city',
  },
  {
    title: 'street',
    key: 'street',
  },
];

class TravelInfo extends Component {

  render() {
    // const { taggedPlaces } = this.props

    // // console.table(taggedPlaces)

    // const places = taggedPlaces.data.map((item, index) => {
    //   const date = new Date(item.created_time);
    //   return {
    //     index: index,
    //     place: item.place.name,
    //     date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    //     country: item.place.location.country,
    //     city: item.place.location.city,
    //     street: item.place.location.street,
    //     latitude: item.place.location.latitude,
    //     longitude: item.place.location.longitude,
    //   }
    // })

    return (
      <Row>
        <div className={css.Map}>
          <ChartView />
        </div>
        <div className={css.Table}>
          <ChartFilter />
        </div>
      </Row>  
    );
  }
}

function mapStateToProps({ taggedPlaces }) {
  return {
    taggedPlaces,
  };
}

export default connect(
  mapStateToProps,
)(TravelInfo);
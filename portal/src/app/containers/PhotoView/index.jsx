import React, { Component } from 'react';

// UI
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

// redux
import { connect } from 'react-redux';
import { setPhotoFilter } from 'actions';

// import MainColorPie from 'components/Chart/MainColorPie';
// import SubColorBar from 'components/Chart/SubColorBar';

import css from './PhotoView.css'

class PhotoView extends Component {

  state = {};

  renderPhoto = (photos) => {
    const cards = photos.map( (photo) => {
      return ( 
        <Card className={css.Card}>
          <CardTitle
            title={photo['hotel_name']}
            subtitle={`Score: ${photo.score}`}
          />
          <CardMedia
            aspectRatio="wide"
            image={photo.url}
          />
        </Card>
      )
    })
    return cards;
  }

  render() {
    console.log(this.props)
    const { PhotoFilter, ChartData } = this.props; 
    let source = [];
    if(ChartData[PhotoFilter.city])
      source = ChartData[PhotoFilter.city][PhotoFilter.score]

    // console.log(source['img_urls']);

    return (
      <div className={css.container}>
        {this.renderPhoto(source['img_urls'])}
      </div>
    );
  }
}

function mapStateToProps({ChartData, PhotoFilter}) {
  return {
    ChartData,
    PhotoFilter,
  };
}

export default connect(
  mapStateToProps, {
    setPhotoFilter,
  }
)(PhotoView)
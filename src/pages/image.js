'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from '../components/imgContext';

class FaceImage extends React.Component {
  constructor () {
    super();

    this.state = {
      faceBoxes: []
    };

    this.faceDetector = new window.FaceDetector();
  }

  drawFaces (faces, imgObj) {
    let facesList = [];
    faces.forEach((face) => {
      const {width, height, left, top} = face.boundingBox,
            {top: posY, left: posX} = imgObj.getBoundingClientRect();

      let landmarkList = [], faceBox;
      face.landmarks.forEach((part) => {
        const {x, y} = part.locations[0],
              facePart = React.createElement('div', {
                style: {
                  left: `calc(${x - left}px - 15%)`,
                  top: `calc(${y - top}px - 15%)`
                },
                className: part.type
              }, null);
        landmarkList.push(facePart);
      });

      faceBox = React.createElement('div', {
        style: {
          left: `${left + posX}px`,
          width: `${width}px`,
          height: `${height}px`,
          top: `${top + posY}px`
        },
        className: 'face'
      }, landmarkList);

      facesList.push(faceBox);
    });
    return facesList;
  }

  detectFaces (image) {
    this.faceDetector.detect(image)
      .then((faces) => {
        this.setState({
          faceBoxes: faces
        });
      })
      .catch((err) => {
        console.log('detection error', err);
      });
  }

  componentDidMount () {
    setTimeout(() => {
      this.detectFaces(this.image);
    }, 100);
  }

  backHandler = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div className="face-image-container">
        <div className="back-btn btn" onClick={this.backHandler}>Go Back</div>
        <div id="imgWrapper" className="col s12 input-image">
          <Consumer>
            {(context) => {
                return <img id="displayImg" 
                        ref={(ref) => this.image = ref}
                        src={context.image}
                        className="display-img" />
            }}
          </Consumer>
          <div className="face-boxes">
            {this.drawFaces(this.state.faceBoxes, this.image)}
          </div>
        </div>
      </div>
    );
  }
}

FaceImage.displayName = 'FaceImage';

export default withRouter(FaceImage);

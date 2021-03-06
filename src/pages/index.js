'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from '../components/imgContext';

class Home extends React.Component {

  uploadImage(files) {
    return new Promise((resolve, reject) => {
      if (files && files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          resolve(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        reject('Please try uploading a supported image file');
      }
    });
  }

  processImage = (event, context) => {
    this.uploadImage(event.target.files)
      .then((imgObj) => {
        context.setImage(imgObj);
        this.props.history.push('/image');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCamera = () => {
    this.props.history.push('/camera');
  }

  render () {
    return (
      <div className="face-app-container">
        <div className="row center">
          <div className="col s12">
            <h4 className="light message-box">An Experiment on Google Chrome's face detector API </h4>
          </div>
        </div>
        <div className="row center app-section">
          <div className="message">Just try with some photos (with faces, obviously), <br/> the app would identify the faces and draws boxes over it</div>
          <div className="col s12 file-field input-field">
            <div className="btn upload-btn">
              <span>Try with Image</span>
              <Consumer>
                {(context) => {
                  return <input type="file" required id="file_input"
                                onChange={(event) => {this.processImage(event, context)}}
                                accept=".jpg,.jpeg,.png,.gif"
                                ref={(ref) => this.fileUpload = ref} />;
                }}
              </Consumer>
            </div>
          </div>
          <div className="col s12 message">
              Or try with your own face, live in the camera ;)
          </div>
          <div className="col s12 input-field">
            <button className="waves-effect upload-btn waves-light btn" id="cam_btn" onClick={this.handleCamera} >Try Live Camera</button>
            <div className="message small">(Would require permission for camera, dont worry we dont record anything!)</div>
          </div>
        </div>
      </div>
    );
  }
}

Home.displayName = 'Home';

export default withRouter(Home);

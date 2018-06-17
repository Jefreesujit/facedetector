import React from "react";
import ReactDOM from 'react-dom';

class FaceCamera extends React.Component {
  constructor () {
    super();

    this.faceDetector = new window.FaceDetector();
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  componentDidMount() {
    if (!navigator.getUserMedia) {
      alert("No webcam!");
      return;
    }
    this.detectFaces(this.video);
  }

  drawFaces (faces, videoObj) {
    let faceboxRef = this.facebox;
    faces.forEach(face => {
      const { width, height, top, left } = face.boundingBox,
            {top: posY, left: posX} = videoObj.getBoundingClientRect(),
            faceBox = ReactDOM.findDOMNode(faceboxRef);

      faceBox.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        top: ${top}px;
        left: ${left + posX}px;
      `;

      face.landmarks.forEach((landmark, index) => {
        const { x, y } = landmark.locations[0],
              keyName = `${landmark.type}${index}`;

        const div = ReactDOM.findDOMNode(this[keyName]);
        div.style.cssText = `
          width: 35%;
          height: 35%;
          top: calc(${y - top}px - 15%);
          left: calc(${x - left}px - 15%);
        `;
      });
    });
  }

  detectFaces (video) {
    navigator.getUserMedia(
      { audio: false, video: { width: 1280, height: 720 } },
      stream => {
        video.srcObject = stream;
        setTimeout(() => {
          this.inverval = setInterval(async () => {
            const faces = await this.faceDetector.detect(video);
            await this.drawFaces(faces, video);
          }, 150);
        }, 500);
      },
      err => {}
    );
  }

  render() {
    return (
      <div id="wrapper" className="face-camera" style={{ position: "relative" }}>
        <video ref={(ref)=> {this.video = ref}} autoPlay />
        <div ref={(ref)=> {this.facebox = ref}} className="face" >
          <div ref={(ref)=> {this.eye0 = ref}} className="eye"/>
          <div ref={(ref)=> {this.eye1 = ref}} className="eye"/>
          <div ref={(ref)=> {this.mouth2 = ref}} className="mouth"/>
        </div>
      </div>
    );
  }
}

FaceCamera.displayName = 'FaceCamera';

export default FaceCamera;

import React from "react";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class FaceCamera extends React.Component {
  _videoRef = video => {
    this.video = video;
  };

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  componentDidMount() {
    if (!navigator.getUserMedia) {
      alert("No webcam!");
      return;
    }

    if (typeof window.FaceDetector === "undefined") {
      alert("No face detection!");
      return;
    }

    const video = this.video;
    const faceDetector = new window.FaceDetector();

    navigator.getUserMedia(
      { audio: false, video: { width: 1280, height: 720 } },
      stream => {
        video.srcObject = stream;
        setTimeout(() => {
          this.inverval = setInterval(async () => {
            const faces = await faceDetector.detect(video);

            faces.forEach(face => {
              const { width, height, top, left } = face.boundingBox;

              const faceBox = document.getElementById("facebox");

              faceBox.style.cssText = `
                position: absolute;
                z-index: 2;
                width: ${width}px;
                height: ${height}px;
                top: ${top}px;
                left: ${left}px;
              `;

              face.landmarks.forEach((landmark, index) => {
                if (landmark.type !== "eye") {
                  return;
                }

                const { x, y } = landmark.locations[0];
                const div = document.getElementById(`eye-${index}`);
                div.style.cssText = `
                  z-index: 2;
                  width: 35%;
                  height: 35%;
                  position: absolute;
                  background-size: cover;
                  top: ${y - top - 50}px;
                  left: ${x - left - 50}px;
                  background-image: url('https://orig00.deviantart.net/39bb/f/2016/217/1/0/free_googly_eye_by_terrakatski-dacmqt2.png');
                `;
              });
            });
          }, 150);
        }, 500);
      },
      err => {}
    );
  }

  render() {
    return (
      <div id="wrapper" style={{ position: "relative" }}>
        <video ref={this._videoRef} autoPlay />
        <div id="facebox">
          <div id="eye-0" />
          <div id="eye-1" />
        </div>
      </div>
    );
  }
}

FaceCamera.displayName = 'FaceCamera';

export default FaceCamera;

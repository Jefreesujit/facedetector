const faceDetector = new window.FaceDetector(),
      imgWrapper = document.getElementById('imgWrapper');

function uploadImage(files) {
  return new Promise((resolve, reject) => {
    if (files && files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('displayImg').src = e.target.result;
        resolve(document.getElementById('displayImg'));
      };
      reader.readAsDataURL(files[0]);
    } else {
      reject('Please try uploading a supported image file');
    }
  });
}

function drawFaces (faces, imgObj) {
  console.log(faces);
  faces.forEach((face) => {
    const {width, height, left, top} = face.boundingBox,
          {top: posY, left: posX} = imgObj.getBoundingClientRect(),
          faceBox = document.createElement('div');
    faceBox.classList.add('face')
    faceBox.style.cssText = `
      left: ${left + posX}px;
      width: ${width}px;
      height: ${height}px;
      top: ${top + posY}px;
    `;

    face.landmarks.forEach((part) => {
      const {x, y} = part.location;
            facePart = document.createElement('div');
      facePart.classList.add(part.type);
      facePart.style.cssText = `
        left: calc(${x - left -50}px + 1.5em);
        width: 40%;
        height: 30%;
        top: calc(${y - top}px - 2em);
      `;
      faceBox.appendChild(facePart);
    })
    imgWrapper.appendChild(faceBox);
  });
  imgObj.scrollIntoView();
}

function detectFaces (imgObj) {
  faceDetector.detect(imgObj)
    .then((faces) => {
      drawFaces(faces, imgObj);
    })
    .catch((err) => {
      console.log('detection error', err);
    });
}

function clearDrawings () {
  while (imgWrapper.lastChild.id !== 'displayImg') {
    imgWrapper.removeChild(imgWrapper.lastChild);
  }
}

function processImage (event) {
  clearDrawings();
  uploadImage(event.target.files)
    .then((imgObj) => {
      console.log('resolved image obj', imgObj);
      detectFaces(imgObj);
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById('file_input').addEventListener('change', processImage);

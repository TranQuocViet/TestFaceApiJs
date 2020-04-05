const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

const constraints = {
  video: {
    facingMode: "user",
    width: 360,
    height: 480
  }
};

function startVideo() {
  navigator.mediaDevices.getUserMedia(constraints).
    then(stream => {
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      setTimeout(() => {
        video.srcObject = stream
      }, 3000)
    }).
    catch(error => alert(error))
}

const hasGetUserMedia = () => {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

video.addEventListener('play', async () => {
  // const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  // const intervalId = setInterval(async () => {
  //   const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  //   if (detections != [] && detections !== undefined && detections !== null) {
  //     console.log(detections)
  //   }
  // }, 100)
  // const canvas = faceapi.createCanvasFromMedia(video)
  // document.body.append(canvas)
  // const displaySize = { width: video.height, height: video.width }
  // faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    // const resizedDetections = faceapi.resizeResults(detections, displaySize)
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 300)
})
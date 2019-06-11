const circleRadius = 100;

let circleCoords = {
  red: null,
  green: null,
  blue: null
};

let inCircle = {
  red: false,
  green: false,
  blue: false
};

const circles = document.getElementsByClassName('vennCircle');

const vennContainer = document.getElementById('vennContainer');

Array.prototype.forEach.call(circles, (circle) => {
  console.log(circle.id);
  const boundingRect = circle.getBoundingClientRect();
  let width = boundingRect.right - boundingRect.left;
  let height = boundingRect.bottom - boundingRect.top;
  let x = boundingRect.left + width / 2;
  let y = boundingRect.top + height / 2;
  circleCoords[circle.id] = [x, y];
  console.log(circleCoords);
});

vennContainer.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  Object.keys(circleCoords).forEach((key) => {
    let circleCoord = circleCoords[key];

    let displacmentOnXAxis = Math.abs(circleCoord[0] - x);
    let displacmentOnYAxis = Math.abs(circleCoord[1] - y);
    let hypoteneuse = Math.sqrt(
      Math.pow(displacmentOnXAxis, 2) + Math.pow(displacmentOnYAxis, 2)
    );
    if (hypoteneuse <= circleRadius) {
      inCircle[key] = true;
    } else {
      inCircle[key] = false;
    }
  });
});


function step(timestamp) {
    Object.keys(inCircle).forEach((key) => {
        if(inCircle[key]){
            console.log(`You are in the ${key} circle`)
        }
      });
      window.requestAnimationFrame(step);
  }
  
  window.requestAnimationFrame(step);
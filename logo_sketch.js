var logoSketch = function (p) {
    let u;

    let t;
    let speed = 0.08;
    let acc_speed = 0.12;
    let b1, b2, c1, c2, c3;

    let sY;
    let sX;
    const Y_AXIS = 1;
    const X_AXIS = 2;


    p.setup = function () {
        // var myCanvas = createCanvas(windowWidth, windowHeight);
        p.createCanvas(100, 100);
        u = 65 * p.width / 600;
        sY = 75 * p.width / 600;
        sX = 45 * p.width / 600;
        // myCanvas.parent("logo_div");

        p.angleMode(p.RADIANS);
        t = p.PI / 2;
        b1 = p.color(54, 221, 137);
        b2 = p.color(21, 200, 163);

        c1 = p.color(54, 221, 137);
        c2 = p.color(21, 200, 163);
        c3 = p.color(163, 255, 237);

        //     c1 = color(255, 34, 31);
        //   c2 = color(255, 94, 91); 
        //   c3 = color(252, 170, 103);

        //   c1 = color(252, 186, 4);
        // c2 = color(255); 
        // c3 = color(252, 170, 103);


    }

    p.draw = function () {


        // setGradient(0, 0, width, height, b1, b2, X_AXIS);


        p.clear();
        // background(220);
        p.strokeCap(p.SQUARE);
        p.noFill();
        p.strokeWeight(1.5 * u);

        if (p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2) < p.width * 0.45) {
            // background(0);
            t += speed;
            if (t >= 2 * p.PI) {
                t = 0;
            }


        } else {
            if (t >= 0 && t <= 3 * p.PI / 2) {
                if (t > p.PI / 2)
                    t = p.max(p.PI / 2, t - acc_speed);
                else t = p.min(p.PI / 2, t + acc_speed);
            } else {
                if (t >= 2 * p.PI) {
                    t = t - 2 * p.PI;
                }
                if (t <= 3 * p.PI / 2) {
                    t = p.min(p.PI / 2, t + acc_speed);
                } else {
                    t = p.min(2 * p.PI, t + acc_speed);
                }
            }
        }


        //   fill(255,255,255,120*cos(PI-t));
        //   noStroke();
        //   circle(width/2, height/2, 600*cos(2*t));



        p.fill(b2);
        p.noStroke();
        p.circle(p.width / 2, p.height / 2, 5 + p.width * 0.90 + 0.05 * p.width * p.cos(t));

        p.fill(255);
        p.noStroke();
        p.circle(p.width / 2, p.height / 2, p.width * 0.90 + 0.05 * p.width * p.cos(t));


        p.stroke(c1);

        p.bezier(4 * u - u * p.cos(t) + sX, 1 * u + sY, 7 * u - u * p.cos(t) + sX, 1 * u + sY, 7 * u - u * p.cos(t) + sX, 5 * u + sY, 4 * u - u * p.cos(t) + sX, 5 * u + sY);

        p.stroke(c2);
        p.line(1 * u + sX, 6 * u + u * p.cos(t) + sY, 4 * u + sX, 2 * u + u * p.cos(t) + sY);

        p.stroke(c3);
        p.line(1 * u + u * p.cos(t) + sX, 3 * u + u * p.cos(t) + sY, 2 * u + u * p.cos(t) + sX + sY, 5 * u + u * p.cos(t) + sY);

    }


    p.setGradient = function (x, y, w, h, c1, c2, axis) {
        p.noFill();

        if (axis === Y_AXIS) {
            // Top to bottom gradient
            for (let i = y; i <= y + h; i++) {
                let inter = p.map(i, y, y + h, 0, 1);
                let c = p.lerpColor(c1, c2, inter);
                p.stroke(c);
                p.line(x, i, x + w, i);
            }
        } else if (axis === X_AXIS) {
            // Left to right gradient
            for (let i = x; i <= x + w; i++) {
                let inter = p.map(i, x, x + w, 0, 1);
                let c = p.lerpColor(c1, c2, inter);
                p.stroke(c);
                p.line(i, y, i, y + h);
            }
        }
    }

};


var myp5_2 = new p5(logoSketch, 'logo_div');


// function mouseClicked() {
//     print(t);
// }



// // Two ArrayLists to store the vertices for two shapes
// // This example assumes that each shape will have the same
// // number of vertices, i.e. the size of each ArrayList will be the same
// let circle = [];
// let square = [];

// // An ArrayList for a third set of vertices, the ones we will be drawing
// // in the window
// let morph = [];

// // This boolean variable will control if we are morphing to a circle or square
// let state = false;

// let r = 200;

// function setup() {
//   createCanvas(600, 600);

//   // Create a circle using vectors pointing from center
//   for (let angle = 0; angle < 360; angle += 5) {
//     // Note we are not starting from 0 in order to match the
//     // path of a circle.
//     let v = p5.Vector.fromAngle(radians(angle - 135));
//     v.mult(r);
//     circle.push(v);
//     // Let's fill out morph ArrayList with blank PVectors while we are at it
//     morph.push(createVector());
//   }

//   // A square is a bunch of vertices along straight lines
//   // Top of square
//   for (let x = -r/2; x < r/2; x += 10) {
//     square.push(createVector(x, -r/2));
//   }
//   // Right side
//   for (let y = -r/2; y < r/2; y += 10) {
//     square.push(createVector(r/2, y));
//   }
//   // Bottom
//   for (let x = r/2; x > -r/2; x -= 10) {
//     square.push(createVector(x, r/2));
//   }
//   // Left side
//   for (let y = r/2; y > -r/2; y -= 10) {
//     square.push(createVector(-r/2, y));
//   }
// }

// function draw() {
//   background(20);

//   // We will keep how far the vertices are from their target
//   let totalDistance = 0;

//   // Look at each vertex
//   for (let i = 0; i < circle.length; i++) {
//     let v1;
//     // Are we lerping to the circle or square?
//     if (state) {
//       v1 = circle[i];
//     } else {
//       v1 = square[i];
//     }
//     // Get the vertex we will draw
//     let v2 = morph[i];
//     // Lerp to the target
//     v2.lerp(v1, 0.1);
//     // Check how far we are from target
//     totalDistance += p5.Vector.dist(v1, v2);
//   }

//   // If all the vertices are close, switch shape
//   if (totalDistance < 0.1) {
//     state = !state;
//   }

//   // Draw relative to center
//   translate(width / 2, height / 2);
//   strokeWeight(4);
//   // Draw a polygon that makes up all the vertices
//   beginShape();
//   // noFill();
//   fill(255);
//   stroke(255);

//   morph.forEach(v => {
//     vertex(v.x, v.y);
//   });
//   endShape(CLOSE);
// }
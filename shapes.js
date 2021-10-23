var coordSketch = function (p) {
    let x, y;
    let follow = true;

    p.setup = function () {
        p.createCanvas(300, 200);
        x = 60;
        y = 40;
        p.textAlign(p.CENTER);

        p.frameRate(20);
    };

    p.draw = function () {
        p.background(255, 249, 249);

        p.drawGrid();
        if (follow) {
            x = p.mouseX;
            y = p.mouseY;
        }
        p.drawCoordinates(x, y);

    };

    p.drawGrid = function () {
        p.fill(229, 229, 229);
        p.rect(20, 20, p.width, p.height);
        p.fill(0);
        p.stroke(0);
        p.drawingContext.setLineDash([]);
        p.strokeWeight(2);
        p.line(20, 20, p.width, 20);
        p.line(20, 20, 20, p.height);

        p.circle(20, 20, 5);
        for (let i = 0; i < p.width / 3; i += 10) {
            p.noStroke();
            p.text(i, i * 3 + 10, 10);
            p.stroke(0);
            p.strokeWeight(2);
            if (i != 0)
                p.line(i * 3 + 10, 18, i * 3 + 10, 22);
        }


        for (let i = 10; i < p.height / 3; i += 10) {
            p.noStroke();
            p.text(i, 7, i * 3 + 10);
            p.stroke(0);
            p.strokeWeight(2);
            p.line(18, i * 3 + 10, 22, i * 3 + 10);
        }
    };

    p.drawCoordinates = function (xC, yC) {
        p.noStroke();
        p.text("(" + p.floor((xC - 10) / 3) + "," + p.floor((yC - 10) / 3) + ")", xC + 25, yC + 2);

        p.drawingContext.setLineDash([10, 5]);

        p.fill(153, 223, 174);
        p.stroke(153, 223, 174);
        p.line(22, yC, xC, yC);
        p.circle(20, yC, 5);

        p.fill(126, 187, 216);
        p.stroke(126, 187, 216);
        p.line(xC, 22, xC, yC);
        p.circle(xC, 20, 5);

        p.stroke(0);
        p.fill(0);
        p.circle(xC, yC, 5);
    };

    p.mouseClicked = function () {
        if (follow) {
            if (p.mouseY >= 0 && p.mouseY <= p.height && p.mouseX >= 0 && p.mouseX <= p.width) {
                x = p.mouseX;
                y = p.mouseY;
                follow = false;
                p.noLoop()
            }
        } else {
            if (p.mouseY >= 0 && p.mouseY <= p.height && p.mouseX >= 0 && p.mouseX <= p.width) {
                follow = true;
                p.loop();
            }
        }
    }
};

new p5(coordSketch, 'coord_div');

var rectSketch = function (p) {
    let xI, yI, wI, hI;

    p.setup = function () {
        p.createCanvas(100, 100);
    };

    p.draw = function () {
        p.background(204, 204, 204);
        xI = document.getElementById('xI').value;
        yI = document.getElementById('yI').value;
        wI = document.getElementById('wI').value;
        hI = document.getElementById('hI').value;

        p.rect(xI, yI, wI, hI);
    };
};

new p5(rectSketch, 'rect_div');


var ellipseSketch = function (p) {
    let xI, yI, wI, hI;

    p.setup = function () {
        p.createCanvas(100, 100);
    };

    p.draw = function () {
        p.background(204, 204, 204);
        xI = document.getElementById('xI_e').value;
        yI = document.getElementById('yI_e').value;
        wI = document.getElementById('wI_e').value;
        hI = document.getElementById('hI_e').value;

        p.ellipse(xI, yI, wI, hI);
    };
};

new p5(ellipseSketch, 'ellipse_div');





var LineSketch = function (p) {
    let xIL1, yIL1, xIL2, yIL2;

    p.setup = function () {
        p.createCanvas(100, 100);
    };

    p.draw = function () {
        p.background(204, 204, 204);
        xIL1 = document.getElementById('xIL1').value;
        yIL1 = document.getElementById('yIL1').value;
        xIL2 = document.getElementById('xIL2').value;
        yIL2 = document.getElementById('yIL2').value;

        p.line(xIL1, yIL1, xIL2, yIL2);
    };
};

new p5(LineSketch, 'line_div');





var TriangleSketch = function (p) {
    let xIT1, yIT1, xIT2, yIT2, xIT3, yIT3;

    p.setup = function () {
        p.createCanvas(100, 100);
    };

    p.draw = function () {
        p.background(204, 204, 204);
        xIT1 = parseInt(document.getElementById('xIT1').value, 10);
        yIT1 = parseInt(document.getElementById('yIT1').value, 10);
        xIT2 = parseInt(document.getElementById('xIT2').value, 10);
        yIT2 = parseInt(document.getElementById('yIT2').value, 10);
        xIT3 = parseInt(document.getElementById('xIT3').value, 10);
        yIT3 = parseInt(document.getElementById('yIT3').value, 10);

        p.triangle(xIT1, yIT1, xIT2, yIT2, xIT3, yIT3);
    };
};

new p5(TriangleSketch, 'triangle_div');
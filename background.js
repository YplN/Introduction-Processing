var backgroundRGBSketch = function (p) {
    let rI, gI, bI;

    p.setup = function () {
        p.createCanvas(100, 100);
        p.frameRate(5);
    };

    p.draw = function () {
        rI = document.getElementById('rIb').value;
        gI = document.getElementById('gIb').value;
        bI = document.getElementById('bIb').value;
        p.background(parseInt(rI, 10), parseInt(gI, 10), parseInt(bI, 10));

    };
};

new p5(backgroundRGBSketch, 'bckRGB_div');


var backgroundGraySketch = function (p) {
    let gIbG;

    p.setup = function () {
        p.createCanvas(100, 100);
        p.frameRate(5);
    };

    p.draw = function () {
        gIbG = document.getElementById('gIbG').value;
        p.background(parseInt(gIbG, 10));
    };
};


new p5(backgroundGraySketch, 'bckGray_div');
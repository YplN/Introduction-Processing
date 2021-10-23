let fwidth = 70;
let fheight = 20;
let fbradius = 9;
let WHITE = 0;
let RED = 1;
let GREEN = 2;
let BLUE = 3;


class Screen {
  constructor(FL, p) {
    this.p = p;
    this.FL = FL;
    this.cx = (0.83 * this.p.width - 15);
    this.cy = this.p.height / 2;
  }

  show() {
    this.p.noFill();
    this.p.stroke(255);
    this.p.strokeWeight(2);
    this.p.quad(this.p.width - 20, 20, 0.66 * this.p.width, 0.3 * this.p.height, 0.66 * this.p.width, 0.7 * this.p.height, this.p.width - 20, this.p.height - 20);

    let textRGB = "color(";

    this.p.blendMode(this.p.ADD);
    for (let i = 0; i < this.FL.length; i++) {
      const f = this.FL[i];
      this.p.fill(f.c);
      this.p.noStroke();
      this.p.angleMode(this.p.DEGREES)
      this.p.ellipse(this.cx + (this.FL.length - 1) * 5 * this.p.cos(-90 + i * 360 / this.FL.length), this.cy + (this.FL.length - 1) * 10 * this.p.sin(-90 + i * 360 / this.FL.length), this.p.height / 5, this.p.height / 3);
      textRGB += this.p.max(0, this.p.min(255, f.intensity)) + ",";
    }

    this.p.blendMode(this.p.BLEND);
    this.p.fill(255);

    this.p.textSize(20);
    this.p.textAlign(this.p.CENTER);
    this.p.text(textRGB.substr(0, textRGB.length - 1) + ");", this.p.width / 2, this.p.height - 10)
  }
}






class FlashLight {
  constructor(x, y, c, t, p) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.c = c;
    this.type = t;
    this.intensity = this.p.floor(this.p.random(100, 200));
    this.r = 0;
  }

  getPureColor() {
    let pureColor;

    switch (this.type) {
      case WHITE:
        pureColor = this.p.color(255);
        break;
      case RED:
        pureColor = this.p.color(255, 0, 0);
        break;
      case GREEN:
        pureColor = this.p.color(0, 255, 0);
        break;
      case BLUE:
        pureColor = this.p.color(0, 0, 255);
        break;
      default:
        //  
    }

    return pureColor;
  }

  isOnMouse() {
    if (this.p.abs(this.x - this.p.mouseX) < fwidth && this.p.abs(this.y - this.p.mouseY) < fheight) {
      return this.p.max(0, this.p.min(256, this.p.lerp(-5, 256, (this.p.mouseX - this.x + fwidth / 2) / fwidth)));
    } else {
      return false;
    }
  }

  update() {
    this.c = this.p.lerpColor(this.p.color(0), this.getPureColor(), this.intensity / 255);
  }


  show() {


    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.r);

    this.p.strokeWeight(1);
    this.p.stroke(150);
    this.p.fill(90);

    // Main Part of flashLight
    this.p.rectMode(this.p.CENTER);
    this.p.rect(0, 0, fwidth, fheight, fbradius, 0, 0, fbradius);


    // switch background of flashLight
    this.p.noStroke();
    this.p.fill(130);
    this.p.rect(fwidth / 6, 0, fwidth / 4, fheight / 3, fbradius, fbradius, fbradius, fbradius);



    // switch of flashLight
    let pureColor = this.getPureColor();

    this.p.fill(pureColor);
    let pos = this.p.lerp(-fwidth / 16, fwidth / 16, this.intensity / 255);
    this.p.rect(fwidth / 6 + pos, 0, fwidth / 8, fheight / 3, fbradius, fbradius, fbradius, fbradius);


    // light bulb of flashLight
    this.p.fill(this.c);
    this.p.stroke(150);
    this.p.strokeWeight(1);
    this.p.circle(0.75 * fwidth, 0, 30);

    // cone part of flashLight
    this.p.fill(70);
    this.p.quad(fwidth / 2, fheight / 2 + fbradius / 2, fwidth / 2, -fheight / 2 - fbradius / 2, fwidth * 0.9, -fheight / 2 - fbradius, fwidth * 0.9, fheight / 2 + fbradius);

    // colored end  of flashLight
    this.p.stroke(90);
    this.p.strokeWeight(1);
    this.p.fill(this.c);
    this.p.rect(-fwidth / 3, 0, 9, fheight - 2);

    this.p.pop();


  }
}




var colorsSketch = function (p) {

  let FW, FR, FB, FG;
  let S;
  let Fs;

  let fwidth = 70;
  let RED = 1;
  let GREEN = 2;
  let BLUE = 3;


  p.setup = function () {
    p.createCanvas(600, 300);
    p.frameRate(15);

    FR = new FlashLight(fwidth / 2 + 20, 0, p.color(255, 0, 0), RED, p);
    FG = new FlashLight(fwidth / 2 + 20, 0, p.color(0, 255, 0), GREEN, p);
    FB = new FlashLight(fwidth / 2 + 20, 0, p.color(0, 0, 255), BLUE, p);

    Fs = [FR, FG, FB];

    S = new Screen(Fs, p);
    p.angleMode(p.DEGREES);
    for (let i = 0; i < Fs.length; i++) {
      const f = Fs[i];
      f.y = (i + 1) * p.height / (Fs.length + 1);

      if (i < Fs.length / 2)
        f.r = 90 + p.asin((f.x - S.cx) / p.dist(f.x, f.y, S.cx, S.cy));
      else
        f.r = 270 - p.asin((f.x - S.cx) / p.dist(f.x, f.y, S.cx, S.cy));
    }
  };

  p.draw = function () {
    p.background(20);

    for (let f of Fs) {
      f.update();
      f.show();
    }

    S.show();
  };


  p.mouseClicked = function () {
    for (let f of Fs) {
      let intensity = f.isOnMouse();
      if (intensity) {
        f.intensity = p.floor(intensity) - 1;
      }
    }
  };

  p.mouseDragged = function () {
    for (let f of Fs) {
      let intensity = f.isOnMouse();
      if (intensity) {
        f.intensity = p.floor(intensity) - 1;
      }
    }
  };

  p.mouseWheel = function (e) {
    for (let f of Fs) {
      let intensity = f.isOnMouse();
      if (intensity) {
        // f.intensity = p.floor(intensity) - 1;
        if (e.deltaY > 0) {
          f.intensity = p.max(0, f.intensity - 1);
        } else {
          f.intensity = p.min(255, f.intensity + 1);
        }
        // f.intensity = p.floor(intensity) - 1;
      }
    }
  }

};


var graySketch = function (p) {

  let FW;
  let S;
  let Fs;

  let fwidth = 70;
  let WHITE = 0;


  p.setup = function () {

    p.createCanvas(600, 300);
    p.frameRate(15);

    FW = new FlashLight(fwidth / 2 + 20, 0, p.color(255), WHITE, p);

    Fs = [FW];

    S = new Screen(Fs, p);
    p.angleMode(p.DEGREES);
    for (let i = 0; i < Fs.length; i++) {
      const f = Fs[i];
      f.y = (i + 1) * p.height / (Fs.length + 1);

      if (i < Fs.length / 2)
        f.r = 90 + p.asin((f.x - S.cx) / p.dist(f.x, f.y, S.cx, S.cy));
      else
        f.r = 270 - p.asin((f.x - S.cx) / p.dist(f.x, f.y, S.cx, S.cy));
    }
  };

  p.draw = function () {
    p.background(20);

    for (let f of Fs) {
      f.update();
      f.show();
    }

    S.show();
  };


  p.mouseClicked = function () {
    for (let f of Fs) {
      let intensity = f.isOnMouse();
      if (intensity) {
        f.intensity = p.floor(intensity) - 1;
      }
    }
  };

  p.mouseDragged = function () {
    for (let f of Fs) {
      let intensity = f.isOnMouse();
      if (intensity) {
        f.intensity = p.floor(intensity) - 1;
      }
    }
  };

  p.mouseWheel = function (e) {
    for (let f of Fs) {
      let intensity = f.isOnMouse();
      if (intensity) {
        // f.intensity = p.floor(intensity) - 1;
        if (e.deltaY > 0) {
          f.intensity = p.max(0, f.intensity - 1);
        } else {
          f.intensity = p.min(255, f.intensity + 1);
        }
        // f.intensity = p.floor(intensity) - 1;
      }
    }
  };
};


new p5(graySketch, 'gray_div');
new p5(colorsSketch, 'colors_div');
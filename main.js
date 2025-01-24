
const fragmentShader1 = `
#ifdef GL_ES
precision mediump float;
#endif

// Love u Hanna E

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float snoise(vec3 uv, float res) {
    const vec3 s = vec3(1e0, 1e2, 1e3);

    uv *= res;

    vec3 uv0 = floor(mod(uv, res)) * s;
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;

    vec3 f = smoothstep(0.0, 1.0, fract(uv));

    vec4 v = vec4(uv0.x + uv0.y + uv0.z,
              uv1.x + uv0.y + uv0.z,
              uv0.x + uv1.y + uv0.z,
              uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 1e-1) * 1e3);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 1e-1) * 1e3);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

void main() {
    vec2 p = -0.5 + gl_FragCoord.xy / resolution.xy;
    p.x *= resolution.x / resolution.y;
    float lp = .02/length(p);
    float ap = atan(p.x, p.y);

    float time = time*.04-pow(time, .8)*(1. + .1*cos(time*0.04))*2.;

    float r1 = 0.2;
    if(lp <= r1){
        ap -= time*0.1+lp*9.;
        lp = sqrt(1.-lp/r1)*0.5;
    }else{
        ap += time*0.1+lp*2.;
        lp -= r1;
    }

    lp = pow(lp*lp, 1./3.);

    p = lp*vec2(sin(ap), cos(ap));

    float color = 5.0 - (6.0 * lp);

    vec3 coord = vec3(atan(p.x, p.y) / 6.2832 + 0.5, 0.4 * lp, 0.5);

    float power = 2.0;
    for (int i = 0; i < 6; i++) {
        power *= 2.0;
        color += (1.5 / power) * snoise(coord + vec3(0.0, -0.05 * time*2.0, 0.01 * time*2.0), 16.0 * power);
    }
    color = max(color, 0.0);
    float c2 = color * color;
    float c3 = color * c2;
    vec3 fc = vec3(color * 0.34, c2*0.15, c3*0.85);
    float f = fract(time);
    //fc *= smoothstep(f-0.1, f, length(p)) - smoothstep(f, f+0.1, length(p));
    gl_FragColor = vec4(length(fc)*vec3(1,02,0)*0.04, 1.0);
}
`;

const fragmentShader2 = `
#ifdef GL_ES
precision mediump float;
#endif

// Love u Hanna E

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float snoise(vec3 uv, float res) {
    const vec3 s = vec3(1e0, 1e2, 1e3);

    uv *= res;

    vec3 uv0 = floor(mod(uv, res)) * s;
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;

    vec3 f = smoothstep(0.0, 1.0, fract(uv));

    vec4 v = vec4(uv0.x + uv0.y + uv0.z,
              uv1.x + uv0.y + uv0.z,
              uv0.x + uv1.y + uv0.z,
              uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 1e-1) * 1e3);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 1e-1) * 1e3);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

void main() {
    vec2 p = -0.5 + gl_FragCoord.xy / resolution.xy;
    p.x *= resolution.x / resolution.y;
    float lp = .02/length(p);
    float ap = atan(p.x, p.y);

    float time = time*.04-pow(time, .8)*(1. + .1*cos(time*0.04))*2.;

    float r1 = 0.2;
    if(lp <= r1){
        ap -= time*0.1+lp*9.;
        lp = sqrt(1.-lp/r1)*0.5;
    }else{
        ap += time*0.1+lp*2.;
        lp -= r1;
    }

    lp = pow(lp*lp, 1./3.);

    p = lp*vec2(sin(ap), cos(ap));

    float color = 5.0 - (6.0 * lp);

    vec3 coord = vec3(atan(p.x, p.y) / 6.2832 + 0.5, 0.4 * lp, 0.5);

    float power = 2.0;
    for (int i = 0; i < 6; i++) {
        power *= 2.0;
        color += (1.5 / power) * snoise(coord + vec3(0.0, -0.05 * time*2.0, 0.01 * time*2.0), 16.0 * power);
    }
    color = max(color, 0.0);
    float c2 = color * color;
    float c3 = color * c2;
    vec3 fc = vec3(color * 0.34, c2*0.15, c3*0.85);
    float f = fract(time);
    //fc *= smoothstep(f-0.1, f, length(p)) - smoothstep(f, f+0.1, length(p));
    gl_FragColor = vec4(length(fc)*vec3(1,02,0)*0.04, 1.0);
}
`;



class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("startButton", "startButton.png");
  }

  create() {
    const baseShader = new Phaser.Display.BaseShader('BufferShader1', fragmentShader);
    const shader = this.add.shader(baseShader, 400, 300, 800, 600);

    const buttonGraphics = this.add.graphics();
    buttonGraphics.fillStyle(0x0000ff, 0.5);
    buttonGraphics.fillRect(50, 50, 100, 50);

    const buttonText = this.add.text(100, 75, "Start", { fontSize: "20px", fill: "#fff" })
    .setOrigin(0.5)
    .setInteractive();

    buttonText.on('pointerdown', () => {
    this.scene.start("MainScene");
    });
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.timer = 5000; // 10 seconds
    this.timerEvent = null;
    this.graphics = null;
  }

  preload() {
    this.load.image("bubble", "bubble.png");
  }

  create() {
    this.add
      .text(400, 32, "Click the bubbles to destroy them", { color: "#00ff00" })
      .setOrigin(0.5, 0);
    

    this.graphics = this.add.graphics();
    this.graphics.fillGradientStyle(0x0000ff, 0x0000ff, 0xffff00, 0xffff00, 1);
    this.graphics.fillRect(0, 0, 800, 600);
    


    this.graphics = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });
    this.timerEvent = this.time.addEvent({
      delay: this.timer,
      callback: this.onTimerEnd,
      callbackScope: this,
    });

    var colors = [
      0xff0000, 0x00ff00, 0x0000fff, 0xffff00, 0xff00ff, 0x00ffff,
    ];

    for (let i = 0; i < 15; i++) {
      var x = Phaser.Math.Between(50, 750);
      var y = Phaser.Math.Between(100, 550);

      const bubble = this.physics.add
        .image(x, y, "bubble")
        .setScale(Phaser.Math.FloatBetween(0.05, 0.15));

      bubble.setTint(Phaser.Utils.Array.GetRandom(colors));

      this.tweens.add({
        targets: bubble,
        x: bubble.x + Phaser.Math.Between(-150, 150),
        y: bubble.y + Phaser.Math.Between(-150, 150),
        duration: Phaser.Math.Between(500, 4000),
        yoyo: true,
        repeat: -1,
        ease: "linear",
      });

      bubble.setInteractive();
      bubble.on("pointerdown", () => {
        this.burstBubble(bubble);
      });
    }

    this.score = 0;
    this.scoreText = this.add.text(35, 35, "0", {
      fontSize: "32px",
      fill: "#fff",
    });
  }

  update() {
    this.updateTimer();
  }

  burstBubble(bubble) {
    //console.log(bubble);
    bubble.body.enable = false; // Disable the physics body
    bubble.setVisible(false); // Hide the bubble

    for (let i = 0; i < 30; i++) {
      const subBubble = this.physics.add
        .image(bubble.x, bubble.y, "bubble")
        .setScale(Phaser.Math.FloatBetween(0.01, 0.05));
      subBubble.setTint(bubble.tint);

      this.tweens.add({
        targets: subBubble,
        x: subBubble.x + Phaser.Math.Between(-400, 400),
        y: subBubble.y + Phaser.Math.Between(-400, 400),
        alpha: 0,
        duration: 800,
        ease: "Sine.easeOut",
        onComplete: () => {
          subBubble.destroy();
        },
      });
    }

    //TODO add a sound effect

    this.score += 1;
    this.scoreText.setText(this.score);
  }

  updateTimer() {
    const elapsed = this.timerEvent.getElapsed();
    const remaining = this.timer - elapsed;
    const angle = (remaining / this.timer) * 360;

    this.graphics.clear();
    this.graphics.beginPath();
    this.graphics.arc(
      50,
      50,
      50,
      Phaser.Math.DegToRad(0),
      Phaser.Math.DegToRad(angle),
      false
    );
    this.graphics.strokePath();
  }

  onTimerEnd() {
    this.scene.stop("MainScene");
    this.scene.start("GameOverScene");
  }
}

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  create() {
    
    this.add.text(15, 200, "Guess what?", { fontSize: "64px", fill: "#fff" });
    this.add.text(10, 300, "Everyone wins!", { fontSize: "64px", fill: "#fff" });
    this.add.text(20, 400, "But your score is: " + this.scene.get("MainScene").score, {
      fontSize: "32px",
      fill: "#fff",
    });

    this.time.delayedCall(10000, () => {
      this.input.on("pointerdown", () => {
        this.scene.start("StartScene");
      });
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [StartScene, MainScene, GameOverScene],
};

const game = new Phaser.Game(config);

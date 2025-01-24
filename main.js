
const fragmentShader1 = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy*3.;
    // st += st * abs(sin(time*0.1)*3.0);
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time);

    float f = fbm(st+r);

    color = mix(vec3(0.101961,0.333333,0.444444),
                 vec3(0.222222,0.33333,0.498039),
                 clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

     color = mix(color,
                 vec3(0.666667,1,1),
                 clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.0);
}
`;

const fragmentShader2 = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy*3.;
    // st += st * abs(sin(time*0.1)*3.0);
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time);

    float f = fbm(st+r);

    // color = mix(vec3(0.101961,0.333333,0.444444),
    //             vec3(0.222222,0.33333,0.498039),
    //             clamp((f*f)*4.0,0.0,1.0));

    color = mix(vec3(1,1,1),
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

    // color = mix(color,
    //             vec3(0.666667,1,1),
    //             clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.0);
}
`;

const fragmentShader3 = `
#ifdef GL_ES
precision mediump float;
#endif

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

// shadertoy globals
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
#define PI 3.1415926535897932384626433832795

vec4 hsv_to_rgb(float h, float s, float v, float a)
{
    float c = v * s;
    h = mod((h * 6.0), 6.0);
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    vec4 color;

    if (0.0 <= h && h < 1.0) {
        color = vec4(c, x, 0.0, a);
    } else if (1.0 <= h && h < 2.0) {
        color = vec4(x, c, 0.0, a);
    } else if (2.0 <= h && h < 3.0) {
        color = vec4(0.0, c, x, a);
    } else if (3.0 <= h && h < 4.0) {
        color = vec4(0.0, x, c, a);
    } else if (4.0 <= h && h < 5.0) {
        color = vec4(x, 0.0, c, a);
    } else if (5.0 <= h && h < 6.0) {
        color = vec4(c, 0.0, x, a);
    } else {
        color = vec4(0.0, 0.0, 0.0, a);
    }

    color.rgb += v - c;

    return color;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float x = fragCoord.x - (iResolution.x / 2.0);
    float y = fragCoord.y - (iResolution.y );

    float r = length(vec2(x,y));
    float angle = atan(x,y) - sin(iTime)*r / 200.0 + 1.0*iTime;
    float intensity = 0.5 + 0.25*sin(15.0*angle);
    //float intensity = mod(angle, (PI / 8.0));
    //float intensity = 0.5 + 0.25*sin(angle*16.0-5.0*iTime);

    fragColor = hsv_to_rgb(angle/PI, intensity, 1.0, 0.5);
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, fragCoord.xy);
    gl_FragColor.a = 1.0;
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
    const baseShader = new Phaser.Display.BaseShader('BufferShader1', fragmentShader1);
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
    
      const baseShader = new Phaser.Display.BaseShader('BufferShader2', fragmentShader2);
      const shader = this.add.shader(baseShader, 400, 300, 800, 600);

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
    const baseShader = new Phaser.Display.BaseShader('BufferShader1', fragmentShader3);
    const shader = this.add.shader(baseShader, 400, 300, 800, 600);

    //const buttonGraphics = this.add.graphics();
    this.time.addEvent({
      delay: 500,
      callback: () => {
        const x = Phaser.Math.Between(0, 800);
        const bubble = this.physics.add.image(x, 0, "bubble").setScale(Phaser.Math.FloatBetween(0.05, 0.15));
        bubble.setVelocity(0, 200);
      },
      callbackScope: this,
      loop: true
    });

    this.add.text(15, 200, "Guess what?", { fontSize: "64px", fill: "#000" });
    this.add.text(100, 300, "Everyone wins!", { fontSize: "64px", fill: "#000" });
    this.add.text(200, 400, "But your score is: " + this.scene.get("MainScene").score, {
      fontSize: "32px",
      fill: "#000",
    });
    //create
    const shareButton = this.add.text(400, 500, "Share to Facebook", { fontSize: "32px", fill: "#000" })
        .setOrigin(0.5)
        .setInteractive();

    shareButton.on('pointerdown', () => {
        const url = "https://yourgameurl.com";
        const imageUrl = this.game.renderer.snapshotCanvas.toDataURL();
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&picture=${encodeURIComponent(imageUrl)}`;
        window.open(facebookShareUrl, '_blank');
    });

    this.time.delayedCall(500, () => {
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

import fragmentShader3 from '../assets/shaders/effect-shader.js';
import { topScore } from '../main.js';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  preload() {
    this.load.image("shark2", "assets/images/shark.png");
    this.load.audio('scream', 'assets/sounds/cartoon-scream.mp3');
  }

  create() {
    this.sound.play('scream', { loop: false });

    const baseShader = new Phaser.Display.BaseShader('BufferShader1', fragmentShader3);
    const shader = this.add.shader(baseShader, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);

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

    const shark = this.add.image(600, 200, 'shark2');
      shark.setScale(0.8);

      this.tweens.add({
      targets: shark,
      x: 300,
      ease: 'Sine.easeIn',
      duration: 250,
      yoyo: false,
      repeat: 0,
      });

      this.tweens.add({
      targets: shark,
      y: 180,
      ease: 'Sine.easeInOut',
      duration: 30,
      yoyo: true,
      repeat: 15,
      delay: 250
      });
    

    this.add.text(50, 400, "You are so amazing🦄", { fontSize: "32px", fill: "#000" })
      .setStroke('#ff0000', 4)
      .setShadow(1, 1, '#550000', 1, true, false);


    this.add.text(80, 460, "You won!", { fontSize: "64px", fill: "#000" })
    .setStroke('#00ff00', 4)
    .setShadow(1, 1, '#005500', 1, true, false);
    this.add.text(70, 600, "Your score is: " + this.scene.get("MainScene").score, {
      fontSize: "32px",
      fill: "#000",
    }).setStroke('#0000ff', 4)
    .setShadow(1, 1, '#000055', 1, true, false);

    this.add.text(100, 650, "Top score: " + topScore, {
      fontSize: "32px",
      fill: "#000",
    }) .setStroke('#ffff00', 4)
    .setShadow(1, 1, '#555500', 1, true, false);

    this.tweens.add({
        targets: this.children.list.filter(child => child.type === 'Text'),
        y: '+=10',
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    const shareButton = this.add.text(50, 750, "Share to Facebook", { fontSize: "32px", fill: "#0000ff" })
        .setInteractive()
        .setStroke('#555555', 4)
        .setShadow(1, 1, '#00ff00', 1, true, false);

    shareButton.on('pointerdown', () => {
        const url = "https://yourgameurl.com";
        this.game.renderer.snapshot((image) => {
            const imageUrl = image.src;
            const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&picture=${encodeURIComponent(imageUrl)}`;
            window.open(facebookShareUrl, '_blank');
        });
    });

    this.time.delayedCall(500, () => {
      this.input.on("pointerdown", () => {
        this.scene.start("StartScene");
      });
    });

  }
}

export default GameOverScene;
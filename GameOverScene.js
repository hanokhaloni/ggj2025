import fragmentShader3 from './fragmentShader3.js';
import { topScore } from './main.js';

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

    this.add.text(150, 200, "Guess what?", { fontSize: "32px", fill: "#000" });

    this.add.text(200, 300, "Everybody wins!", { fontSize: "64px", fill: "#000" });
    this.add.text(200, 400, "But your score is: " + this.scene.get("MainScene").score, {
      fontSize: "32px",
      fill: "#000",
    });

    this.add.text(250, 450, "Top score: " + topScore, {
      fontSize: "32px",
      fill: "#000",
    });

    this.tweens.add({
        targets: this.children.list.filter(child => child.type === 'Text'),
        y: '+=10',
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    //create
    const shareButton = this.add.text(450, 550, "Share to Facebook", { fontSize: "32px", fill: "#000" })
        .setOrigin(0.5)
        .setInteractive();

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
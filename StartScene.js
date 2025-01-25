
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

export default StartScene;
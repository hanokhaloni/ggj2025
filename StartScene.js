import fragmentShader1 from './fragmentShader1.js';
import {colors} from './main.js';

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("startButton", "startButton.png");
    this.load.image("bubble", "bubble.png");
  }

  create() {
    const baseShader = new Phaser.Display.BaseShader('BufferShader1', fragmentShader1);
    const shader = this.add.shader(baseShader, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);

    const buttonGraphics = this.add.graphics();
    buttonGraphics.fillStyle(0x0000ff, 0.5);
    buttonGraphics.fillRect(50, 50, 100, 50);

    const buttonText = this.add.text(100, 75, "Start", { fontSize: "32px", fill: "#fff"  })

    .setOrigin(0.5)
    .setInteractive();

    //add entrance animation of 6 bubbles, each by VideoColorSpace, with a name, asame as pacman ghosts in pacman game
    const bubbleNames = ["Blinky", "Pinky", "Inky", "Clyde", "Sue", "Funky"];

    bubbleNames.forEach((name, index) => {
      const bubble = this.add.image(900, 150 + index * 80, 'bubble');
      bubble.setScale(0.1);
      bubble.setTint(Phaser.Display.Color.ValueToColor(colors[index]).color);
      
      const bubbleText = this.add.text(bubble.x + 130, bubble.y-11, name, 
      { fontSize: "25px", fill: `#${Phaser.Display.Color.ValueToColor(colors[index]).color.toString(16).padStart(6, '0')}` });//.setOrigin(0, 0.5);
      
      this.tweens.add({
      targets: bubbleText,
      x: 180,
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: index * 200
      });

      this.tweens.add({
      targets: bubble,
      x: 130,
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: index * 200
      });
    });

    // this.add
    // .text(500, 32, "Click the bubbles to destroy them", { fontSize: "24px", color: "#00ff00",  font: '"Press Start 2P"'  })
    // .setOrigin(0.5, 0);

    // this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'Start Game', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    buttonText.on('pointerdown', () => {
      this.scene.start("MainScene");
    });
  }
}

export default StartScene;
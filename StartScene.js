import fragmentShader1 from './fragmentShader1.js';
import LunarLanderScene from './landerminigame/LunarLanderScene.js';
import {colors} from './main.js';

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("startButton", "startButton.png");
    this.load.image("bubble", "bubble.png");
    this.load.image("shark", "fin.png");
    this.load.audio('bubbleSound', 'bubbleoids pad loop.wav');
  }

  create() {
    this.sound.play('bubbleSound', { loop: true });
    const backgroundMusic = this.sound.get('bubbleSound');

    const baseShader = new Phaser.Display.BaseShader('BufferShader1', fragmentShader1);
    const shader = this.add.shader(baseShader, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);


    const topTitleText = this.add.text(100, 55, "BUBBLESORT", { fontSize: "50px", fill: "#fff"  })



    //add entrance animation of 6 bubbles, each by VideoColorSpace, with a name, asame as pacman ghosts in pacman game
    const bubbleNames = [
      "Blinky...1 point", 
      "Pinky....is green", 
      "Inky.....0 points", 
      "Clyde....0 points", 
      "Sue......0 points", 
      "Funky....is funky!"];

    bubbleNames.forEach((name, index) => {
      const bubble = this.add.image(900, 150 + index * 80, 'bubble');
      bubble.setScale(0.1);
      bubble.setTint(Phaser.Display.Color.ValueToColor(colors[index]).color);
      
      const bubbleText = this.add.text(bubble.x + 130, bubble.y-11, name, 
      { fontSize: "25px", fill: `#${Phaser.Display.Color.ValueToColor(colors[index]).color.toString(16).padStart(6, '0')}` });//.setOrigin(0, 0.5);
      bubbleText.setStroke('#070707', 4);
      bubbleText.setShadow(1, 1, '#020202', 1, true, false);

      this.tweens.add({
      targets: bubbleText,
      x: 150,
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: index * 200
      });

      this.tweens.add({
      targets: bubble,
      x: 110,
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: index * 200
      });
    });

    //add a shark at the buttom going back and forth like a shark using the fin image
    const shark = this.add.image(550, 750, 'shark');
    shark.setScale(0.5);

    this.tweens.add({
      targets: shark,
      x: -100,
      ease: 'Sine.easeInOut',
      duration: 7000,
      yoyo: false,
      repeat: -1,
      delay: 2400
    });

    this.tweens.add({
      targets: shark,
      y: 800,
      ease: 'Sine.easeInOut',
      duration: 2200,
      yoyo: true,
      repeat: -1,
      delay: 2400
    });


    const buttonRect = this.add.rectangle(225, 715, 350, 50, 0x0000ff, 0.5).setInteractive();
    buttonRect.on('pointerdown', () => {
      console.log('clicked');
      this.scene.start("MainScene");
    });
    const buttonText = this.add.text(100, 700, "Click to Start", { fontSize: "32px", fill: "#fff"  });

    //add a rectangle that is interactive, and when clicked, starts the LunarLanderScene
    const landerButton = this.add.rectangle(225, 550, 350, 50, 0x0000ff, 0.0).setInteractive();
    landerButton.on('pointerdown', () => {
      console.log('clicked');
      this.scene.start("LunarLanderScene");
    });

    // this.add
    // .text(500, 32, "Click the bubbles to destroy them", { fontSize: "24px", color: "#00ff00",  font: '"Press Start 2P"'  })
    // .setOrigin(0.5, 0);

    // this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'Start Game', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);


  }
}

export default StartScene;
import fragmentShader2 from '../assets/shaders/ocean-shader.js';
import { topScore, setTopScore, colors } from '../main.js';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.timer = 15000;
    this.timerEvent = null;
    this.graphics = null;
    
  }

  preload() {
    this.load.image("bubble", "assets/images/bubble.png");
    this.load.image("shark", "assets/images/fin.png");
    this.load.audio('bubbleMainMusic', 'assets/sounds/bubbleoids-music.wav');
  }

  create() {
    this.sound.play('bubbleMainMusic', { loop: true });
    
    const baseShader = new Phaser.Display.BaseShader(
      "BufferShader2",
      fragmentShader2
    );
    const shader = this.add.shader(baseShader, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);

    this.graphics = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });
    this.timerEvent = this.time.addEvent({
      delay: this.timer,
      callback: this.onTimerEnd,
      callbackScope: this,
    });

    for (let i = 0; i < 20; i++) {
      var x = Phaser.Math.Between(50, 480 -50);
      var y = Phaser.Math.Between(300, 800 - 50);
      var color;
      if (i<2) {
        color = colors[0];
      }
      else {
        color = colors[Phaser.Math.Between(1, 5)];
      }     

      this.createBubble(x, y, color);
    }

    for (let i = 0; i < 5; i++) {
      const shark = this.add.image(550, 750, 'shark');
      shark.setScale(0.5);

      this.tweens.add({
      targets: shark,
      x: -100,
      ease: 'Sine.easeInOut',
      duration: Phaser.Math.Between(5000,7000),
      yoyo: true,
      repeat: -1,
      flipX: true,
      delay: Phaser.Math.Between(400,800) * i
      });

      this.tweens.add({
      targets: shark,
      y: 800,
      ease: 'Sine.easeInOut',
      duration: 1500,
      yoyo: true,
      repeat: -1,
      delay: Phaser.Math.Between(400,800) * i
      });
    }

    this.score = 0;
    this.scoreText = this.add.text(35, 35, "0", {
      fontSize: "32px",
      fill: "#fff",
    });
  }

  createBubble(x, y, color) {
    const bubble = this.physics.add
      .image(x, y, "bubble")
      .setScale(0.01)
      .setBounce(1, 1) // Set bounce to make bubbles bump on collision
      .setCollideWorldBounds(true); // Ensure bubbles collide with world bounds

    this.tweens.add({
      targets: bubble,
      scale: Phaser.Math.FloatBetween(0.05, 0.15),
      duration: 2000,
      ease: "Sine.easeOut",
      yoyo: false,
      repeat: 0,
      delay: 0,
      onUpdate: () => {
        this.physics.world.collide(bubble, this.bubbleGroup);
      },
    });

    bubble.setTint(color);
    bubble.setInteractive({ draggable: true });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      dragY = Phaser.Math.Clamp(dragY, 50, 750);
      dragX = Phaser.Math.Clamp(dragX, 50, 450);
      gameObject.y = dragY;
      gameObject.x = dragX;
    });

    bubble.on("dragend", () => {
      if (bubble.y > 550 && bubble.tint === colors[0]) {
        for (let i = 0; i < this.score; i++) {
          var x = Phaser.Math.Between(50, 480 -50);
          var y = Phaser.Math.Between(100, 800 - 50);
    
          var color = colors[0];
          this.createBubble(x, y, color);
        }
        this.burstBubble(bubble);
      }
    });

    // Add upward velocity to the bubble
    bubble.setVelocityY(-20);

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
    if (this.score > topScore) {
      setTopScore(this.score);
    }
    this.scene.stop("MainScene");
    let bgmplay = this.sound.get('bubbleMainMusic');
    bgmplay.stop();
    bgmplay.destroy();

    this.scene.start("GameOverScene");
  }
}

export default MainScene;
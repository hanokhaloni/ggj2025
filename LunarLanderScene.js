
class LunarLanderScene extends Phaser.Scene {
  constructor() {
    super({ key: "LunarLanderScene" });
  }

  preload() {
    this.load.image('lander', 'lander.png');
  }

  create() {
    this.lander = this.physics.add.sprite(400, 100, 'lander');
    this.lander.setCollideWorldBounds(true);
    this.lander.setDrag(100);
    this.lander.setAngularDrag(100);
    this.lander.setMaxVelocity(200);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.ground = this.add.graphics();
    this.ground.lineStyle(2, 0x00ff00, 1);
    this.ground.beginPath();
    this.ground.moveTo(0, 580);
    this.ground.lineTo(200, 580);
    this.ground.lineTo(300, 550);
    this.ground.lineTo(500, 550);
    this.ground.lineTo(600, 580);
    this.ground.lineTo(800, 580);
    this.ground.strokePath();

    this.physics.add.existing(this.ground);
    this.ground.body.setImmovable(true);
    this.physics.add.collider(this.lander, this.ground, this.checkLanding, null, this);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.lander.rotation, 200, this.lander.body.acceleration);
    } else {
      this.lander.setAcceleration(0);
    }

    if (this.cursors.left.isDown) {
      this.lander.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.lander.setAngularVelocity(300);
    } else {
      this.lander.setAngularVelocity(0);
    }
  }

  checkLanding(lander, ground) {
    if (lander.body.velocity.y > 50) {
      this.scene.restart();
    } else {
      // Check if landed on flat surface
      if (lander.body.touching.down && (lander.x > 200 && lander.x < 300 || lander.x > 500 && lander.x < 600)) {
        this.add.text(400, 300, "You Landed!", { fontSize: "32px", fill: "#00ff00" }).setOrigin(0.5);
      } else {
        this.scene.restart();
      }
    }
  }
}

export default LunarLanderScene;
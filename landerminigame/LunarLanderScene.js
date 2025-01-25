class LunarLanderScene extends Phaser.Scene {
  constructor() {
    super({ key: "LunarLanderScene" });

  }

  preload() {
    this.load.image('lander', 'bubble.png');
  }

  create() {
    this.lander = this.physics.add.sprite(400, 100, 'lander').setScale(0.05);
    this.lander.setAngle(-90);
    this.lander.setCollideWorldBounds(true);
    this.lander.setDrag(100);
    this.lander.setAngularDrag(100);
    this.lander.setMaxVelocity(200);
    this.lander.setGravityY(300); // Add gravity force to the lander


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

    this.physics.add.collider(this.lander, this.ground, this.checkLanding, null, this);

    //add text for speed of lander
    this.speedText = this.add.text(10, 10, "", { fontSize: "32px", fill: "#00ff00" });
    
  }

  update() {
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.lander.rotation, 1000, this.lander.body.acceleration);
      //TODO add particle effect

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

    let lunarSpeedString = "Speed: " +  this.lander.body.velocity.y.toFixed(2) + " m/s";
    this.speedText.setText(lunarSpeedString);
    // if (this.cursors.up.isDown) {
    //   console.log(lunarSpeedString);
    // }
  }

  checkLanding(lander, ground) {
    console.log("CheckLanding...");
    if (lander.body.velocity.y > 50) {
      this.add.text(200, 300, "You crashed!!", { fontSize: "32px", fill: "#ff0000" }).setOrigin(0.5);
    } else {
      // Check if landed on flat surface
      if (lander.body.touching.down && (lander.x > 200 && lander.x < 300 || lander.x > 500 && lander.x < 600)) {
        this.add.text(200, 300, "You Landed!", { fontSize: "32px", fill: "#00ff00" }).setOrigin(0.5);
      } else {
        //this.scene.restart();
        this.add.text(200, 300, "You crashed!", { fontSize: "32px", fill: "#ff0000" }).setOrigin(0.5);
      }
    }
  }
}

export default LunarLanderScene;
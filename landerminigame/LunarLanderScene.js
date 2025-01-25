import fragmentShader1 from "./fragmentShader1.js";

class LunarLanderScene extends Phaser.Scene {
  constructor() {
    super({ key: "LunarLanderScene" });
    this.hasCrashed = false;
  }

  preload() {
    this.load.image("lander", "bubble.png");
    this.load.atlas("flares", "flares.png", "flares.json");

  }

  create() {

    const baseShader = new Phaser.Display.BaseShader(
      "BufferShader1",
      fragmentShader1
    );
    const shader = this.add.shader(baseShader, window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);


    this.emitter = this.add.particles(400, 250, "flares", {
      frame: ["red", "yellow", "green"],
      lifespan: 4000,
      speed: { min: 150, max: 250 },
      scale: { start: 0.8, end: 0 },
      gravityY: 150,
      blendMode: "ADD",
      emitting: false,
    });

    this.lander = this.physics.add.sprite(400, 100, "lander").setScale(0.05);
    this.lander.setAngle(-100);
    this.lander.setCollideWorldBounds(true);
    this.lander.setDrag(100);
    this.lander.setAngularDrag(100);
    this.lander.setMaxVelocity(200);
    this.lander.setGravityY(300); // Add gravity force to the lander

    this.cursors = this.input.keyboard.createCursorKeys();

    this.ground = this.physics.add.staticGroup();
    let height = 700;
    for (let i = 0; i < 50; i++) {
      let box = this.add.rectangle(i * 16, height, 16, 20, 0x00ff00);
      height += Phaser.Math.Between(-10, 10);
      this.physics.add.existing(box, true);
      box.rotation = Phaser.Math.Between(-45, 45);
      this.ground.add(box);
    }

    this.physics.add.collider(
      this.lander,
      this.ground,
      this.checkLanding,
      null,
      this
    );

    //add text for speed of lander
    this.speedText = this.add.text(90, 10, "", {
      fontSize: "32px",
      fill: "#00ff00",
    }).setStroke('#070707', 4).setShadow(1, 1, '#020202', 1, true, false);
  }

  update() {
    this.emitter.setPosition(this.lander.x, this.lander.y);
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.lander.rotation,
        1000,
        this.lander.body.acceleration
      );

      this.emitter.explode(3);
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

    let lunarSpeedString =
      "Speed: " + this.lander.body.velocity.y.toFixed(2) + " m/s";
    this.speedText.setText(lunarSpeedString);

  }

  checkLanding(lander, ground) {
    console.log(
      "CheckLanding..." + lander.body.velocity.y + "  " + lander.body.velocity.x
    );
    if (
      lander.body.velocity.y > 10.0 ||
      lander.body.velocity.x > 10.0 ||
      lander.body.velocity.x < -10.0
    ) {
      this.add
        .text(200, 300, "You crashed!!", { fontSize: "32px", fill: "#ff0000" }).setStroke('#070707', 4).setShadow(1, 1, '#020202', 1, true, false)
        .setOrigin(0.5);
      this.hasCrashed = true;
    } else {
      // Check if landed on flat surface
      //  if (lander.body.touching.down && (lander.x > 200 && lander.x < 300 || lander.x > 500 && lander.x < 600)) {
      if (this.hasCrashed != true) {
        
        this.add.text(200, 300, "You crashed!", { fontSize: "32px", fill: "#ff0000" }).setOrigin(0.5).setStroke('#070707', 4).setShadow(1, 1, '#020202', 1, true, false);;
        //this.add.text(200, 300, "You Landed!", { fontSize: "32px", fill: "#00ff00" }).setOrigin(0.5);
      }
      //} else {
      //this.scene.restart();
      //this.add.text(200, 300, "You crashed!", { fontSize: "32px", fill: "#ff0000" }).setOrigin(0.5);
      //}
    }
  }
}

export default LunarLanderScene;

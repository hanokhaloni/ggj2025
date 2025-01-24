class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('startButton', 'startButton.png');
    }

    create() {
        const startButton = this.add.image(400, 300, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('MainScene');
        });
    }
}

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.timer = 5000; // 10 seconds
        this.timerEvent = null;
        this.graphics = null;
    }

    preload() {
        this.load.image('bubble', 'bubble.png');
    }

    create() {

        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
        this.timerEvent = this.time.addEvent({
            delay: this.timer,
            callback: this.onTimerEnd,
            callbackScope: this
        });

        var colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];

        for (let i = 0; i < 105; i++) {
            

            var x = Phaser.Math.Between(50, 750);
            var y = Phaser.Math.Between(100, 550);

            const bubble = this.physics.add.image(x, y, 'bubble').setScale(Phaser.Math.FloatBetween(0.05, 0.15));

            bubble.setTint(Phaser.Utils.Array.GetRandom(colors));

            this.tweens.add({
                targets: bubble,
                x: bubble.x + Phaser.Math.Between(-150, 150),
                y: bubble.y + Phaser.Math.Between(-150, 150),
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });


            //this.tweens.add({ targets: bubble, scaleX: 1.2, scaleY: 1.2, duration: 2000, yoyo: true, repeat: -1 });

            bubble.setInteractive();
            bubble.on('pointerdown', () => { this.burstBubble(bubble); });
        }

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    }

    update() {
        // if (this.score === 5) {
        //     this.scene.start('GameOverScene');
        // }
        this.updateTimer();
    }



    burstBubble(bubble) {
        console.log(bubble); // Log the bubble object to debug
        bubble.body.enable = false; // Disable the physics body
        bubble.setVisible(false); // Hide the bubble
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    }

    updateTimer() {
        const elapsed = this.timerEvent.getElapsed();
        const remaining = this.timer - elapsed;
        const angle = (remaining / this.timer) * 360;

        this.graphics.clear();
        this.graphics.beginPath();
        this.graphics.arc(50, 50, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(angle), false);
        this.graphics.strokePath();
    }

    onTimerEnd() {
        this.scene.stop('MainScene');
        this.scene.start('GameOverScene');
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        this.add.text(300, 300, 'You Win!', { fontSize: '64px', fill: '#000' });
        this.input.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [StartScene, MainScene, GameOverScene]
};

const game = new Phaser.Game(config);
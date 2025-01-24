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
    }

    preload() {
        this.load.image('bubble', 'bubble.png');
    }

    create() {
        this.bubbles = this.physics.add.group({
            key: 'bubble',
            repeat: 4,
            setXY: { x: 100, y: 100, stepX: 150 },
            setScale: { x: 0.5, y: 0.5 }
        });

        this.bubbles.children.iterate((bubble) => {
            bubble.setInteractive();
            bubble.on('pointerdown', () => { this.burstBubble(bubble);});
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    }

    update() {
        if (this.score === 5) {
            this.scene.start('GameOverScene');
        }
    }

    burstBubble(bubble) {
        console.log(bubble); // Log the bubble object to debug
        bubble.body.enable = false; // Disable the physics body
        bubble.setVisible(false); // Hide the bubble
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
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
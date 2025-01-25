import fragmentShader1 from './fragmentShader1.glsl';
import fragmentShader2 from './fragmentShader2.glsl';
import fragmentShader3 from './fragmentShader3.glsl';
import StartScene from './StartScene.js';
import MainScene from './MainScene.js';
import GameOverScene from './GameOverScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [StartScene, MainScene, GameOverScene],
};

const game = new Phaser.Game(config);

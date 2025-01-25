import StartScene from './StartScene.js';
import MainScene from './MainScene.js';
import GameOverScene from './GameOverScene.js';

var topScore = 0;
let colors = [0xff0000, 0x00ff00, 0x0000fff, 0xffff00, 0xff00ff, 0x00ffff];
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

function setTopScore(score) {
  topScore = score;
}

export { topScore, setTopScore, colors};

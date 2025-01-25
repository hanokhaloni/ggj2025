import StartScene from './StartScene.js';
import MainScene from './MainScene.js';
import GameOverScene from './GameOverScene.js';

var topScore = 0;
let colors = [0xff0000, 0x00ff00, 0x0000fff, 0xffff00, 0xff00ff, 0x00ffff];
const config = {
  type: Phaser.AUTO,
  width: 480,//window.innerWidth,
  height: 800,//window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [StartScene, MainScene, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

function setTopScore(score) {
  topScore = score;
}

export { topScore, setTopScore, colors};

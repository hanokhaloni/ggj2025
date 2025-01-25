import LunarLanderScene from './LunarLanderScene.js';

let topScore = 0;

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
  scene: [LunarLanderScene],
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

export { topScore, setTopScore};

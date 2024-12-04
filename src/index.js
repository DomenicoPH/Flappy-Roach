import Phaser from "phaser";
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';

const WIDTH = 400;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH / 10, y: HEIGHT / 2};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};//SHARED_CONFIG

const Scenes = [
  PreloadScene,
  PlayScene,
];//Scenes

const createScene = (Scene) => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 200 },
      debug: false,
    }
  },
  scene: initScenes()
};//OBJETO CONFIG

new Phaser.Game(config);
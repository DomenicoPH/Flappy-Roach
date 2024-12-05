import Phaser from "phaser";

class BaseScene extends Phaser.Scene{

    constructor(key, config){
        super(key);
        this.config = config;
        this.screenCenter = [ config.width / 2, config.height / 2 ];
        this.PIPES_TO_RENDER = 4;
        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontOptions = {
            fontSize: `${this.fontSize}px`,
            fill: '#CDFFFF'
        }
        this.currentDifficulty = 'only';
        this.difficulties = {
            //Define la dificultad en base a la separación vertical y horizontal de los obstáculos
            'only': {
                horizontalDistanceRange: [320, 370],
                verticalDistanceRange: [160, 210],
            }
        }
    }

    create(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    }
}

export default BaseScene;
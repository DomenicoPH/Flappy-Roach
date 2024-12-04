import Phaser from "phaser";

class PreloadScene extends Phaser.Scene{

    constructor(){
        super('PreloadScene');
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.spritesheet('roach', 'assets/cucaracha_spritesheet.png',{
            frameWidth: 23,
            frameHeight: 15,
        })
    }

    create(){
        this.scene.start('PlayScene');
    }
};

export default PreloadScene;
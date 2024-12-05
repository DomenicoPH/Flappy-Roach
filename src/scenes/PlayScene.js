import BaseScene from "./BaseScene";

class PlayScene extends BaseScene{
    
    constructor(config){
        super('PlayScene', config);

        this.player = null;
        this.pipes = null;
        this.isPaused = false;
        this.GRAVITY = 600;
        this.VELOCITY = 200;
    }

    create(){
        this.createBG();
        this.createPipes();
        this.createPlayer();
        this.animatePlayer();
    }

    createBG(){
        this.add.image(0,0,'sky').setOrigin(0);
    };

    createPlayer(){
        this.player = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'roach')
        .setFlipX(true)
        .setScale(3)
        .setOrigin(0)
    };

    animatePlayer(){
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('roach', {start: 0, end: 7}),
            frameRate: 30,
            repeat: -1,
        });
        this.player.play('fly');
    };

    createPipes(){
        this.pipes = this.physics.add.group();
        for(let i=0; i < this.PIPES_TO_RENDER; i++){
            const upperPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1)
            const lowerPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 0)
            this.placePipe(upperPipe, lowerPipe)
        };

        //this.pipes.setVelocityX(-this.VELOCITY);
    }

    placePipe(upperPipe, lowerPipe){
        const difficulty = this.difficulties[this.currentDifficulty]; // Nivel de dificultad (BaseScene)
        const rightMostX = this.getRightMostPipe();
        
        let verticalDistance = Phaser.Math.Between(...difficulty.verticalDistanceRange);
        let verticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - verticalDistance);
        let horizontalDistance = Phaser.Math.Between(...difficulty.horizontalDistanceRange);

        upperPipe.x = rightMostX + horizontalDistance
            // Tubo Superior - pos. X: 
        upperPipe.y = verticalPosition
            // Tubo Superior - pos. Y: 
        lowerPipe.x = upperPipe.x
            // Tubo Inferior - pos. X: 
        lowerPipe.y = upperPipe.y + verticalDistance
            // Tubo Inferior - pos. Y: 
    }

    getRightMostPipe(){ /* Obtiene el tubo más a la derecha */
        let rightMostX = 0; 
        this.pipes.getChildren().forEach(function(pipe){
            rightMostX = Math.max(pipe.x, rightMostX);
            // Math.max toma el valor mayor entre los argumentos que se le proporcionan y lo asigna a rightMostX
        })
        return rightMostX;
    }
};

export default PlayScene;
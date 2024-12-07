import BaseScene from "./BaseScene";

class PlayScene extends BaseScene{
    
    constructor(config){
        super('PlayScene', config);

        this.player = null;
        this.pipes = null;
        this.isPaused = false;
        this.GRAVITY = 600;
        this.VELOCITY = 200;
        this.flapVelocity = 280;
    }

    create(){
        this.createBG();
        this.createPipes();
        this.createPlayer();
        this.pipePlayerColliders();
        this.animatePlayer();
        this.playerControl();
    }

    update(){
        this.recyclePipes();
        this.checkGameStatus();
    }

    // -- FUNCIONES -- //

    createBG(){
        this.add.image(0,0,'sky').setOrigin(0);
    };

    // PLAYER -------------------------------------------------------------------------------------------------------------------------------------------------------- PLAYER

    createPlayer(){
        this.player = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'roach')
        .setFlipX(true)
        .setScale(3)
        .setOrigin(0)
        this.player.setBodySize(this.player.width, this.player.height - 8)
        this.player.body.gravity.y = this.GRAVITY;
        this.player.setCollideWorldBounds(true);
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


    // PIPES -------------------------------------------------------------------------------------------------------------------------------------------------------- PIPES

    createPipes(){
        // Crea 4 pipes superiores y 4 pipes inferiores
        this.pipes = this.physics.add.group();
        for(let i=0; i < this.PIPES_TO_RENDER; i++){
            const upperPipe = this.pipes.create(0, 0, 'pipe')   // Se coloca en la esq. sup. izq de la pantalla (inicialmente escondidas por encima de la pantalla debido a su 'origin')
                .setImmovable(true)
                .setOrigin(0, 1)
            const lowerPipe = this.pipes.create(0, 0, 'pipe')   // Se coloca en la esq. sup. izq de la pantalla (inicialmente visibles debido a su 'origin')
                .setImmovable(true)
                .setOrigin(0, 0)
            this.placePipe(upperPipe, lowerPipe)    // Coloca las 'pipes' 
        };

        this.pipes.setVelocityX(-this.VELOCITY);
    }

    placePipe(upperPipe, lowerPipe){

        const difficulty = this.difficulties[this.currentDifficulty]; // Nivel de dificultad (BaseScene)
        const rightMostX = this.getRightMostPipe();
        
        let verticalDistance = Phaser.Math.Between(...difficulty.verticalDistanceRange); 
        // → DISTANCIA VERTICAL: un valor aleatorio entre los dos valores del array 'verticalDistanceRange'
        let horizontalDistance = Phaser.Math.Between(...difficulty.horizontalDistanceRange); 
        // → DISTANCIA HORIZONTAL: un valor aleatorio entre los dos valores del array 'horizontalDistanceRange'
        let verticalPosition = Phaser.Math.Between(20, this.config.height - 20 - verticalDistance); 
        // → POSICION VERTICAL: un valor aleatorio entre 20 y la altura total de la pantalla - 20 - la distancia vertical

        // Posicionamiento de los pipes (obstáculos)

        // upper pipe origin: esq. inf. izq.
        upperPipe.x = rightMostX + horizontalDistance
            // Tubo Superior - pos. X: 
        upperPipe.y = verticalPosition
            // Tubo Superior - pos. Y: 

        // lower pipe origin: esq. sup. izq.
        lowerPipe.x = upperPipe.x
            // Tubo Inferior - pos. X: 
        lowerPipe.y = upperPipe.y + verticalDistance
            // Tubo Inferior - pos. Y: 
    }

    getRightMostPipe(){ 
        /*  Obtiene el tubo más a la derecha. Esto permite que placePipes() 
            utilice como referencia el último pipe seleccionado para desplazar el siguiente */
        let rightMostX = 0; 
        this.pipes.getChildren().forEach(function(pipe){
            rightMostX = Math.max(pipe.x, rightMostX);
            // Math.max toma el valor mayor entre los argumentos que se le proporcionan y lo asigna a rightMostX
        })
        return rightMostX;
    }

    recyclePipes(){
        const tempPipes = [];
        this.pipes.getChildren().forEach( pipe => {
            if(pipe.getBounds().right <= 0){
                tempPipes.push(pipe)
                if(tempPipes.length === 2){
                    this.placePipe(...tempPipes);
                    // más funciones aqui...
                }
            }
        })
    }

    // PLAYER CONTROL -------------------------------------------------------------------------------------------------------------------------------------------------------- PLAYER CONTROL

    playerControl(){
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }

    flap(){
        this.player.body.velocity.y = -this.flapVelocity;
    }

    // GAME STATUS -------------------------------------------------------------------------------------------------------------------------------------------------------- GAME STATUS

    gameOver(){
        this.physics.pause();
        this.player.setTint(0xEE4824);
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart();
            },
            loop: false,
        })
    }

    checkGameStatus(){
        if(this.player.y <= 0 || this.player.getBounds().bottom >= this.config.height){
            this.gameOver();
        }
    }

    pipePlayerColliders(){
        this.physics.add.collider(this.player, this.pipes, this.gameOver, null, this);
    }


};

export default PlayScene;
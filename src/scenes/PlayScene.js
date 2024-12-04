import BaseScene from "./BaseScene";

class PlayScene extends BaseScene{
    constructor(config){
        super('PlayScene', config);

        this.bird = null;
        this.pipes = null;
        this.isPaused = false;
    }
}

export default PlayScene;
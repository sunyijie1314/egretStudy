

class Main extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        var _myGrid:Grid = new Grid(100, 100, 100, 100, 0x0000ff, "2048");
        this.addChild(_myGrid);
    }
}

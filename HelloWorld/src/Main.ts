

class Main extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        var _myGrid:Grid = new Grid(111, 1);
        this.addChildAt(_myGrid, 0);
    }
}

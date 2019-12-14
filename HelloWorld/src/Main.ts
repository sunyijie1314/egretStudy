class MyGrid extends egret.Shape{
    public constructor(){
        super();
        this.drawGrid();
    }
    private drawGrid(){
        this.graphics.beginFill( 0x0000ff );
        this.graphics.drawRect( 0, 0, 2000,2000 );
        this.graphics.endFill();            
    }
}

class Main extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        var _myGrid:MyGrid = new MyGrid();
        this.addChild(_myGrid);

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x00ff00 );
        shp.graphics.drawRect( 0, 0, 100, 100 );
        shp.graphics.endFill();
        // shp.anchorOffsetX = 50;
        shp.x = 500;
        shp.y = 500;
        this.addChild( shp );
    }
}
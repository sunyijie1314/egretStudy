

class Main extends egret.DisplayObjectContainer{    
    private static m_sGridWidth:number = 100;
    private static m_sGridHeight:number = 100;
    private static m_sSpace:number = 10;
    private static m_sStageWidth:number = Main.m_sGridWidth * 4 + Main.m_sSpace * 5;
    private static m_sStageHeight:number = Main.m_sGridHeight * 4 + Main.m_sSpace * 5;
    private static m_sStageColor:number = 0x000000;
    private static m_sNum:number = 4;

    private m_grids = new Array<Grid>(Main.m_sNum * Main.m_sNum);
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        this.createGrid();
        // var _myGrid:Grid = new Grid(100, 100, 100, 100, 0x0000ff, "2048");
        // this.addChild(_myGrid);
    }

    private createGrid():void
    {
        var stageGrid:eui.Rect = new eui.Rect(Main.m_sStageWidth, Main.m_sStageHeight, Main.m_sStageColor);
        stageGrid.x = this.stage.stageWidth / 2 - Main.m_sStageWidth / 2;
        stageGrid.y = this.stage.stageHeight / 2 - Main.m_sStageHeight / 2;
        this.addChild(stageGrid);
        
        //背景小方格
        for (var col = 0; col < Main.m_sNum; col++)
        {
            for (var row = 0; row < Main.m_sNum; row++)
            {
                var count = col * Main.m_sNum + row;
                var vGrid:eui.Rect = new eui.Rect(Main.m_sGridWidth, Main.m_sGridHeight, 0x0000ff);
                vGrid.x = (row + 1) * Main.m_sSpace + row * Main.m_sGridWidth;
                vGrid.y = (col + 1) * Main.m_sSpace + col * Main.m_sGridHeight;
                stageGrid.addChild(vGrid);
            }
        }
    }
}

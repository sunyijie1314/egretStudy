

class Main extends egret.DisplayObjectContainer{    
    public static m_sGridWidth:number = 100;
    public static m_sGridHeight:number = 100;
    public static m_sSpace:number = 10;
    public static m_sNumX:number = 4;
    public static m_sNumY:number = 4;
    private static m_sStageWidth:number = Main.m_sGridWidth * Main.m_sNumX + Main.m_sSpace * (Main.m_sNumX + 1);
    private static m_sStageHeight:number = Main.m_sGridHeight * Main.m_sNumY + Main.m_sSpace * (Main.m_sNumY + 1);
    private static m_sStageColor:number = 0x000000;

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        this.createGrid();

        // var _myGrid:Grid = new Grid(100, 100, 100, 100, 0x0000ff, "2048");
        
    }

    private createGrid():void
    {
        var stageGrid:eui.Rect = new eui.Rect(Main.m_sStageWidth, Main.m_sStageHeight, Main.m_sStageColor);
        stageGrid.x = this.stage.stageWidth / 2 - Main.m_sStageWidth / 2;
        stageGrid.y = this.stage.stageHeight / 2 - Main.m_sStageHeight / 2;
        this.addChild(stageGrid);
        
        //背景小方格
        for (var col = 0; col < Main.m_sNumY; col++)
        {
            for (var row = 0; row < Main.m_sNumX; row++)
            {
                var count = col * Main.m_sNumY + row;
                var vGrid:eui.Rect = new eui.Rect(Main.m_sGridWidth, Main.m_sGridHeight, 0x0000ff);
                vGrid.x = (row + 1) * Main.m_sSpace + row * Main.m_sGridWidth;
                vGrid.y = (col + 1) * Main.m_sSpace + col * Main.m_sGridHeight;
                stageGrid.addChild(vGrid);
            }
        }

        var _myGrid:Game = new Game();
        stageGrid.addChild(_myGrid);
    }

    //随机数
    public static rand(number:number):number
    {
        var today:Date = new Date(); 
        var seed = today.getTime();
        return Math.ceil( this.rnd( seed ) * number );
    }

    private static rnd(seed:number):number
    {
        seed = ( seed * 9301 + 49297 ) % 233280;
        return seed / ( 233280.0 );
    }
}

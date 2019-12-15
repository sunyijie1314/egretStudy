class Game extends egret.DisplayObjectContainer {

    private m_grids = new Array<Grid>(Main.m_sNumX * Main.m_sNumY);
    private m_isGrid = new Array<boolean>(Main.m_sNumX * Main.m_sNumY);

    public constructor(){
        super();
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++ )
        {
            this.m_isGrid[i] = false;
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        this.start();
    }

    private start():void
    {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++ )
        {
            this.m_isGrid[i] = false;
            if ((undefined !== this.m_grids[i]) && (undefined !== this.m_grids[i].parent))
            {
                this.m_grids[i].parent.removeChildren();
            }
        }
        this.randomGrid();
        this.randomGrid();
    }

    private randomGrid():void
    {
        if (true == this.isFull())
        {
            console.log("Grid is full!");
            return;
        }
        
        var num:number = Main.rand( Main.m_sNumX * Main.m_sNumY ) - 1;
        while (true == this.m_isGrid[num])
        {
            num = Main.rand( Main.m_sNumX * Main.m_sNumY ) - 1;
        }
        this.m_isGrid[num] = true;
        var vRow = num % Main.m_sNumX;
        var vCol = Math.floor(num / Main.m_sNumY);
        this.m_grids[num] = new Grid();
        this.m_grids[num].setX((vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth);
        this.m_grids[num].setY((vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight);
        this.m_grids[num].setWidth(Main.m_sGridWidth);
        this.m_grids[num].setHeight(Main.m_sGridHeight);

        var gridNum = 2 * Main.rand(2);
        let info:any = Util.getNumInfo(gridNum);
        this.m_grids[num].setColor(info.color);
        this.m_grids[num].setText("" + info.num);
        this.addChild(this.m_grids[num]);

    }

    private isFull():boolean
    {
        for (var i = 1; i < Main.m_sNumX * Main.m_sNumY; i++)
        {
            if (false == this.m_isGrid[i])
            {
                return false;
            }
        }
        return true;
    }
}
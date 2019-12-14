
class Grid extends egret.DisplayObjectContainer
{
    private m_gridX:number;
    private m_gridY:number;
    private m_gridWidth:number;
    private m_gridHeight:number;
    private m_gridColor:number;
    private m_gridText:string;

    constructor()
    constructor(gridX:number, gridY:number)
    constructor(gridX:number, gridY:number, gridWidth:number, gridHeight:number)
    constructor(gridX:number, gridY:number, gridWidth:number, gridHeight:number, gridColor:number)
    constructor(gridX:number, gridY:number, gridWidth:number, gridHeight:number, gridColor:number, gridText:string)
    constructor(gridX?:number, gridY?:number, gridWidth?:number, gridHeight?:number, gridColor?:number, gridText?:string)
    {
        super();
        this.assign(gridX,gridY,gridWidth,gridHeight,gridColor,gridText);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var shp:egret.Shape = new egret.Shape();
        shp.x = this.m_gridX;
        shp.y = this.m_gridY;
        shp.graphics.beginFill( 0xff0000, 1);
        shp.graphics.drawCircle( 0, 0, 50 );
        shp.graphics.endFill();
        this.addChild( shp );
    }

    // 为各个参数赋值
    private assign(gridX:number, gridY:number, gridWidth:number, gridHeight:number, gridColor:number, gridText:string):void
    {
        if (undefined == gridX)
        {
            this.m_gridX = 0;
            this.m_gridY = 0;
            this.m_gridWidth = 0;
            this.m_gridHeight = 0;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridWidth)
        {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = 0;
            this.m_gridHeight = 0;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridColor)
        {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = gridWidth;
            this.m_gridHeight = gridHeight;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridText)
        {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = gridWidth;
            this.m_gridHeight = gridHeight;
            this.m_gridColor = gridColor;
            this.m_gridText = "";
        }
        else
        {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = gridWidth;
            this.m_gridHeight = gridHeight;
            this.m_gridColor = gridColor;
            this.m_gridText = gridText;
        }
    }
}
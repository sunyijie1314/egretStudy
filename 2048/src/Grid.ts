
class Grid extends egret.DisplayObjectContainer
{
    private m_gridX:number;
    private m_gridY:number;
    private m_gridWidth:number;
    private m_gridHeight:number;
    private m_gridColor:number;
    private m_gridText:string;

    //重载构造函数
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
        this.createGrid();
    }

    private createGrid():void 
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(this.m_gridColor);
        shp.graphics.drawRect(this.m_gridX, this.m_gridY, this.m_gridWidth, this.m_gridHeight);
        shp.graphics.endFill();
        this.addChild( shp );

        //计算实现图片正中
        var _txInfo = new egret.TextField;
        this.addChild( _txInfo );

        _txInfo.size = 28;
        _txInfo.x = 50;
        _txInfo.y = 50;
        _txInfo.textAlign = egret.HorizontalAlign.LEFT;
        _txInfo.textColor = 0x000000;
        _txInfo.type = egret.TextFieldType.DYNAMIC;
        _txInfo.lineSpacing = 6;
        _txInfo.multiline = true;
        _txInfo.text =
                "轻触屏幕调整显示对象位置";
    }

    //get & set
    public getX():number { return this.m_gridX; }
    public setX(x:number):void { this.m_gridX = x; }

    public getY():number { return this.m_gridY; }
    public setY(y:number):void { this.m_gridY = y; }

    public getWidth():number { return this.m_gridWidth; }
    public setWidth(width:number):void { this.m_gridWidth = width; }

    public getHeight():number { return this.m_gridHeight; }
    public setHeight(height:number):void { this.m_gridHeight = height; }

    public getColor():number { return this.m_gridColor; }
    public setColor(color:number):void { this.m_gridColor = color; }

    public getText():string { return this.m_gridText; }
    public setText(text:string):void { this.m_gridText = text; }

    // 为各个参数赋值
    private assign(gridX:number, gridY:number, gridWidth:number, gridHeight:number, gridColor:number, gridText:string):void
    {
        if (undefined == gridX)
        {
            this.m_gridX = 0;
            this.m_gridY = 0;
            this.m_gridWidth = 100;
            this.m_gridHeight = 100;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridWidth)
        {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = 100;
            this.m_gridHeight = 100;
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

class Grid extends egret.DisplayObjectContainer
{
    private m_gridX:number;
    private m_gridY:number;
    private m_gridWidth:number;
    private m_gridHeight:number;
    private m_gridColor:number;
    private m_gridText:string;
    private m_text:eui.Label;

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
        this.m_text = new eui.Label(this.m_gridText);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.createGrid();
    }

    private createGrid():void 
    {
        var grid:eui.Rect = new eui.Rect(this.m_gridWidth, this.m_gridHeight, this.m_gridColor);
        grid.x = this.m_gridX;
        grid.y = this.m_gridY;
        this.addChild( grid );
        
        this.m_text.textAlign = egret.HorizontalAlign.CENTER;
        this.m_text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.resetPosition();
        this.m_text.x = this.m_gridWidth / 2;
        this.m_text.y = this.m_gridHeight / 2;

        grid.addChild(this.m_text);
    }

    //计算实现矩形正中
    private resetPosition():void
    {
        this.m_text.text = this.m_gridText;
        this.m_text.anchorOffsetX = this.m_text.textWidth / 2;
        this.m_text.anchorOffsetY = this.m_text.textHeight / 2;
    }

    public copy(gridIn:Grid):void
    {
        this.setX(gridIn.getX());
        this.setY(gridIn.getY());
        this.setWidth(gridIn.getWidth());
        this.setHeight(gridIn.getHeight());
        this.setColor(gridIn.getColor());
        this.setText(gridIn.getText());
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
    public setText(text:string):void 
    { 
        this.m_gridText = text;
        this.resetPosition();
    }

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
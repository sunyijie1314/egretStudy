class Mask extends egret.DisplayObjectContainer{ 
    private m_x:number;
    private m_y:number;  
    private m_width:number;
    private m_height:number;
    private m_strText:string;
    public m_label:eui.Label;
    public m_mask:egret.Shape;
    constructor()
    constructor(maskX:number, maskY:number, maskWidth:number, maskHeight:number, maskText:string)
    constructor(maskX?:number, maskY?:number, maskWidth?:number, maskHeight?:number, maskText?:string)
    {
        super();
        if ((undefined != maskX) && (undefined != maskY) && (undefined != maskWidth) && (undefined != maskHeight) && (undefined != maskText))
        {
            this.m_x = maskX;
            this.m_y = maskY;
            this.m_width = maskWidth;
            this.m_height = maskHeight;
            this.m_strText = maskText;
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    //监听事件未删除,仅对主界面有效
    private onAddToStage(event:egret.Event){
        if ((undefined != this.m_x) || (undefined == this.m_y) || (undefined == this.m_width) || (undefined == this.m_height) || (undefined == this.m_strText))
        {
            this.m_x = 0;
            this.m_y = 0;
            this.m_width = this.stage.stageWidth;
            this.m_height = this.stage.stageHeight;
            this.m_strText = "";
        }
        this.parent.touchEnabled = false;
        this.parent.touchChildren = false;
        this.m_mask = new egret.Shape();
        this.m_mask.graphics.beginFill(0x000000);
        this.m_mask.graphics.drawRect(0, 0, this.m_width, this.m_height);
        this.m_mask.graphics.endFill();
        this.m_mask.alpha = 0.7;
        this.m_mask.x = this.m_x;
        this.m_mask.y = this.m_y;
        this.addChild(this.m_mask);

        this.m_label = new eui.Label();
        this.m_label.text = this.m_strText;
        this.m_label.textColor = 0xffffff;
        this.m_label.size = 30;
        this.m_label.x = this.m_width / 2;
        this.m_label.y = this.m_height / 2;
        this.m_label.anchorOffsetY = this.m_label.height / 2;
        this.m_label.anchorOffsetX = this.m_label.width / 2;
        this.addChild(this.m_label);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , (e:egret.TouchEvent) =>
        {
            this.parent.touchEnabled = true;
            this.parent.touchChildren = true;
            this.m_mask.visible = false;
            this.m_label.visible = false;
        }, this);
    }
}
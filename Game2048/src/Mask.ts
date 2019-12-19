class Mask extends egret.DisplayObjectContainer{    
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var square : egret.Shape = new egret.Shape();
            square.graphics.beginFill(0xff0000);
            square.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            square.graphics.endFill();
            this.addChild(square);
 
            var circle:egret.Shape = new egret.Shape();
            circle.graphics.beginFill(0x0000ff, 0.5);
            circle.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            circle.graphics.endFill();
            this.testFunc(circle, 0x0000ff, 0.2);
            //this.addChild(circle);
            //square.mask = circle;
        // var shp:egret.Shape = new egret.Shape();					 	// 用来作为遮挡背景
        // shp.graphics.beginFill(0x00ffff);
        // shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        // shp.graphics.endFill();
        // this.addChild(shp);
        console.log("!!!!");
        // this.testFunc(this, 0x00ffff, 0.8);
        // var shp:egret.Shape = new egret.Shape;
        // this.addChild(shp);

        // var shp:egret.Shape = new egret.Shape();	
        // shp.graphics.beginFill(0xff000f, 1);
        // // shp.graphics.drawRect(0, 0, 1, 1);
        // shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        // shp.graphics.endFill();
        // this.addChildAt(shp, this.numChildren + 1);
        // this.mask = shp;
    }

    private testFunc(target: egret.DisplayObject, bgColor: number, alpha: number) {
        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

        let blendShape = new egret.Shape();					 	// 用来作为遮挡背景
        blendShape.graphics.beginFill(bgColor, alpha);
        blendShape.graphics.drawRect(0, 0, this.width, this.height);
        blendShape.graphics.endFill();
        container.addChild(blendShape);
        container.addChild(target);
        target.blendMode = egret.BlendMode.ERASE;

        let renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(container);
        let blendBitmap = new egret.Bitmap(renderTexture);
        this.addChild(blendBitmap);

        blendBitmap.touchEnabled = true;  // 允许点击
        blendBitmap.pixelHitTest = true;  // 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。
    }
}
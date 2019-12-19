var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Mask = (function (_super) {
    __extends(Mask, _super);
    function Mask() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Mask.prototype.onAddToStage = function (event) {
        var square = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        square.graphics.endFill();
        this.addChild(square);
        var circle = new egret.Shape();
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
    };
    Mask.prototype.testFunc = function (target, bgColor, alpha) {
        var container = new egret.DisplayObjectContainer();
        var blendShape = new egret.Shape(); // 用来作为遮挡背景
        blendShape.graphics.beginFill(bgColor, alpha);
        blendShape.graphics.drawRect(0, 0, this.width, this.height);
        blendShape.graphics.endFill();
        container.addChild(blendShape);
        container.addChild(target);
        target.blendMode = egret.BlendMode.ERASE;
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(container);
        var blendBitmap = new egret.Bitmap(renderTexture);
        this.addChild(blendBitmap);
        blendBitmap.touchEnabled = true; // 允许点击
        blendBitmap.pixelHitTest = true; // 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。
    };
    return Mask;
}(egret.DisplayObjectContainer));
__reflect(Mask.prototype, "Mask");
//# sourceMappingURL=Mask.js.map
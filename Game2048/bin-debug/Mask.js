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
    function Mask(maskX, maskY, maskWidth, maskHeight, maskText) {
        var _this = _super.call(this) || this;
        if ((undefined != maskX) && (undefined != maskY) && (undefined != maskWidth) && (undefined != maskHeight) && (undefined != maskText)) {
            _this.m_x = maskX;
            _this.m_y = maskY;
            _this.m_width = maskWidth;
            _this.m_height = maskHeight;
            _this.m_strText = maskText;
        }
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //监听事件未删除,仅对主界面有效
    Mask.prototype.onAddToStage = function (event) {
        var _this = this;
        if ((undefined != this.m_x) || (undefined == this.m_y) || (undefined == this.m_width) || (undefined == this.m_height) || (undefined == this.m_strText)) {
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
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.parent.touchEnabled = true;
            _this.parent.touchChildren = true;
            _this.m_mask.visible = false;
            _this.m_label.visible = false;
        }, this);
    };
    return Mask;
}(egret.DisplayObjectContainer));
__reflect(Mask.prototype, "Mask");
//# sourceMappingURL=Mask.js.map
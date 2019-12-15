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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this.createGrid();
        // var _myGrid:Grid = new Grid(100, 100, 100, 100, 0x0000ff, "2048");
    };
    Main.prototype.createGrid = function () {
        var stageGrid = new eui.Rect(Main.m_sStageWidth, Main.m_sStageHeight, Main.m_sStageColor);
        stageGrid.x = this.stage.stageWidth / 2 - Main.m_sStageWidth / 2;
        stageGrid.y = this.stage.stageHeight / 2 - Main.m_sStageHeight / 2;
        this.addChild(stageGrid);
        //背景小方格
        for (var col = 0; col < Main.m_sNumY; col++) {
            for (var row = 0; row < Main.m_sNumX; row++) {
                var count = col * Main.m_sNumY + row;
                var vGrid = new eui.Rect(Main.m_sGridWidth, Main.m_sGridHeight, 0x0000ff);
                vGrid.x = (row + 1) * Main.m_sSpace + row * Main.m_sGridWidth;
                vGrid.y = (col + 1) * Main.m_sSpace + col * Main.m_sGridHeight;
                stageGrid.addChild(vGrid);
            }
        }
        var _myGrid = new Game();
        stageGrid.addChild(_myGrid);
    };
    //随机数
    Main.rand = function (number) {
        var today = new Date();
        var seed = today.getTime();
        return Math.ceil(this.rnd(seed) * number);
    };
    Main.rnd = function (seed) {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    };
    Main.m_sGridWidth = 100;
    Main.m_sGridHeight = 100;
    Main.m_sSpace = 10;
    Main.m_sNumX = 4;
    Main.m_sNumY = 4;
    Main.m_sStageWidth = Main.m_sGridWidth * Main.m_sNumX + Main.m_sSpace * (Main.m_sNumX + 1);
    Main.m_sStageHeight = Main.m_sGridHeight * Main.m_sNumY + Main.m_sSpace * (Main.m_sNumY + 1);
    Main.m_sStageColor = 0x000000;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
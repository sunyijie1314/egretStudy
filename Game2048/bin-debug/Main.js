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
        this.numTextInput();
        this.btnReset();
    };
    //创建背景
    Main.prototype.createGrid = function () {
        this.m_stageGrid = undefined;
        this.m_stageGrid = new eui.Rect(Main.m_sStageWidth, Main.m_sStageHeight, Main.m_sStageColor);
        this.m_stageGrid.x = this.stage.stageWidth / 2 - Main.m_sStageWidth / 2;
        this.m_stageGrid.y = this.stage.stageHeight / 2 - Main.m_sStageHeight / 2;
        this.addChild(this.m_stageGrid);
        //背景小方格
        for (var col = 0; col < Main.m_sNum; col++) {
            for (var row = 0; row < Main.m_sNum; row++) {
                var count = col * Main.m_sNum + row;
                var vGrid = new eui.Rect(Main.m_sGridWidth, Main.m_sGridHeight, 0x0000ff);
                vGrid.x = (row + 1) * Main.m_sSpace + row * Main.m_sGridWidth;
                vGrid.y = (col + 1) * Main.m_sSpace + col * Main.m_sGridHeight;
                this.m_stageGrid.addChild(vGrid);
            }
        }
        var myGrid = new Game();
        this.m_stageGrid.addChild(myGrid);
        //var mask:Mask = new Mask();
        //this.addChild(mask);
    };
    //重置按钮  //图片资源不知道为何加载不上
    Main.prototype.btnReset = function () {
        RES.loadConfig("resource/default.res.json", "resource/");
        var btn = new eui.Button();
        btn.x = this.stage.stageWidth / 2 + 30;
        btn.y = 30;
        btn.label = "重新开始";
        btn.skinName = "resource/eui_skins/ButtonSkin.exml";
        // console.log(btn.source);
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    Main.prototype.onTouch = function (event) {
        ///获得当前按钮
        var btn = event.target;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                break;
            case egret.TouchEvent.TOUCH_TAP:
                if (1 < Main.m_sNum && 8 > Main.m_sNum) {
                    this.removeChild(this.m_stageGrid);
                    this.createGrid();
                }
                break;
            default:
                break;
        }
    };
    //输入框和文字添加
    Main.prototype.numTextInput = function () {
        var labelTemp = new eui.Label();
        labelTemp.text = "输入1~7,变成N*N：";
        labelTemp.textColor = 0x000000;
        labelTemp.size = 20;
        labelTemp.x = this.stage.stageWidth / 2 - 200;
        labelTemp.y = 20;
        this.addChild(labelTemp);
        this.m_numInput = new eui.TextInput();
        this.m_numInput.skinName = "resource/eui_skins/TextInputSkin.exml";
        // this.m_numInput.prompt = "输入n变成n*n方格：";     //默认输入没有聚焦前不会显示
        this.m_numInput.maxChars = 1;
        this.m_numInput.x = this.stage.stageWidth / 2 - 200;
        this.m_numInput.y = 45;
        this.m_numInput.width = 170;
        this.addChild(this.m_numInput);
        this.m_numInput.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    Main.prototype.onChange = function (e) {
        console.log(this.m_numInput.text);
        Main.m_sNum = Number(this.m_numInput.text);
        Main.m_sGridWidth = 400 / Main.m_sNum;
        Main.m_sGridHeight = 400 / Main.m_sNum;
        Main.m_sSpace = 40 / Main.m_sNum;
        Main.m_sStageWidth = Main.m_sGridWidth * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
        Main.m_sStageHeight = Main.m_sGridHeight * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
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
    Main.m_sNum = 4;
    Main.m_sGridWidth = 400 / Main.m_sNum;
    Main.m_sGridHeight = 400 / Main.m_sNum;
    Main.m_sSpace = 40 / Main.m_sNum;
    Main.m_sStageWidth = Main.m_sGridWidth * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
    Main.m_sStageHeight = Main.m_sGridHeight * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
    Main.m_sStageColor = 0x000000;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.m_grids = new Array(Main.m_sNumX * Main.m_sNumY);
        _this.m_isGrid = new Array(Main.m_sNumX * Main.m_sNumY);
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++) {
            _this.m_isGrid[i] = false;
        }
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Game.prototype.onAddToStage = function (event) {
        this.start();
        this.addEvent();
    };
    //开始
    Game.prototype.start = function () {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++) {
            this.m_isGrid[i] = false;
            if ((undefined !== this.m_grids[i]) && (undefined !== this.m_grids[i].parent)) {
                this.m_grids[i].parent.removeChildren();
            }
        }
        this.randomGrid();
        this.randomGrid();
    };
    Game.prototype.addEvent = function () {
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            startX = e.localX;
            startY = e.localY;
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            endX = e.localX;
            endY = e.localY;
        }, this);
    };
    //随机方格
    Game.prototype.randomGrid = function () {
        if (true == this.isFull()) {
            console.log("Grid is full!");
            return;
        }
        var num = Main.rand(Main.m_sNumX * Main.m_sNumY) - 1;
        while (true == this.m_isGrid[num]) {
            num = Main.rand(Main.m_sNumX * Main.m_sNumY) - 1;
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
        var info = Util.getNumInfo(gridNum);
        this.m_grids[num].setColor(info.color);
        this.m_grids[num].setText("" + info.num);
        this.addChild(this.m_grids[num]);
    };
    //是否没有空方格了
    Game.prototype.isFull = function () {
        for (var i = 1; i < Main.m_sNumX * Main.m_sNumY; i++) {
            if (false == this.m_isGrid[i]) {
                return false;
            }
        }
        return true;
    };
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=2048.js.map
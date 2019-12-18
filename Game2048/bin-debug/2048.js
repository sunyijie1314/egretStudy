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
        _this.direction = "";
        _this.isMerge = false;
        _this.isOver = false;
        _this.isMove = false;
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
                this.m_grids[i] = undefined;
            }
        }
        this.randomGrid();
        this.randomGrid();
    };
    Game.prototype.addEvent = function () {
        var _this = this;
        var startX = 0;
        var startY = 0;
        var defferenceX = 0;
        var defferenceY = 0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            startX = e.localX;
            startY = e.localY;
            console.log("startX = " + startX);
            console.log("startY = " + startY);
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            defferenceX = e.localX - startX;
            defferenceY = e.localY - startY;
            console.log("e.localX =" + e.localX);
            console.log("e.localY =" + e.localY);
            if (true == _this.getDirection(defferenceX, defferenceY)) {
                _this.move();
            }
        }, this);
        // 键盘适配无语
        // document.addEventListener("keydown", function(evt:any)
        // {
        //     if ("ArrowLeft" == evt.code)
        //     {
        //         Util.direction = "left";
        //     }
        //     else if ("ArrowRight" == evt.code)
        //     {
        //         Util.direction = "right";
        //     }
        //     else if ("ArrowUp" == evt.code)
        //     {
        //         Util.direction = "up";
        //     }
        //     else if ("ArrowDown" == evt.code)
        //     {
        //         Util.direction = "down";
        //     }
        // })
    };
    Game.prototype.move = function () {
        var index = new Array(Main.m_sNumY);
        this.isMove = false;
        if ("right" == this.direction) {
            for (var i = 0; i < Main.m_sNumY; i++) {
                index[i] = Main.m_sNumX * (i + 1) - 1;
            }
            this.merge(index, -1, Main.m_sNumX);
        }
        else if ("left" == this.direction) {
            for (var i = 0; i < Main.m_sNumY; i++) {
                index[i] = Main.m_sNumX * i;
            }
            this.merge(index, 1, Main.m_sNumX);
        }
        else if ("up" == this.direction) {
            for (var i = 0; i < Main.m_sNumX; i++) {
                index[i] = i;
            }
            this.merge(index, Main.m_sNumX, Main.m_sNumY);
        }
        else if ("down" == this.direction) {
            for (var i = 0; i < Main.m_sNumX; i++) {
                index[i] = (Main.m_sNumY - 1) * Main.m_sNumX + i;
            }
            this.merge(index, -Main.m_sNumX, Main.m_sNumY);
        }
    };
    Game.prototype.merge = function (startIndexs, nextNum, layerNum) {
        if (true == this.isMerge) {
            console.log("now is merging.");
            return;
        }
        if (true == this.isOver) {
            console.log("now is game over.");
            return;
        }
        this.isMerge = true;
        for (var _i = 0, startIndexs_1 = startIndexs; _i < startIndexs_1.length; _i++) {
            var startIndex = startIndexs_1[_i];
            var next = startIndex + nextNum;
            var end = startIndex + nextNum * (layerNum - 1);
            for (var start = startIndex; start !== end;) {
                while (false == this.m_isGrid[next]) {
                    if ((next == end) && (false == this.m_isGrid[end])) {
                        break;
                    }
                    next = next + nextNum;
                }
                if (false == this.m_isGrid[next]) {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                if (false == this.m_isGrid[start]) {
                    this.m_grids[start] = new Grid();
                    this.m_grids[start].copy(this.m_grids[next]);
                    this.setPosition(start, this.m_grids[start]);
                    if (undefined !== this.m_grids[next].parent) {
                        this.m_grids[next].parent.addChild(this.m_grids[start]);
                        this.m_grids[next].parent.removeChild(this.m_grids[next]);
                        this.m_grids[next] = undefined;
                        this.m_isGrid[start] = true;
                        this.m_isGrid[next] = false;
                    }
                    this.isMove = true;
                }
                else if (this.m_grids[start].getText() == this.m_grids[next].getText()) {
                    var vGrid = new Grid();
                    var num = Number(this.m_grids[start].getText());
                    var txt = String(num * 2);
                    var numInfo = Util.getNumInfo(num * 2);
                    this.m_grids[start].setText(txt);
                    this.m_grids[start].setColor(numInfo.backgroundColor);
                    vGrid.copy(this.m_grids[start]);
                    if ((undefined !== this.m_grids[next].parent) && (undefined !== this.m_grids[start].parent)) {
                        //巨坑 不重新添加无法更新自己状态
                        this.m_grids[start].parent.removeChild(this.m_grids[start]);
                        this.m_grids[start] = vGrid;
                        this.m_grids[next].parent.addChild(this.m_grids[start]);
                        this.m_grids[next].parent.removeChild(this.m_grids[next]);
                        this.m_grids[next] = undefined;
                    }
                    this.m_isGrid[next] = false;
                    this.isMove = true;
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                if ((end == next) || ((next == start + nextNum) && (true == this.m_isGrid[next]))) {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                else {
                    next = next + nextNum;
                }
            }
        }
        this.isMerge = false;
        if (true == this.isMove) {
            this.randomGrid();
        }
    };
    Game.prototype.getDirection = function (x, y) {
        if (Math.abs(x) > Math.abs(y)) {
            if (x >= 0) {
                this.direction = "right";
            }
            else {
                this.direction = "left";
            }
        }
        else if (Math.abs(x) < Math.abs(y)) {
            if (y >= 0) {
                this.direction = "down";
            }
            else {
                this.direction = "up";
            }
        }
        else {
            console.log("can't get direction.");
            return false;
        }
        return true;
    };
    Game.prototype.setPosition = function (num, grid) {
        var vRow = num % Main.m_sNumX;
        var vCol = Math.floor(num / Main.m_sNumY);
        grid.setX((vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth);
        grid.setY((vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight);
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
        this.m_grids[num] = new Grid();
        this.setPosition(num, this.m_grids[num]);
        this.m_grids[num].setWidth(Main.m_sGridWidth);
        this.m_grids[num].setHeight(Main.m_sGridHeight);
        var gridNum = 2 * Main.rand(2);
        var info = Util.getNumInfo(gridNum);
        this.m_grids[num].setColor(info.backgroundColor);
        this.m_grids[num].setText(String(info.num));
        this.addChild(this.m_grids[num]);
    };
    //是否没有空方格了
    Game.prototype.isFull = function () {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++) {
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
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
        // private m_isGrid = new Array<boolean>(Main.m_sNumX * Main.m_sNumY);
        _this.m_direction = "";
        _this.m_isMerge = false;
        _this.m_isOver = false;
        _this.m_isMoved = false;
        _this.m_aniCount = 0;
        _this.m_aniDataArr = [];
        // for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++ )
        // {
        //     this.m_isGrid[i] = false;
        // }
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
            // this.m_isGrid[i] = false;
            if ((undefined !== this.m_grids[i]) && (undefined !== this.m_grids[i].parent)) {
                this.m_grids[i].parent.removeChild(this.m_grids[i]);
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
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            defferenceX = e.localX - startX;
            defferenceY = e.localY - startY;
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
    Game.prototype.isWin = function () {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++) {
            // if ((true == this.m_isGrid[i]) && ("2048" == this.m_grids[i].getText()))
            if ((undefined != this.m_grids[i]) && ("2048" == this.m_grids[i].getText())) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.isGameOver = function () {
        for (var now = 0; now < Main.m_sNumX; now++, under = now + Main.m_sNumX) {
            var under = now + Main.m_sNumX;
            while (under < Main.m_sNumX * Main.m_sNumY) {
                if (this.m_grids[now].getText() == this.m_grids[under].getText()) {
                    return false;
                }
                var right = now + 1;
                if ((0 !== (right % Main.m_sNumX)) && (this.m_grids[now].getText() == this.m_grids[right].getText())) {
                    return false;
                }
                now = now + Main.m_sNumX;
                under = under + Main.m_sNumX;
            }
        }
        return true;
    };
    Game.prototype.move = function () {
        var index = new Array(Main.m_sNumY);
        this.m_isMoved = false;
        if ("right" == this.m_direction) {
            for (var i = 0; i < Main.m_sNumY; i++) {
                index[i] = Main.m_sNumX * (i + 1) - 1;
            }
            this.merge(index, -1, Main.m_sNumX);
        }
        else if ("left" == this.m_direction) {
            for (var i = 0; i < Main.m_sNumY; i++) {
                index[i] = Main.m_sNumX * i;
            }
            this.merge(index, 1, Main.m_sNumX);
        }
        else if ("up" == this.m_direction) {
            for (var i = 0; i < Main.m_sNumX; i++) {
                index[i] = i;
            }
            this.merge(index, Main.m_sNumX, Main.m_sNumY);
        }
        else if ("down" == this.m_direction) {
            for (var i = 0; i < Main.m_sNumX; i++) {
                index[i] = (Main.m_sNumY - 1) * Main.m_sNumX + i;
            }
            this.merge(index, -Main.m_sNumX, Main.m_sNumY);
        }
    };
    Game.prototype.animateMove = function (start, next, time, isMerge) {
        var vRow = start % Main.m_sNumX;
        var vCol = Math.floor(start / Main.m_sNumY);
        var fromX = this.m_grids[next].getX();
        var fromY = this.m_grids[next].getY();
        var toX = (vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth;
        var toY = (vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight;
        var data = new Data(next, start, toX - fromX, toY - fromY, 50 * time, isMerge);
        this.m_aniDataArr.push(data);
    };
    Game.prototype.merge = function (startIndexs, nextNum, layerNum) {
        if (0 != this.m_aniDataArr.length) {
            console.log("aniDataArr is not clear, lenth is " + this.m_aniDataArr.length);
            this.m_aniDataArr.length = 0;
        }
        if (true == this.m_isMerge) {
            console.log("now is merging.");
            return;
        }
        if (true == this.m_isOver) {
            console.log("now is game over.");
            return;
        }
        console.log("----------------------start----------------------");
        this.m_isMerge = true;
        for (var _i = 0, startIndexs_1 = startIndexs; _i < startIndexs_1.length; _i++) {
            var startIndex = startIndexs_1[_i];
            var next = startIndex + nextNum;
            var end = startIndex + nextNum * (layerNum - 1);
            for (var start = startIndex; start !== end;) {
                if (0 != this.m_aniCount) {
                    continue;
                }
                // while (false == this.m_isGrid[next])
                while (undefined == this.m_grids[next]) {
                    // if ((next == end) && (false == this.m_isGrid[end]))
                    if ((next == end) && (undefined == this.m_grids[end])) {
                        break;
                    }
                    next = next + nextNum;
                }
                // if (false == this.m_isGrid[next])
                if (undefined == this.m_grids[next]) {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                var lSpace = Math.abs((start - next) / nextNum);
                //移动到空位置
                // if (false == this.m_isGrid[start])
                if (undefined == this.m_grids[start]) {
                    this.m_grids[start] = new Grid();
                    this.m_grids[start].copy(this.m_grids[next]);
                    this.setPosition(start, this.m_grids[start]);
                    this.addChild(this.m_grids[start]);
                    this.m_grids[start].visible = false;
                    // this.m_isGrid[start] = true;
                    // this.m_isGrid[next] = false;
                    this.animateMove(start, next, lSpace, false);
                    // while(0 < this.m_aniDataArr.length)
                    // {
                    //     this.moveAni(this.m_aniDataArr[0], false);
                    //     this.m_aniDataArr.shift();
                    // }
                    // if (undefined !== this.m_grids[next].parent)
                    // {
                    //     this.m_grids[next].parent.addChild(this.m_grids[start]);
                    //     // this.m_grids[next].parent.removeChild(this.m_grids[next]);
                    //     this.m_grids[next] = undefined;
                    // this.m_isGrid[start] = true;
                    // this.m_isGrid[next] = false;
                    // }
                    // this.m_isMoved = true;   
                }
                else if (this.m_grids[start].getText() == this.m_grids[next].getText()) {
                    // var vGrid:Grid = new Grid();
                    // let num = Number(this.m_grids[start].getText());
                    // let txt = String(num * 2);
                    // let numInfo = Util.getNumInfo(num * 2);
                    // this.m_grids[start].setText(txt);
                    // this.m_grids[start].setColor(numInfo.backgroundColor);
                    // this.animateMove(start, next, lSpace, true);
                    // while(0 < this.m_aniDataArr.length)
                    // {
                    //     this.mergeAni(this.m_aniDataArr[0], false);
                    //     this.m_aniDataArr.shift();
                    // }
                    // vGrid.copy(this.m_grids[start]);
                    // if ((undefined !== this.m_grids[next].parent) && (undefined !== this.m_grids[start].parent))
                    // {
                    //     //巨坑 不重新添加无法更新自己状态
                    //     // this.m_grids[start].parent.removeChild(this.m_grids[start]);
                    //     // this.m_grids[start] = vGrid;
                    //     this.m_grids[next].parent.addChild(this.m_grids[start]);
                    //     this.m_grids[next].parent.removeChild(this.m_grids[next]);
                    //     this.m_grids[next] = undefined;
                    // }
                    // this.m_isGrid[next] = false;
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                // if ((end == next) || ((next == start + nextNum) && (true == this.m_isGrid[next])))
                if ((end == next) || ((next == start + nextNum) && (undefined != this.m_grids[next]))) {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                else {
                    next = next + nextNum;
                }
            }
        }
        if (undefined == this.m_aniDataArr) {
            this.m_isMerge = false;
        }
        else {
            this.m_aniCount = this.m_aniDataArr.length;
        }
        this.animate();
    };
    Game.prototype.animate = function () {
        while ((undefined != this.m_aniDataArr) && (0 < this.m_aniDataArr.length)) {
            console.log("length:" + length);
            for (var i = 0; i < this.m_aniDataArr.length; i++) {
                console.log("m_orgGirdNum:" + this.m_aniDataArr[i].m_orgGirdNum);
                console.log("m_nowGirdNum:" + this.m_aniDataArr[i].m_nowGirdNum);
                console.log("m_x:" + this.m_aniDataArr[i].m_x);
                console.log("m_y:" + this.m_aniDataArr[i].m_y);
                console.log("m_time:" + this.m_aniDataArr[i].m_time);
                console.log("m_isMerge:" + this.m_aniDataArr[i].m_isMerge);
                console.log("-------------------------------------------------------");
            }
            var dataTemp = this.m_aniDataArr[0];
            if (true == dataTemp.m_isMerge) {
                this.mergeAni(dataTemp, true);
            }
            else {
                this.moveAni(dataTemp, true);
            }
            this.m_aniDataArr.shift();
        }
    };
    Game.prototype.mergeAni = function (dataTemp, out) {
        var _this = this;
        egret.Tween.get(this.m_grids[dataTemp.m_orgGirdNum])
            .to({ x: dataTemp.m_x, y: dataTemp.m_y }, dataTemp.m_time, egret.Ease.sineIn)
            .call(function () {
            if (undefined !== _this.m_grids[dataTemp.m_orgGirdNum]) {
                var num = Number(_this.m_grids[dataTemp.m_nowGirdNum].getText());
                var txt = String(num * 2);
                var numInfo = Util.getNumInfo(num * 2);
                _this.m_grids[dataTemp.m_nowGirdNum].setText(txt);
                _this.m_grids[dataTemp.m_nowGirdNum].setColor(numInfo.backgroundColor);
                _this.m_grids[dataTemp.m_orgGirdNum].parent.removeChild(_this.m_grids[dataTemp.m_nowGirdNum]);
                _this.m_grids[dataTemp.m_orgGirdNum].parent.addChild(_this.m_grids[dataTemp.m_nowGirdNum]);
                _this.m_grids[dataTemp.m_orgGirdNum].parent.removeChild(_this.m_grids[dataTemp.m_orgGirdNum]);
                _this.m_grids[dataTemp.m_orgGirdNum] = undefined;
            }
            // this.m_isGrid[dataTemp.m_orgGirdNum] = false;
            _this.m_isMoved = true;
            if (true == out) {
                _this.judge();
            }
        });
    };
    Game.prototype.moveAni = function (dataTemp, out) {
        var _this = this;
        egret.Tween.get(this.m_grids[dataTemp.m_orgGirdNum])
            .to({ x: dataTemp.m_x, y: dataTemp.m_y }, dataTemp.m_time, egret.Ease.sineIn)
            .call(function () {
            _this.m_grids[dataTemp.m_nowGirdNum].visible = true;
            if (undefined !== _this.m_grids[dataTemp.m_orgGirdNum]) {
                _this.m_grids[dataTemp.m_orgGirdNum].parent.removeChild(_this.m_grids[dataTemp.m_orgGirdNum]);
                _this.m_grids[dataTemp.m_orgGirdNum] = undefined;
                // this.m_isGrid[dataTemp.m_nowGirdNum] = true;
                // this.m_isGrid[dataTemp.m_orgGirdNum] = false;
            }
            _this.m_isMoved = true;
            if (true == out) {
                _this.judge();
            }
        });
    };
    Game.prototype.judge = function () {
        this.m_aniCount--;
        if (0 != this.m_aniCount) {
            return;
        }
        if (true == this.m_isMoved && 0 == this.m_aniDataArr.length) {
            this.m_isMerge = false;
            this.randomGrid();
            if (true == this.isWin()) {
                console.log("YOU GOT IT!");
            }
        }
    };
    Game.prototype.getDirection = function (x, y) {
        if (Math.abs(x) > Math.abs(y)) {
            if (x >= 0) {
                this.m_direction = "right";
            }
            else {
                this.m_direction = "left";
            }
        }
        else if (Math.abs(x) < Math.abs(y)) {
            if (y >= 0) {
                this.m_direction = "down";
            }
            else {
                this.m_direction = "up";
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
            if (true == this.isGameOver()) {
                console.log("Game Over");
            }
            return;
        }
        var num = Main.rand(Main.m_sNumX * Main.m_sNumY) - 1;
        // while (true == this.m_isGrid[num])
        while (undefined != this.m_grids[num]) {
            num = Main.rand(Main.m_sNumX * Main.m_sNumY) - 1;
        }
        // this.m_isGrid[num] = true;
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
            // if (false == this.m_isGrid[i])
            if (undefined == this.m_grids[i]) {
                return false;
            }
        }
        return true;
    };
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=2048.js.map
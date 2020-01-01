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
    };
    Game.prototype.merge = function (startIndexs, nextNum, layerNum) {
        var _this = this;
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
        var mergePromises = [];
        for (var _i = 0, startIndexs_1 = startIndexs; _i < startIndexs_1.length; _i++) {
            var startIndex = startIndexs_1[_i];
            var next = startIndex + nextNum;
            var end = startIndex + nextNum * (layerNum - 1);
            for (var start = startIndex; start !== end;) {
                while (undefined == this.m_grids[next]) {
                    if ((next == end) && (undefined == this.m_grids[end])) {
                        break;
                    }
                    next = next + nextNum;
                }
                if (undefined == this.m_grids[next]) {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                var lSpace = Math.abs((start - next) / nextNum);
                var vRow = start % Main.m_sNumX;
                var vCol = Math.floor(start / Main.m_sNumY);
                var fromX = this.m_grids[next].getX();
                var fromY = this.m_grids[next].getY();
                var toX = (vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth;
                var toY = (vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight;
                //移动到空位置
                if (undefined == this.m_grids[start]) {
                    this.m_grids[start] = this.m_grids[next];
                    mergePromises.push(this.moveBy(toX - fromX, toY - fromY, 50 * lSpace, this.m_grids[next]));
                    this.m_grids[next] = undefined;
                }
                else if (this.m_grids[start].getText() == this.m_grids[next].getText()) {
                    var num = Number(this.m_grids[start].getText());
                    var txt = String(num * 2);
                    var numInfo = Util.getNumInfo(num * 2);
                    this.m_grids[start].setText(txt);
                    this.m_grids[start].setColor(numInfo.backgroundColor);
                    this.removeChild(this.m_grids[start]);
                    this.addChild(this.m_grids[start]);
                    mergePromises.push(this.moveByAndFadeOut(toX - fromX, toY - fromY, 50 * lSpace, this.m_grids[next]));
                    this.m_grids[next] = undefined;
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
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
        if (mergePromises.length > 0) {
            // 待所有动画结束后， 将 this.m_isMerge 置为 false
            Promise.all(mergePromises).then(function () {
                _this.m_isMerge = false;
                _this.randomGrid();
                if (true == _this.isWin()) {
                    console.log("YOU GOT IT!");
                }
            });
        }
        else {
            this.m_isMerge = false;
        }
        //this.animate();
    };
    Game.prototype.moveBy = function (x, y, time, grid) {
        return new Promise(function (resolve) {
            egret.Tween.get(grid)
                .to({
                x: x,
                y: y
            }, time, egret.Ease.sineInOut)
                .call(resolve);
        });
    };
    Game.prototype.moveByAndFadeOut = function (x, y, time, grid) {
        return new Promise(function (resolve) {
            egret.Tween.get(grid)
                .to({
                x: x,
                y: y
            }, time, egret.Ease.sineInOut)
                .to({
                alpha: 0
            }, 250)
                .call(function () {
                grid.parent.removeChild(grid);
                resolve();
            });
        });
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
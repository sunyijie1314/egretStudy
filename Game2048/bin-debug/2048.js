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
        _this.m_grids = new Array(Main.m_sNum * Main.m_sNum);
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
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++) {
            if ((undefined != this.m_grids[i]) && (undefined != this.m_grids[i].parent)) {
                this.m_grids[i].parent.removeChild(this.m_grids[i]);
                this.m_grids[i] = undefined;
            }
        }
        this.randomGrid();
        this.randomGrid();
    };
    //事件监听：触碰和键盘
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
        //键盘适配
        document.addEventListener("keyup", function (event) {
            var key = event.code;
            switch (key) {
                case "ArrowLeft":
                    _this.m_direction = "left";
                    break;
                case "ArrowRight":
                    _this.m_direction = "right";
                    break;
                case "ArrowUp":
                    _this.m_direction = "up";
                    break;
                case "ArrowDown":
                    _this.m_direction = "down";
                    break;
            }
            _this.move();
        });
    };
    //是否赢，达到2048
    Game.prototype.isWin = function () {
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++) {
            if ((undefined != this.m_grids[i]) && ("2048" == this.m_grids[i].getText())) {
                return true;
            }
        }
        return false;
    };
    //是否失败
    Game.prototype.isGameOver = function () {
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++) {
            var numGrid = this.m_grids[i];
            if (undefined == numGrid) {
                return false;
            }
            else {
                if (i % Main.m_sNum < Main.m_sNum - 1) {
                    var rightGrid = this.m_grids[i + 1];
                    if (undefined == rightGrid || numGrid.getText() == rightGrid.getText()) {
                        return false;
                    }
                }
                if (i / Main.m_sNum < Main.m_sNum - 1) {
                    var downGrid = this.m_grids[i + Main.m_sNum];
                    if (undefined == downGrid || numGrid.getText() == downGrid.getText()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    //根据方向进行移动
    Game.prototype.move = function () {
        var index = new Array(Main.m_sNum);
        this.m_isMoved = false;
        if ("right" == this.m_direction) {
            for (var i = 0; i < Main.m_sNum; i++) {
                index[i] = Main.m_sNum * (i + 1) - 1;
            }
            this.merge(index, -1, Main.m_sNum);
        }
        else if ("left" == this.m_direction) {
            for (var i = 0; i < Main.m_sNum; i++) {
                index[i] = Main.m_sNum * i;
            }
            this.merge(index, 1, Main.m_sNum);
        }
        else if ("up" == this.m_direction) {
            for (var i = 0; i < Main.m_sNum; i++) {
                index[i] = i;
            }
            this.merge(index, Main.m_sNum, Main.m_sNum);
        }
        else if ("down" == this.m_direction) {
            for (var i = 0; i < Main.m_sNum; i++) {
                index[i] = (Main.m_sNum - 1) * Main.m_sNum + i;
            }
            this.merge(index, -Main.m_sNum, Main.m_sNum);
        }
    };
    //开始移动
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
            for (var start = startIndex; start != end;) {
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
                var vRow = start % Main.m_sNum;
                var vCol = Math.floor(start / Main.m_sNum);
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
                else {
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
                if (false == _this.isWin()) {
                    console.log("YOU GOT IT!");
                    var xTemp = Main.m_sStageWidth / 2 - _this.stage.stageWidth / 2;
                    var yTemp = Main.m_sStageHeight / 2 - _this.stage.stageHeight / 2;
                    var mask = new Mask(xTemp, yTemp, _this.stage.stageWidth, _this.stage.stageHeight, "YOU GOT IT!");
                    _this.addChild(mask);
                }
            });
        }
        else {
            this.m_isMerge = false;
        }
    };
    //移动到空位置动画
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
    //合并动画
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
    //获得方向
    Game.prototype.getDirection = function (x, y) {
        if (Math.abs(x) > Math.abs(y)) {
            if (x >= 10) {
                this.m_direction = "right";
            }
            else if (x <= -10) {
                this.m_direction = "left";
            }
            else {
                console.log("can't get direction.");
                return false;
            }
        }
        else if (Math.abs(x) < Math.abs(y)) {
            if (y >= 10) {
                this.m_direction = "down";
            }
            else if (y <= -10) {
                this.m_direction = "up";
            }
            else {
                console.log("can't get direction.");
                return false;
            }
        }
        else {
            console.log("can't get direction.");
            return false;
        }
        return true;
    };
    //设置方向
    Game.prototype.setPosition = function (num, grid) {
        var vRow = num % Main.m_sNum;
        var vCol = Math.floor(num / Main.m_sNum);
        grid.setX((vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth);
        grid.setY((vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight);
    };
    //随机方格
    Game.prototype.randomGrid = function () {
        //理论上不会进入
        if (true == this.isFull()) {
            console.log("Grid is full!");
            if (true == this.isGameOver()) {
                console.log("Game Over");
            }
            return;
        }
        var num = Util.rand(Main.m_sNum * Main.m_sNum) - 1;
        while (undefined != this.m_grids[num]) {
            num = Util.rand(Main.m_sNum * Main.m_sNum) - 1;
        }
        this.m_grids[num] = new Grid();
        this.setPosition(num, this.m_grids[num]);
        this.m_grids[num].setWidth(Main.m_sGridWidth);
        this.m_grids[num].setHeight(Main.m_sGridHeight);
        var gridNum = 2 * Util.rand(2);
        var info = Util.getNumInfo(gridNum);
        this.m_grids[num].setColor(info.backgroundColor);
        this.m_grids[num].setText(String(info.num));
        this.addChild(this.m_grids[num]);
        //判断师父无法移动
        if (true == this.isFull()) {
            console.log("Grid is full!");
            if (true == this.isGameOver()) {
                console.log("Game Over");
            }
        }
    };
    //是否没有空方格了
    Game.prototype.isFull = function () {
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++) {
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
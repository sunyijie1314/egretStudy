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
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(gridX, gridY, gridWidth, gridHeight, gridColor, gridText) {
        var _this = _super.call(this) || this;
        _this.assign(gridX, gridY, gridWidth, gridHeight, gridColor, gridText);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Grid.prototype.onAddToStage = function (event) {
        this.createGrid();
    };
    Grid.prototype.createGrid = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(this.m_gridColor);
        shp.graphics.drawRect(this.m_gridX, this.m_gridY, this.m_gridWidth, this.m_gridHeight);
        shp.graphics.endFill();
        this.addChild(shp);
        var _txInfo = new egret.TextField;
        this.addChild(_txInfo);
        _txInfo.size = 28;
        _txInfo.x = 50;
        _txInfo.y = 50;
        _txInfo.textAlign = egret.HorizontalAlign.LEFT;
        _txInfo.textColor = 0x000000;
        _txInfo.type = egret.TextFieldType.DYNAMIC;
        _txInfo.lineSpacing = 6;
        _txInfo.multiline = true;
        _txInfo.text =
            "轻触屏幕调整显示对象位置";
    };
    //get & set
    Grid.prototype.getX = function () { return this.m_gridX; };
    Grid.prototype.setX = function (x) { this.m_gridX = x; };
    Grid.prototype.getY = function () { return this.m_gridY; };
    Grid.prototype.setY = function (y) { this.m_gridY = y; };
    Grid.prototype.getWidth = function () { return this.m_gridWidth; };
    Grid.prototype.setWidth = function (width) { this.m_gridWidth = width; };
    Grid.prototype.getHeight = function () { return this.m_gridHeight; };
    Grid.prototype.setHeight = function (height) { this.m_gridHeight = height; };
    Grid.prototype.getColor = function () { return this.m_gridColor; };
    Grid.prototype.setColor = function (color) { this.m_gridColor = color; };
    Grid.prototype.getText = function () { return this.m_gridText; };
    Grid.prototype.setText = function (text) { this.m_gridText = text; };
    // 为各个参数赋值
    Grid.prototype.assign = function (gridX, gridY, gridWidth, gridHeight, gridColor, gridText) {
        if (undefined == gridX) {
            this.m_gridX = 0;
            this.m_gridY = 0;
            this.m_gridWidth = 100;
            this.m_gridHeight = 100;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridWidth) {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = 100;
            this.m_gridHeight = 100;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridColor) {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = gridWidth;
            this.m_gridHeight = gridHeight;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridText) {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = gridWidth;
            this.m_gridHeight = gridHeight;
            this.m_gridColor = gridColor;
            this.m_gridText = "";
        }
        else {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = gridWidth;
            this.m_gridHeight = gridHeight;
            this.m_gridColor = gridColor;
            this.m_gridText = gridText;
        }
    };
    return Grid;
}(egret.DisplayObjectContainer));
__reflect(Grid.prototype, "Grid");
//# sourceMappingURL=Grid.js.map
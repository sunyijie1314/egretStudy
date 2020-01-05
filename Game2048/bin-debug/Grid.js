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
        _this.m_text = new eui.Label(_this.m_gridText);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Grid.prototype.onAddToStage = function (event) {
        this.createGrid();
    };
    //创建方格
    Grid.prototype.createGrid = function () {
        var gridRect = new eui.Rect(this.m_gridWidth, this.m_gridHeight, this.m_gridColor);
        gridRect.x = this.m_gridX;
        gridRect.y = this.m_gridY;
        this.addChild(gridRect);
        this.m_text.textAlign = egret.HorizontalAlign.CENTER;
        this.m_text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.resetPosition();
        gridRect.addChild(this.m_text);
    };
    //计算实现矩形正中
    Grid.prototype.resetPosition = function () {
        this.m_text.text = this.m_gridText;
        this.m_text.anchorOffsetY = this.m_text.height / 2;
        this.m_text.anchorOffsetX = this.m_text.width / 2;
        this.m_text.x = this.m_gridWidth / 2;
        this.m_text.y = this.m_gridHeight / 2;
    };
    //复制  实际可以直接赋值
    Grid.prototype.copy = function (gridIn) {
        this.setX(gridIn.getX());
        this.setY(gridIn.getY());
        this.setWidth(gridIn.getWidth());
        this.setHeight(gridIn.getHeight());
        this.setColor(gridIn.getColor());
        this.setText(gridIn.getText());
    };
    //get & set 实际可以不设置get & set
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
    Grid.prototype.setText = function (text) {
        this.m_gridText = text;
        this.resetPosition();
    };
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
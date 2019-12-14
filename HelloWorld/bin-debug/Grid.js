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
        var shp = new egret.Shape();
        shp.x = this.m_gridX;
        shp.y = this.m_gridY;
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawCircle(0, 0, 50);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    // 为各个参数赋值
    Grid.prototype.assign = function (gridX, gridY, gridWidth, gridHeight, gridColor, gridText) {
        if (undefined == gridX) {
            this.m_gridX = 0;
            this.m_gridY = 0;
            this.m_gridWidth = 0;
            this.m_gridHeight = 0;
            this.m_gridColor = 0x000000;
            this.m_gridText = "";
        }
        else if (undefined == gridWidth) {
            this.m_gridX = gridX;
            this.m_gridY = gridY;
            this.m_gridWidth = 0;
            this.m_gridHeight = 0;
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
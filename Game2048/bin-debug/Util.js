var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    //得到方格参数
    Util.getNumInfo = function (num) {
        for (var _i = 0, _a = this.nums; _i < _a.length; _i++) {
            var numInfo = _a[_i];
            if (numInfo.num == num) {
                return numInfo;
            }
        }
        //如果不存在枚举中，返回固定值
        var nullInfo = {
            "num": num,
            "backgroundColor": 0xf98383
        };
        return nullInfo;
    };
    //随机数
    Util.rand = function (number) {
        var today = new Date();
        var seed = today.getTime();
        return Math.ceil(this.rnd(seed) * number);
    };
    Util.rnd = function (seed) {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    };
    //方格参数
    Util.nums = [
        {
            "num": 2,
            "backgroundColor": 0xeee4da
        },
        {
            "num": 4,
            "backgroundColor": 0xede0c8
        },
        {
            "num": 8,
            "backgroundColor": 0xf2b179
        },
        {
            "num": 16,
            "backgroundColor": 0xf59563
        },
        {
            "num": 32,
            "backgroundColor": 0xf67c5f
        },
        {
            "num": 64,
            "backgroundColor": 0xf65e3b
        },
        {
            "num": 128,
            "backgroundColor": 0xedcf72
        },
        {
            "num": 256,
            "backgroundColor": 0xedcc61
        },
        {
            "num": 512,
            "backgroundColor": 0xedc850
        },
        {
            "num": 1024,
            "backgroundColor": 0xabe358
        },
        {
            "num": 2048,
            "backgroundColor": 0x4dd9cf
        },
        {
            "num": 4096,
            "backgroundColor": 0xa283f9
        },
        {
            "num": 8192,
            "backgroundColor": 0xf98383
        }
    ];
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map
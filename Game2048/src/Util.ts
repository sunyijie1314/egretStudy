class Util {

    public static nums =
        [
            {
                "num": 2,
                "color": 0x776e65,
                "backgroundColor": 0xeee4da,
                "fontSize": 65
            },
            {
                "num": 4,
                "color": 0x776e65,
                "backgroundColor": 0xede0c8,
                "fontSize": 65
            },
            {
                "num": 8,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf2b179,
                "fontSize": 55
            },
            {
                "num": 16,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf59563,
                "fontSize": 55
            },
            {
                "num": 32,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf67c5f,
                "fontSize": 55
            },
            {
                "num": 64,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf65e3b,
                "fontSize": 55
            },
            {
                "num": 128,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedcf72,
                "fontSize": 45
            },
            {
                "num": 256,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedcc61,
                "fontSize": 45
            },
            {
                "num": 512,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedc850,
                "fontSize": 45
            },
            {
                "num": 1024,
                "color": 0xf9f6f2,
                "backgroundColor": 0xabe358,
                "fontSize": 35
            },
            {
                "num": 2048,
                "color": 0xf9f6f2,
                "backgroundColor": 0x4dd9cf,
                "fontSize": 35
            },
            {
                "num": 4096,
                "color": 0xf9f6f2,
                "backgroundColor": 0xa283f9,
                "fontSize": 35
            },
            {
                "num": 8192,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf98383,
                "fontSize": 35
            }
        ];

    public static getNumInfo(num: number) {
        for (let numInfo of this.nums) {
            if (numInfo.num == num) {
                return numInfo;
            }
        }
        let nullInfo = {
                "num": num,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf98383,
                "fontSize": 25
        }
        return nullInfo;
    }
}
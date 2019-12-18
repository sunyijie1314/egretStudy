class Util {
    public static direction:string = "";
    public static nums =
        [
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

    public static getNumInfo(num: number) {
        for (let numInfo of this.nums) {
            if (numInfo.num == num) {
                return numInfo;
            }
        }
        let nullInfo = {
                "num": num,
                "backgroundColor": 0xf98383
        }
        return nullInfo;
    }
}
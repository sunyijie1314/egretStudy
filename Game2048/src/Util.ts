class Data {
    public m_orgGirdNum:number;
    public m_nowGirdNum:number;
    public m_x:number;
    public m_y:number;
    public m_time:number;
    public m_isMerge:boolean;

    public constructor(orgGridNum:number, nowGridNum:number, x:number, y:number, time:number, isMerge:boolean){
        this.m_orgGirdNum = orgGridNum;
        this.m_nowGirdNum = nowGridNum;
        this.m_x = x;
        this.m_y = y;
        this.m_time = time;
        this.m_isMerge = isMerge;
    }

}



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
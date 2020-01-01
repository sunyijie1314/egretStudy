class Game extends egret.DisplayObjectContainer {

    private m_grids = new Array<Grid>(Main.m_sNumX * Main.m_sNumY);
    // private m_isGrid = new Array<boolean>(Main.m_sNumX * Main.m_sNumY);
    private m_direction:string = "";
    private m_isMerge:boolean = false;
    private m_isOver:boolean = false;
    private m_isMoved:boolean = false;
    private m_aniDataArr:Array<Data>;
    private m_aniCount:number = 0;

    public constructor(){
        super();
        this.m_aniDataArr = [];

        // for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++ )
        // {
        //     this.m_isGrid[i] = false;
        // }
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.start();
        this.addEvent();
    }

    //开始
    private start():void
    {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++ )
        {
            // this.m_isGrid[i] = false;
            if ((undefined !== this.m_grids[i]) && (undefined !== this.m_grids[i].parent))
            {
                this.m_grids[i].parent.removeChild(this.m_grids[i]);
                this.m_grids[i] = undefined;
            }
        }
        this.randomGrid();
        this.randomGrid();
    }

    private addEvent():void
    {
        var startX:number = 0;
        var startY:number = 0;
        var defferenceX:number = 0;
        var defferenceY:number = 0;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e:egret.TouchEvent) => 
        {
            startX = e.localX;
            startY = e.localY;
        }, this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e:egret.TouchEvent) => 
        {
            defferenceX = e.localX - startX;
            defferenceY = e.localY - startY;
            if (true == this.getDirection(defferenceX, defferenceY))
            {
                this.move();
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
    }

    private isWin():boolean
    {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++)
        {
            // if ((true == this.m_isGrid[i]) && ("2048" == this.m_grids[i].getText()))
            if ((undefined != this.m_grids[i]) && ("2048" == this.m_grids[i].getText()))
            {
                return true;
            }
        }
        return false;
    }

    private isGameOver():boolean
    {
        for(var now:number = 0; now < Main.m_sNumX; now++, under = now + Main.m_sNumX)
        {
            var under:number = now + Main.m_sNumX;
            while(under < Main.m_sNumX * Main.m_sNumY)
            {
                if(this.m_grids[now].getText() == this.m_grids[under].getText())
                {
                    return false;
                }
                var right:number = now + 1;
                if((0 !== (right % Main.m_sNumX)) && (this.m_grids[now].getText() == this.m_grids[right].getText()))
                {
                    return false;
                }
                now = now + Main.m_sNumX;
                under = under + Main.m_sNumX;
            }
        }
        return true;
    }

    private move():void
    {
        var index:number[] = new Array<number>(Main.m_sNumY);
        this.m_isMoved = false;
        if ("right" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNumY; i++)
            {
                index[i] = Main.m_sNumX * (i + 1) - 1;
            }
            this.merge(index, -1, Main.m_sNumX);
        }
        else if ("left" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNumY; i++)
            {
                index[i] = Main.m_sNumX * i;
            }
            this.merge(index, 1, Main.m_sNumX);
        }
        else if ("up" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNumX; i++)
            {
                index[i] = i;
            }
            this.merge(index, Main.m_sNumX, Main.m_sNumY);
        }
        else if ("down" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNumX; i++)
            {
                index[i] = (Main.m_sNumY - 1) * Main.m_sNumX + i;
            }
            this.merge(index, -Main.m_sNumX, Main.m_sNumY);
        }
        
    }

    private animateMove(start:number, next:number, time:number, isMerge:boolean):void
    {
        let vRow = start % Main.m_sNumX;
        let vCol = Math.floor(start / Main.m_sNumY);
        let fromX = this.m_grids[next].getX();
        let fromY = this.m_grids[next].getY();
        let toX = (vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth;
        let toY = (vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight;

        let data:Data = new Data(next, start, toX - fromX, toY - fromY, 50 * time, isMerge);
        this.m_aniDataArr.push(data);
    }

    private merge(startIndexs:number[], nextNum:number, layerNum:number):void
    {
        if (0 != this.m_aniDataArr.length)
        {
            console.log("aniDataArr is not clear, lenth is " + this.m_aniDataArr.length);
            this.m_aniDataArr.length = 0;
        }
        if (true == this.m_isMerge)
        {
            console.log("now is merging.");
            return;
        }
        if (true == this.m_isOver)
        {
            console.log("now is game over.");
            return;
        }
        console.log("----------------------start----------------------");
        this.m_isMerge = true;
        for (let startIndex of startIndexs)
        {
            var next = startIndex + nextNum;
            let end = startIndex + nextNum * (layerNum - 1)
            for (var start = startIndex; start !== end; )
            {
                if (0 != this.m_aniCount)
                {
                    continue;
                }
                // while (false == this.m_isGrid[next])
                while (undefined == this.m_grids[next])
                {
                    // if ((next == end) && (false == this.m_isGrid[end]))
                    if ((next == end) && (undefined == this.m_grids[end]))
                    {
                        break;
                    }
                    next = next + nextNum;
                }
                // if (false == this.m_isGrid[next])
                if (undefined == this.m_grids[next])
                {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }

                let lSpace = Math.abs((start - next) / nextNum);
                //移动到空位置
                // if (false == this.m_isGrid[start])
                if (undefined == this.m_grids[start])
                {
                    this.m_grids[start] = new Grid();
                    this.m_grids[start].copy(this.m_grids[next]);
                    this.setPosition(start, this.m_grids[start]);
                    this.addChild(this.m_grids[start]);
                    this.m_grids[start].visible = false;
                    // this.m_isGrid[start] = true;
                    // this.m_isGrid[next] = false;
                    this.m_grids[next] = undefined;
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
                //合并
                else if (this.m_grids[start].getText() == this.m_grids[next].getText())
                {
                    // var vGrid:Grid = new Grid();
                    // let num = Number(this.m_grids[start].getText());
                    // let txt = String(num * 2);
                    // let numInfo = Util.getNumInfo(num * 2);
                    // this.m_grids[start].setText(txt);
                    // this.m_grids[start].setColor(numInfo.backgroundColor);
                    this.m_grids[next] = undefined;
                    this.animateMove(start, next, lSpace, true);
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
                if ((end == next) || ((next == start + nextNum) && (undefined != this.m_grids[next])))
                {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                else
                {
                    next = next + nextNum;
                }    
            }
        }
        if (undefined == this.m_aniDataArr)
        {
            this.m_isMerge = false;
        }
        else
        {
            this.m_aniCount = this.m_aniDataArr.length;
        }
        //this.animate();
    }

    private animate():void
    {
        while((undefined != this.m_aniDataArr) && (0 < this.m_aniDataArr.length))
        {
            console.log("length:" + length);
            for(var i = 0; i < this.m_aniDataArr.length; i++)
            {
                console.log("m_orgGirdNum:" + this.m_aniDataArr[i].m_orgGirdNum);
                console.log("m_nowGirdNum:" + this.m_aniDataArr[i].m_nowGirdNum);
                console.log("m_x:" + this.m_aniDataArr[i].m_x);
                console.log("m_y:" + this.m_aniDataArr[i].m_y);
                console.log("m_time:" + this.m_aniDataArr[i].m_time);
                console.log("m_isMerge:" + this.m_aniDataArr[i].m_isMerge);
                console.log("-------------------------------------------------------");
            }

            let dataTemp:Data = this.m_aniDataArr[0];
            if (true == dataTemp.m_isMerge)
            {
                this.mergeAni(dataTemp, true);
            }
            else
            {               
                this.moveAni(dataTemp, true);
            }
            this.m_aniDataArr.shift();

        }
    }

    private mergeAni(dataTemp:Data, out:boolean):void
    {
        egret.Tween.get(this.m_grids[dataTemp.m_orgGirdNum])
            .to({x:dataTemp.m_x, y:dataTemp.m_y}, dataTemp.m_time, egret.Ease.sineIn)
            .call(() => 
            {
                if (undefined !== this.m_grids[dataTemp.m_orgGirdNum])
                {
                    let num = Number(this.m_grids[dataTemp.m_nowGirdNum].getText());
                    let txt = String(num * 2);
                    let numInfo = Util.getNumInfo(num * 2);
                    this.m_grids[dataTemp.m_nowGirdNum].setText(txt);
                    this.m_grids[dataTemp.m_nowGirdNum].setColor(numInfo.backgroundColor);
                    this.m_grids[dataTemp.m_orgGirdNum].parent.removeChild(this.m_grids[dataTemp.m_nowGirdNum]);
                    this.m_grids[dataTemp.m_orgGirdNum].parent.addChild(this.m_grids[dataTemp.m_nowGirdNum]);
                    this.m_grids[dataTemp.m_orgGirdNum].parent.removeChild(this.m_grids[dataTemp.m_orgGirdNum]);
                    this.m_grids[dataTemp.m_orgGirdNum] = undefined;
                } 
                // this.m_isGrid[dataTemp.m_orgGirdNum] = false;
                this.m_isMoved = true;
                if (true == out)
                {
                    this.judge();
                }
            });
    }

    private moveAni(dataTemp:Data, out:boolean):void
    {
        egret.Tween.get(this.m_grids[dataTemp.m_orgGirdNum])
            .to({x:dataTemp.m_x, y:dataTemp.m_y}, dataTemp.m_time, egret.Ease.sineIn)
            .call(() => 
            {
                this.m_grids[dataTemp.m_nowGirdNum].visible = true;
                if (undefined !== this.m_grids[dataTemp.m_orgGirdNum])
                {
                    this.m_grids[dataTemp.m_orgGirdNum].parent.removeChild(this.m_grids[dataTemp.m_orgGirdNum]);
                    this.m_grids[dataTemp.m_orgGirdNum] = undefined;
                    // this.m_isGrid[dataTemp.m_nowGirdNum] = true;
                    // this.m_isGrid[dataTemp.m_orgGirdNum] = false;
                } 
                this.m_isMoved = true; 
                if (true == out)
                {
                    this.judge();
                }
            });
    }

    // public moveByAndFadeOut(x: number, y: number, time: number, grid:Grid) {
    //     return new Promise(resolve => {
    //         egret.Tween.get(grid)
    //             .to({
    //                 x: x,
    //                 y: y
    //             }, time, egret.Ease.sineInOut)
    //             .to({
    //                 alpha: 0
    //             }, 250)
    //             .call(() => {
    //                 grid.parent.removeChild(grid);
    //                 resolve();
    //             });
    //     });
    // }

    private judge():void
    {
        this.m_aniCount--;
        if (0 != this.m_aniCount)
        {
            return;
        }
        if (true == this.m_isMoved && 0 == this.m_aniDataArr.length)
        {
            this.m_isMerge = false;
            this.randomGrid();
            if (true == this.isWin())
            {
                console.log("YOU GOT IT!");
            }
        }
    }

    private getDirection(x:number, y:number):boolean
    {
        if (Math.abs(x) > Math.abs(y))
        {
            if (x >= 0)
            {
                this.m_direction = "right";
            }
            else
            {
                this.m_direction = "left";
            }
        }
        else if (Math.abs(x) < Math.abs(y))
        {
            if (y >= 0)
            {
                this.m_direction = "down";
            }
            else
            {
                this.m_direction = "up";
            }
        }
        else
        {
            console.log("can't get direction.");
            return false;
        }
        return true;
    }

    private setPosition(num:number, grid:Grid):void
    {
        var vRow = num % Main.m_sNumX;
        var vCol = Math.floor(num / Main.m_sNumY);
        grid.setX((vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth);
        grid.setY((vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight);
    }

    //随机方格
    private randomGrid():void
    {
        if (true == this.isFull())
        {
            console.log("Grid is full!");
            if (true == this.isGameOver())
            {
                console.log("Game Over");
            }
            return;
        }
        
        var num:number = Main.rand( Main.m_sNumX * Main.m_sNumY ) - 1;
        // while (true == this.m_isGrid[num])
        while (undefined != this.m_grids[num])
        {
            num = Main.rand( Main.m_sNumX * Main.m_sNumY ) - 1;
        }
        // this.m_isGrid[num] = true;
        this.m_grids[num] = new Grid();
        this.setPosition(num, this.m_grids[num]);
        this.m_grids[num].setWidth(Main.m_sGridWidth);
        this.m_grids[num].setHeight(Main.m_sGridHeight);

        var gridNum = 2 * Main.rand(2);
        let info:any = Util.getNumInfo(gridNum);
        this.m_grids[num].setColor(info.backgroundColor);
        this.m_grids[num].setText(String(info.num));
        this.addChild(this.m_grids[num]);
    }

    //是否没有空方格了
    private isFull():boolean
    {
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++)
        {
            // if (false == this.m_isGrid[i])
            if (undefined == this.m_grids[i])
            {
                return false;
            }
        }
        return true;
    }
}
class Game extends egret.DisplayObjectContainer {

    private m_grids = new Array<Grid>(Main.m_sNumX * Main.m_sNumY);
    private m_isGrid = new Array<boolean>(Main.m_sNumX * Main.m_sNumY);
    private direction:string = "";
    private isMerge:boolean = false;
    private isOver:boolean = false;
    private isMove:boolean = false;

    public constructor(){
        super();
        for (var i = 0; i < Main.m_sNumX * Main.m_sNumY; i++ )
        {
            this.m_isGrid[i] = false;
        }
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
            this.m_isGrid[i] = false;
            if ((undefined !== this.m_grids[i]) && (undefined !== this.m_grids[i].parent))
            {
                this.m_grids[i].parent.removeChildren();
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
            console.log("startX = " + startX);
            console.log("startY = " + startY);
        }, this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e:egret.TouchEvent) => 
        {
            defferenceX = e.localX - startX;
            defferenceY = e.localY - startY;
            console.log("e.localX =" + e.localX );
            console.log("e.localY =" + e.localY );
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
            if ("2048" == this.m_grids[i].getText())
            {
                return true;
            }
        }
        return false;
    }

    private move():void
    {
        var index:number[] = new Array<number>(Main.m_sNumY);
        this.isMove = false;
        if ("right" == this.direction)
        {
            for (var i = 0; i < Main.m_sNumY; i++)
            {
                index[i] = Main.m_sNumX * (i + 1) - 1;
            }
            this.merge(index, -1, Main.m_sNumX);
        }
        else if ("left" == this.direction)
        {
            for (var i = 0; i < Main.m_sNumY; i++)
            {
                index[i] = Main.m_sNumX * i;
            }
            this.merge(index, 1, Main.m_sNumX);
        }
        else if ("up" == this.direction)
        {
            for (var i = 0; i < Main.m_sNumX; i++)
            {
                index[i] = i;
            }
            this.merge(index, Main.m_sNumX, Main.m_sNumY);
        }
        else if ("down" == this.direction)
        {
            for (var i = 0; i < Main.m_sNumX; i++)
            {
                index[i] = (Main.m_sNumY - 1) * Main.m_sNumX + i;
            }
            this.merge(index, -Main.m_sNumX, Main.m_sNumY);
        }
        
    }

    private merge(startIndexs:number[], nextNum:number, layerNum:number):void
    {
        if (true == this.isMerge)
        {
            console.log("now is merging.");
            return;
        }
        if (true == this.isOver)
        {
            console.log("now is game over.");
            return;
        }
        this.isMerge = true;
        for (let startIndex of startIndexs)
        {
            var next = startIndex + nextNum;
            let end = startIndex + nextNum * (layerNum - 1)
            for (var start = startIndex; start !== end; )
            {
                while (false == this.m_isGrid[next])
                {
                    if ((next == end) && (false == this.m_isGrid[end]))
                    {
                        break;
                    }
                    next = next + nextNum;
                }
                if (false == this.m_isGrid[next])
                {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }

                if (false == this.m_isGrid[start])
                {
                    this.m_grids[start] = new Grid();
                    this.m_grids[start].copy(this.m_grids[next]);
                    this.setPosition(start, this.m_grids[start]);
                    if (undefined !== this.m_grids[next].parent)
                    {
                        this.m_grids[next].parent.addChild(this.m_grids[start]);
                        this.m_grids[next].parent.removeChild(this.m_grids[next]);
                        this.m_grids[next] = undefined;
                        this.m_isGrid[start] = true;
                        this.m_isGrid[next] = false;
                    }
                    this.isMove = true;   
                }
                else if (this.m_grids[start].getText() == this.m_grids[next].getText())
                {
                    var vGrid:Grid = new Grid();
                    let num = Number(this.m_grids[start].getText());
                    let txt = String(num * 2);
                    let numInfo = Util.getNumInfo(num * 2);
                    this.m_grids[start].setText(txt);
                    this.m_grids[start].setColor(numInfo.backgroundColor);
                    vGrid.copy(this.m_grids[start]);
                    if ((undefined !== this.m_grids[next].parent) && (undefined !== this.m_grids[start].parent))
                    {
                        //巨坑 不重新添加无法更新自己状态
                        this.m_grids[start].parent.removeChild(this.m_grids[start]);
                        this.m_grids[start] = vGrid;
                        this.m_grids[next].parent.addChild(this.m_grids[start]);
                        this.m_grids[next].parent.removeChild(this.m_grids[next]);
                        this.m_grids[next] = undefined;
                    }
                    this.m_isGrid[next] = false;
                    this.isMove = true;
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }

                if ((end == next) || ((next == start + nextNum) && (true == this.m_isGrid[next])))
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
        this.isMerge = false;
        if (true == this.isMove)
        {
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
                this.direction = "right";
            }
            else
            {
                this.direction = "left";
            }
        }
        else if (Math.abs(x) < Math.abs(y))
        {
            if (y >= 0)
            {
                this.direction = "down";
            }
            else
            {
                this.direction = "up";
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
            //即Game Over
            return;
        }
        
        var num:number = Main.rand( Main.m_sNumX * Main.m_sNumY ) - 1;
        while (true == this.m_isGrid[num])
        {
            num = Main.rand( Main.m_sNumX * Main.m_sNumY ) - 1;
        }
        this.m_isGrid[num] = true;
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
            if (false == this.m_isGrid[i])
            {
                return false;
            }
        }
        return true;
    }
}
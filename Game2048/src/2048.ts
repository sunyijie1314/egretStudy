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
        }, this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e:egret.TouchEvent) => 
        {
            defferenceX = startX - e.localX;
            defferenceY = startY - e.localY;
            this.getDirection(defferenceX, defferenceY);
            this.move();
        }, this);
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
                console.log("startxx " + start);
                console.log("endxx " + end);
                while (false == this.m_isGrid[next])
                {
                    if ((next == end) && (false == this.m_isGrid[end]))
                    {
                        break;
                    }
                    next = next + nextNum;
                    console.log("nextxx " + next);
                }
                console.log("next1 " + next);
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
                    // this.m_grids[start] = this.m_grids[next];
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
                    let num = Number(this.m_grids[start].getText());
                    let txt = String(num * 2);
                    let numInfo = Util.getNumInfo(num * 2);
                    this.m_grids[start].setText(txt);
                    this.m_grids[start].setColor(numInfo.backgroundColor);
                    if (undefined !== this.m_grids[next].parent)
                    {
                        this.m_grids[next].parent.removeChild(this.m_grids[next]);
                        this.m_grids[next] = undefined;
                    }
                    this.m_isGrid[next] = false;
                    this.isMove = true;
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }

                if ((end == next) || (next == start + nextNum))
                {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                else
                {
                    next = next + nextNum;
                }    
                
                console.log("start " + start);
                console.log("next " + next);
                console.log("             ");

                
            }
        }
        this.isMerge = false;
        if (true == this.isMove)
        {
            this.randomGrid();
        }
    }

    private getDirection(x:number, y:number):void
    {
        if (Math.abs(x) > Math.abs(y))
        {
            if (x >= 0)
            {
                this.direction = "left";
            }
            else
            {
                this.direction = "right";
            }
        }
        else if (Math.abs(x) < Math.abs(y))
        {
            if (y >= 0)
            {
                this.direction = "up";
            }
            else
            {
                this.direction = "down";
            }
        }
        else
        {
            console.log("can't get direction.");
        }
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
        this.m_grids[num].setColor(info.color);
        this.m_grids[num].setText(String(info.num));
        this.addChild(this.m_grids[num]);

    }

    //是否没有空方格了
    private isFull():boolean
    {
        for (var i = 1; i < Main.m_sNumX * Main.m_sNumY; i++)
        {
            if (false == this.m_isGrid[i])
            {
                return false;
            }
        }
        return true;
    }
}
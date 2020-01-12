class Game extends egret.DisplayObjectContainer {

    private m_grids = new Array<Grid>(Main.m_sNum * Main.m_sNum);
    private m_direction:string = "";
    private m_isMerge:boolean = false;
    private m_isOver:boolean = false;
    private m_isMoved:boolean = false;

    public constructor(){
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.start();
        this.addEvent();
    }

    //开始
    private start():void
    {
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++ )
        {
            if ((undefined != this.m_grids[i]) && (undefined != this.m_grids[i].parent))
            {
                this.m_grids[i].parent.removeChild(this.m_grids[i]);
                this.m_grids[i] = undefined;
            }
        }
        this.randomGrid();
        this.randomGrid();
    }

    //事件监听：触碰和键盘
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

        //键盘适配
        document.addEventListener("keyup", event => {
            let key = event.code;
            switch (key) {
                case "ArrowLeft":
                    this.m_direction = "left";
                    break;
                case "ArrowRight":
                    this.m_direction = "right";
                    break;
                case "ArrowUp":
                    this.m_direction = "up";
                    break;
                case "ArrowDown":
                    this.m_direction = "down";
                    break;
            }
            this.move();
        });
    }

    //是否赢，达到2048
    private isWin():boolean
    {
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++)
        {
            if ((undefined != this.m_grids[i]) && ("2048" == this.m_grids[i].getText()))
            {
                return true;
            }
        }
        return false;
    }

    //是否失败
    private isGameOver():boolean
    {
        for (let i = 0; i < Main.m_sNum * Main.m_sNum; i++) 
        {
            let numGrid = this.m_grids[i];
            if (undefined == numGrid) 
            {
                return false;
            }
            else 
            {
                if (i % Main.m_sNum < Main.m_sNum - 1) 
                {
                    let rightGrid = this.m_grids[i + 1];
                    if (undefined == rightGrid || numGrid.getText() == rightGrid.getText()) 
                    {
                        return false;
                    }
                }

                if (i / Main.m_sNum < Main.m_sNum - 1) 
                {
                    let downGrid = this.m_grids[i + Main.m_sNum];
                    if (undefined == downGrid || numGrid.getText() == downGrid.getText()) 
                    {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //根据方向进行移动
    private move():void
    {
        var index:number[] = new Array<number>(Main.m_sNum);
        this.m_isMoved = false;
        if ("right" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNum; i++)
            {
                index[i] = Main.m_sNum * (i + 1) - 1;
            }
            this.merge(index, -1, Main.m_sNum);
        }
        else if ("left" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNum; i++)
            {
                index[i] = Main.m_sNum * i;
            }
            this.merge(index, 1, Main.m_sNum);
        }
        else if ("up" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNum; i++)
            {
                index[i] = i;
            }
            this.merge(index, Main.m_sNum, Main.m_sNum);
        }
        else if ("down" == this.m_direction)
        {
            for (var i = 0; i < Main.m_sNum; i++)
            {
                index[i] = (Main.m_sNum - 1) * Main.m_sNum + i;
            }
            this.merge(index, -Main.m_sNum, Main.m_sNum);
        }
        
    }

    //开始移动
    private merge(startIndexs:number[], nextNum:number, layerNum:number):void
    {

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
        const mergePromises = [];
        for (let startIndex of startIndexs)
        {
            var next = startIndex + nextNum;
            let end = startIndex + nextNum * (layerNum - 1)
            for (var start = startIndex; start != end; )
            {
                while (undefined == this.m_grids[next])
                {
                    if ((next == end) && (undefined == this.m_grids[end]))
                    {
                        break;
                    }
                    next = next + nextNum;
                }
                if (undefined == this.m_grids[next])
                {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }

                let lSpace = Math.abs((start - next) / nextNum);
                let vRow = start % Main.m_sNum;
                let vCol = Math.floor(start / Main.m_sNum);
                let fromX = this.m_grids[next].getX();
                let fromY = this.m_grids[next].getY();
                let toX = (vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth;
                let toY = (vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight;

                //移动到空位置
                if (undefined == this.m_grids[start])
                {
                    this.m_grids[start] = this.m_grids[next];
                    mergePromises.push(this.moveBy(toX - fromX, toY - fromY, 50 * lSpace, this.m_grids[next]));             
                    this.m_grids[next] = undefined;
                }
                //合并
                else if (this.m_grids[start].getText() == this.m_grids[next].getText())
                {
                    let num = Number(this.m_grids[start].getText());
                    let txt = String(num * 2);
                    let numInfo = Util.getNumInfo(num * 2);
                    this.m_grids[start].setText(txt);
                    this.m_grids[start].setColor(numInfo.backgroundColor);
                    this.removeChild(this.m_grids[start]);
                    this.addChild(this.m_grids[start]);
                    mergePromises.push(this.moveByAndFadeOut(toX - fromX, toY - fromY, 50 * lSpace, this.m_grids[next]));
                    this.m_grids[next] = undefined;

                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }
                else
                {
                    start = start + nextNum;
                    next = start + nextNum;
                    continue;
                }

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
        if (mergePromises.length > 0) {
            // 待所有动画结束后， 将 this.m_isMerge 置为 false
            Promise.all(mergePromises).then(() => {
                this.m_isMerge = false;
                this.randomGrid();
            if (false == this.isWin())
            {
                //添加提示时记得只需要成功一次就行
                console.log("YOU GOT IT!");
            }
            });
        }
        else {
            this.m_isMerge = false;
        }
    }

    //移动到空位置动画
    public moveBy(x: number, y: number, time: number, grid:Grid) {
        return new Promise(resolve => {
            egret.Tween.get(grid)
                .to({
                    x: x,
                    y: y
                }, time, egret.Ease.sineInOut)
                .call(resolve);
        });
    }

    //合并动画
    public moveByAndFadeOut(x: number, y: number, time: number, grid:Grid) {
        return new Promise(resolve => {
            egret.Tween.get(grid)
                .to({
                    x: x,
                    y: y
                }, time, egret.Ease.sineInOut)
                .to({
                    alpha: 0
                }, 250)
                .call(() => {
                    grid.parent.removeChild(grid);
                    resolve();
                });
        });
    }

    //获得方向
    private getDirection(x:number, y:number):boolean
    {
        if (Math.abs(x) > Math.abs(y))
        {
            if (x >= 10)
            {
                this.m_direction = "right";
            }
            else if (x <= -10)
            {
                this.m_direction = "left";
            }
            else
            {
                console.log("can't get direction.");
                return false;
            }
        }
        else if (Math.abs(x) < Math.abs(y))
        {
            if (y >= 10)
            {
                this.m_direction = "down";
            }
            else if (y <= -10)
            {
                this.m_direction = "up";
            }
            else
            {
                console.log("can't get direction.");
                return false;
            }
        }
        else
        {
            console.log("can't get direction.");
            return false;
        }
        return true;
    }

    //设置方向
    private setPosition(num:number, grid:Grid):void
    {
        var vRow = num % Main.m_sNum;
        var vCol = Math.floor(num / Main.m_sNum);
        grid.setX((vRow + 1) * Main.m_sSpace + vRow * Main.m_sGridWidth);
        grid.setY((vCol + 1) * Main.m_sSpace + vCol * Main.m_sGridHeight);
    }

    //随机方格
    private randomGrid():void
    {
        //理论上不会进入
        if (true == this.isFull())
        {
            console.log("Grid is full!");
            if (true == this.isGameOver())
            {
                console.log("Game Over");
            }
            return;
        }
        
        var num:number = Util.rand( Main.m_sNum * Main.m_sNum ) - 1;
        while (undefined != this.m_grids[num])
        {
            num = Util.rand( Main.m_sNum * Main.m_sNum ) - 1;
        }
        this.m_grids[num] = new Grid();
        this.setPosition(num, this.m_grids[num]);
        this.m_grids[num].setWidth(Main.m_sGridWidth);
        this.m_grids[num].setHeight(Main.m_sGridHeight);

        var gridNum = 2 * Util.rand(2);
        let info:any = Util.getNumInfo(gridNum);
        this.m_grids[num].setColor(info.backgroundColor);
        this.m_grids[num].setText(String(info.num));
        this.addChild(this.m_grids[num]);

        //判断师父无法移动
        if (true == this.isFull())
        {
            console.log("Grid is full!");
            if (true == this.isGameOver())
            {
                console.log("Game Over");
            }
        }
    }

    //是否没有空方格了
    private isFull():boolean
    {
        for (var i = 0; i < Main.m_sNum * Main.m_sNum; i++)
        {
            if (undefined == this.m_grids[i])
            {
                return false;
            }
        }
        return true;
    }
    
}
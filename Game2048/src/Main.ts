//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    public static m_sNum:number = 4;
    public static m_sGridWidth:number = 400 / Main.m_sNum;
    public static m_sGridHeight:number = 400 / Main.m_sNum;
    public static m_sSpace:number = 40 / Main.m_sNum;
    private static m_sStageWidth:number = Main.m_sGridWidth * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
    private static m_sStageHeight:number = Main.m_sGridHeight * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
    private static m_sStageColor:number = 0x000000;
    private m_numInput:eui.TextInput;
    private m_stageGrid:eui.Rect;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGrid();    
        this.numTextInput(); 
        this.btnReset();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

       //创建背景
    private createGrid():void
    {
        this.m_stageGrid = undefined;
        this.m_stageGrid = new eui.Rect(Main.m_sStageWidth, Main.m_sStageHeight, Main.m_sStageColor);
        this.m_stageGrid.x = this.stage.stageWidth / 2 - Main.m_sStageWidth / 2;
        this.m_stageGrid.y = this.stage.stageHeight / 2 - Main.m_sStageHeight / 2;
        this.addChild(this.m_stageGrid);
        
        //背景小方格
        for (var col = 0; col < Main.m_sNum; col++)
        {
            for (var row = 0; row < Main.m_sNum; row++)
            {
                var count = col * Main.m_sNum + row;
                var vGrid:eui.Rect = new eui.Rect(Main.m_sGridWidth, Main.m_sGridHeight, 0x0000ff);
                vGrid.x = (row + 1) * Main.m_sSpace + row * Main.m_sGridWidth;
                vGrid.y = (col + 1) * Main.m_sSpace + col * Main.m_sGridHeight;
                this.m_stageGrid.addChild(vGrid);
            }
        }

        var myGrid:Game = new Game();
        this.m_stageGrid.addChild(myGrid);

        //var mask:Mask = new Mask();
        //this.addChild(mask);
    }

    //重置按钮  //图片资源不知道为何加载不上
    private btnReset():void
    {
        var btn = new eui.Button();
        btn.x = this.stage.stageWidth / 2 + 30;
        btn.y = 30;
        btn.label = "重新开始";
        // console.log(btn.source);
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }

    private onTouch(event:egret.TouchEvent) {
        ///获得当前按钮
        var btn:eui.Button = <eui.Button>event.target;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                break;
            case egret.TouchEvent.TOUCH_END:
                break;
            case egret.TouchEvent.TOUCH_TAP:
                if (1 < Main.m_sNum && 8 > Main.m_sNum)
                {
                    this.removeChild(this.m_stageGrid);
                    this.createGrid();
                }
                break;
            default :
                break;
        }

    }

    //输入框和文字添加
    private numTextInput():void
    {
        var labelTemp:eui.Label = new eui.Label();
        labelTemp.text = "输入1~7";
        labelTemp.textColor = 0x000000;
        labelTemp.size = 20;
        labelTemp.x = this.stage.stageWidth / 2 - 200;
        labelTemp.y = 20;
        this.addChild(labelTemp);

        this.m_numInput = new eui.TextInput();
        this.m_numInput.prompt = "n*n方格";
        this.m_numInput.maxChars = 1;
        this.m_numInput.x = this.stage.stageWidth / 2 - 200;
        this.m_numInput.y = 45;
        this.m_numInput.width = 170;
        this.addChild(this.m_numInput);
        this.m_numInput.addEventListener(egret.Event.CHANGE,this.onChange,this);
    }

    private onChange(e:egret.Event) {
        console.log(this.m_numInput.text);
        Main.m_sNum = Number(this.m_numInput.text);
        Main.m_sGridWidth = 400 / Main.m_sNum;
        Main.m_sGridHeight = 400 / Main.m_sNum;
        Main.m_sSpace = 40 / Main.m_sNum;
        Main.m_sStageWidth = Main.m_sGridWidth * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
        Main.m_sStageHeight = Main.m_sGridHeight * Main.m_sNum + Main.m_sSpace * (Main.m_sNum + 1);
        
    }
}
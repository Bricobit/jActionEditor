class TextFader extends Sprite {

	/*private var*/ #_textField     /*:TextField*/     = new TextField();
    /*private var*/ #_textQueue     /*:Array<Object>*/ = [];
    /*private var*/ #_isAnimating   /*:Boolean*/       = false;
  ///*private var*/ #_onFrameBind   /*:Function*/      = this.#OnFrame.bind(this);
    /*private var*/ #_targetY       /*:Number*/        = 0;
    /*private var*/ #_animationTime /*:Number*/        = 0;
    /*private var*/ #_startTime     /*:Number*/        = 0;
    /*private var*/ #_startY        /*:Number*/        = 0;
    ///*private var*/ #_icon          /*:String*/        = '<svg  style="vertical-align: middle;" vertical-align: text-top; stroke="white" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    /*private var*/ #_icon          /*:String*/        = '🗨️';
    /*private var*/ #_frameId       /*:int*/           = null;
    /*private var*/ #_color         /*:String*/        = '#0c627f';
    /*private var*/ #_iniSW         /*:Number*/        = 0;
    /*private var*/ #_iniSH         /*:Number*/        = 0;

    /*public function*/ constructor() {
        super();
        const tf           /*:TextFormat*/ = this.#_textField.defaultTextFormat;
        tf.letterSpacing                   = 0.1;
        tf.size                            = 14;
        tf.color                           = '#ffffff';
        this.#_textField.defaultTextFormat = tf
		this.#_textField.autoSize          = 'center';
		this.#_textField.alpha             = 0;
        this.#_textField.background        = true;
        this.#_textField.backgroundColor   = this.#_color;
        this.#_textField.borderRadius      = '10px';
        this.#_textField.padding           = '10px';
        this.#_textField.textShadow        = '#39597a 1px 1px 0';
        this.#Center();
    }

    /*public function*/ pushText(text/*:String*/, color='', verticalDistance/*:int*/ = 0,animationTime/*:int*/=0)/*:void*/ {
        if(color==''){color = this.#_color;}
        this.#_textQueue.push({ text: text, verticalDistance: verticalDistance, animationTime: animationTime,color:color});
        if (!this.#_isAnimating) {
            this.#_isAnimating = true;
            this.addChild(this.#_textField);
            this.#ShowNextText();
            this.#OnFrame();
            //this.addEventListener(Event.ENTER_FRAME, this.#_onFrameBind);
        }
    }

    /*private function*/ #Center()/*:void*/ {
        this.#_iniSW = stage.stageWidth;
        this.#_iniSH = stage.stageHeight;
        this.move(stage.stageWidth/2,stage.stageHeight/2);
        this.#_textField.x = 0-(this.#_textField.width/2);
    }

    /*private function*/ #ShowNextText()/*:void*/ {
        if (this.#_textQueue.length > 0) {
            const nextText /*:Object*/       = this.#_textQueue.shift();
            this.#_textField.htmlText        = this.#_icon+' '+nextText.text;
            this.#_textField.backgroundColor = nextText.color;
            this.#_animationTime             = nextText.animationTime;
            this.#_targetY                   = -nextText.verticalDistance;
            //this.#Center();
			if(this.#_animationTime==0){//Auto time
				this.#_animationTime = this.#CalculateAnimationTime(this.#_textField.text);//Calculate time depending on the length of the text
			}
            if(this.#_targetY==0){//Auto distance
                this.#_targetY = -(this.#_animationTime / 1000) * 25; //25 px por cada 1000ms
            }
            this.#_startY          = 0;
            this.#_textField.alpha = 1;
            this.#_textField.y     = this.#_startY;
            this.#_startTime       = Date.now();
        }else{
            //this.removeEventListener(Event.ENTER_FRAME, this.#_onFrameBind);
            window.cancelAnimationFrame(this.#_frameId);
            this.#_isAnimating     = false;
            this.removeChild(this.#_textField);
        }
    }

    /*private function*/ #OnFrame(e /*:Event*/)/*:void*/ {
        const progress /*:Number*/ = (Date.now() - this.#_startTime) / this.#_animationTime;
        this.#_textField.y         = Math.round(this.#_startY + progress * (this.#_targetY - this.#_startY));
        if(this.#_iniSW !== stage.stageWidth ||  this.#_iniSH !== stage.stageHeight){
            
            this.#Center();
        }
        this.#_textField.alpha     = 1 - progress;
        this.#_frameId             = window.requestAnimationFrame(this.#OnFrame.bind(this)); 
        if (progress >= 1) {
            this.#_textField.y     = this.#_targetY;
            this.#_textField.alpha = 0;
			this.#ShowNextText();
        }
    }

    /*private function*/ #CalculateAnimationTime(text/*:String*/)/*:int*/ {
        const averageReadingSpeed /*:Number*/ = 90;                                 //Average reading speed in words per minute
        const wordsPerSecond      /*:Number*/ = averageReadingSpeed / 60;
        const wordsCount          /*:Number*/ = text.split(" ").length;
        const animationTime       /*:Number*/ = wordsCount / wordsPerSecond * 1000; //Estimated duration in milliseconds
        return Math.max(animationTime, 2000);                                       //Minimum duration of 2 second
    }
}
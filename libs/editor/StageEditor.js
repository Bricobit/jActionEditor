/*
{jActionFramework} - based on jAction Library - https://jaction.org
Author: Javier Vicente Medina - giskard2010@hotmail.com - http://jvm.bricobit.com - Start date: 2018
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 

Package:      samples/libs/samples/StageEditor 
Class:	      public static class StageEditor
Version:
0.0.1 - Last update 2024-05-08 -> First version
*/
class StageEditor extends Sprite{

    /*private var*/ #_startDragPoint       /*:Point*/    = null;
    /*private var*/ #_dragging             /*:Boolean*/  = false;
    /*private var*/ #_rules                /*:Rule*/     = new Rule();
    /*private var*/ #_scrollable_spt       /*:Sprite*/   = new Sprite();
    /*private var*/ #_stage_spt            /*:Sprite*/   = new Sprite();
    /*private var*/ #_backStage_spt        /*:Sprite*/   = new Sprite();                                
    /*private var*/ #_backStageMargin      /*:Number*/   = 300;
    /*private var*/ #_stageWidth           /*:Number*/   = 550;
    /*private var*/ #_stageHeight          /*:Number*/   = 400;
    /*private var*/ #_ruleV                /*:Rule*/     = null;
    /*private var*/ #_ruleH                /*:Rule*/     = null;
    /*private var*/ #_mouseMoveHandlerBind /*:Function*/ = this.#MouseMoveHandler.bind(this);
    /*private var*/ #_startDragBind        /*:Function*/ = this.#StartDrag.bind(this);
    /*private var*/ #_stopDragBind         /*:Function*/ = this.#StopDrag.bind(this);
    
    /*public function*/ constructor (width/*:Number*/=800, height/*:Number*/=600){
		super()
        //This container
        this.width                  = width;
        this.height                 = height;
        this.outline                = '#ffffff solid 1px';
        this.horizontalScrollPolicy = 'off';
        this.verticalScrollPolicy   = 'off';
        //Rules for this
        this.#_ruleH = this.#_rules.createHRuleInTo(this);
        this.#_ruleV = this.#_rules.createVRuleInTo(this);

        //Scrollable container
        this.#_scrollable_spt.outline                = '#d90d0d solid 1px';
        this.#_scrollable_spt.width                  = width-15;
        this.#_scrollable_spt.height                 = height-15;
        this.#_scrollable_spt.horizontalScrollPolicy = 'auto';
        this.#_scrollable_spt.verticalScrollPolicy   = 'auto';
        this.#_scrollable_spt.move(15,15);
        this.addChild(this.#_scrollable_spt);
       

        //Back stage
        this.#_backStage_spt.backgroundColor = '#c2c2c2';
        this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_DOWN      , this.#_startDragBind);
        this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_UP        , this.#_stopDragBind);

       

        //Add backStage in to scrollable
        this.#_scrollable_spt.addChild(this.#_backStage_spt);
        //Add stage in to backStage
        this.#_backStage_spt.addChild(this.#_stage_spt);
      
     
         //Stage
         this.stageSize(this.#_stageWidth,this.#_stageHeight);
         this.#_stage_spt.backgroundColor = '#ffffff';
        //this.#_backStage_spt.addEventListener(MouseEvent.CLICK, this.#OnClick.bind(this));
        //this.addEventListener('scroll',this.#OnScroll.bind(this));
        //this.addEventListener(ScrollEvent.SCROLL, this.#OnScroll.bind(this));
	}

   /*private function*/  #OnScroll(e/*:Event*/)/*:void*/ {
 
    // if(e.direction=='vertical'){
    //     this.#_ruleH.position = 'sticky';
    //     this.#_ruleV.position = 'absolute';
    // }else{
    //     this.#_ruleH.position = 'absolute';
    //     this.#_ruleV.position = 'sticky';
    // }

    }
 /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * #StartDrag(lockCenter:Boolean = false, bounds:Rectangle = null):void
     * Permite al usuario arrastrar el elemento sprite especificado.
     * lockCenter && bounds Not yet implemented
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*private function*/ #StartDrag(e/*:MouseEvent*/=null)/*:void*/{
        if(!this.#_dragging){
            //this.dispatchEvent('thumbPress');
            this.#_dragging = true;
            this.#_startDragPoint = this.#_backStage_spt.globalToLocal(new Point(stage.mouseX,stage.mouseY));
            //this.#_backStage_spt.startDrag();
            stage.addEventListener(MouseEvent.MOUSE_MOVE, this.#_mouseMoveHandlerBind);
        }
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * #StopDrag():void
     * 
     * Finaliza el método #StartDrag().
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/
      
    /*private function*/ #StopDrag(e/*:MouseEvent*/=null)/*:void*/{
        if(this.#_dragging){
            //this.dispatchEvent('thumbRelease');
            //if(!this.#_liveDragging){this.dispatchEvent('change');}
            this.#_dragging = false;
            //this.#_backStage_spt.stopDrag();
            stage.removeEventListener(MouseEvent.MOUSE_MOVE, this.#_mouseMoveHandlerBind);
        }
    }
    

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ stageSize(width/*:Number*/,height/*:Number*/)/*:void*/{
        this.stageWidth(width);
        this.stageHeight(height);
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ stageWidth(width/*:Number*/)/*:void*/{
        this.#_backStage_spt.width  = width  + this.#_backStageMargin*2;//550+700*2=1950
        this.#_stage_spt.width      = width;//550
        this.#_backStage_spt.x      = (this.#_scrollable_spt.width/2)-(this.#_backStage_spt.width/2);//785/2=392,5 - 
        this.#_stage_spt.x          = (this.#_backStage_spt.width/2)-(this.#_stage_spt.width/2);
       
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ stageHeight(height/*:Number*/)/*:void*/{
        this.#_backStage_spt.height = height + this.#_backStageMargin*2;
        this.#_stage_spt.height     = height;
        this.#_backStage_spt.y      = (this.#_scrollable_spt.height/2)-(this.#_backStage_spt.height/2);
        this.#_stage_spt.y      = (this.#_backStage_spt.height/2)-(this.#_stage_spt.height/2);
    }
     /**-----------------------------------------------------------------------------------------------------------------------------------
       * 
       * Override from DisplayObject
       * 
       *----------------------------------------------------------------------------------------------------------------------------------*/

      ///*public function*/ set width (value/*:Number*/)/*:void*/{
        //super.width = value;
        //this.node.width = value;
    //}
      ///*public function*/ get width()/*:Number*/{return super.width;}

       /**-----------------------------------------------------------------------------------------------------------------------------------
       * 
       * Override from DisplayObject
       * 
       *----------------------------------------------------------------------------------------------------------------------------------*/

      ///*public function*/ set height (value/*:Number*/)/*:void*/{super.height = value;this.node.height = value;}
      ///*public function*/ get height()/*:Number*/{return super.height;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * setSize Override from DisplayObject
     * 
     * Define la anchura y la altura del objeto de visualización (HTML Element), expresada en píxeles sin contar el padding ni el border
     * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	///*public function*/ setSize(w/*:Number*/,h/*:Number*/)/*:void*/{this.width=w;this.height=h;}



/**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * #MouseMoveHandler(e:Event=null,mp:Number):void 
     * 
     * Establece el progreso del Slider dependiendo de la posición del mouse
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*private function*/ #MouseMoveHandler(e/*:Event*/=null,mp/*:Number*/=null)/*:void*/{ 
        let p = this.globalToLocal(new Point(stage.mouseX,stage.mouseY));
		this.#_backStage_spt.x = p.x-(this.#_startDragPoint.x);
		this.#_backStage_spt.y = p.y-(this.#_startDragPoint.y);
		
        // if(this.#_dragging){this.dispatchEvent('thumbDrag');}      
        // let flag   /*:Boolean*/ = true;
        // let invert /*:Number*/ = 0;
        // let sizeWH /*:Number*/ = 0;
        // let thisXY /*:Number*/ = 0;
        // if(this.#_direction=='horizontal'){
        //     sizeWH = this.width;
        //     thisXY = 0;//this.x;//debe ser la posición x de la base
        //     if(mp==null){
        //         mp = this.mouseX;
        //     }else{
        //         flag=false;
        //         mp = Math.round((mp/this.#_maximum)*sizeWH);
        //     }
        // }else{ 
        //     sizeWH = this.height;
        //     invert=sizeWH;
        //     thisXY = 0;//this.y;//debe ser la posición y de la base
        //     if(mp==null){
        //         mp = this.mouseY;
        //     }else{
        //         flag=false;
        //         mp = invert-Math.round((mp/this.#_maximum)*sizeWH);
        //     }
        // }  
        // let percentMax  /*:Number*/ = Math.round((mp/sizeWH)*this.#_maximum);
        // let percentSnap /*:Number*/ = percentMax;
        // if(this.#_snapInterval>0){
        //     percentSnap = Math.ceil(percentMax/this.#_snapInterval)*this.#_snapInterval;
        // }        
        // let posXY       /*:Number*/ = Math.round((percentSnap/this.#_maximum)*sizeWH);
        // this.#_value               = this.#_minimum+Math.round((Math.abs(invert-posXY)/sizeWH)*(this.#_maximum-this.#_minimum));
        // if(posXY > (thisXY+sizeWH)){
        //     posXY = sizeWH;
        //     this.#_value =  this.#_direction=='horizontal' ? this.#_maximum : this.#_minimum;
        // }else if(posXY < thisXY){
        //     posXY = thisXY;
        //     this.#_value =  this.#_direction=='horizontal' ? this.#_minimum : this.#_maximum;
        // }
        // this.#_direction  == 'horizontal' ? this.#_thumb_btn.x = posXY : this.#_thumb_btn.y = posXY;
        // if(this.#_value !== this.#_lastValue){
        //     this.#_lastValue = this.#_value;
        //     if(this.#_liveDragging && flag){
        //         this.#_changeEvent.h3_value = this.#_value;
        //         //this.#_changeEvent.h3_clickTarget = '';//thumb or track (implementation in progress)
        //         //this.#_changeEvent.h3_triggerEvent = '';//Not implemented
        //         //this.#_changeEvent.h3_keyCode = 0;//Not implemented
        //         this.dispatchEvent('change',this.#_changeEvent);
        //     }
        // }
}
   
}    
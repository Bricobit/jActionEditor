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
class StageEditorSPT extends Sprite{

    /*private var*/ #_BINDINGS        /*:Object*/     = {};
    /*private var*/ #_startDragPoint  /*:Point*/    = null;
    /*private var*/ #_dragging        /*:Boolean*/  = false;
    /*private var*/ #_rule           /*:Rule*/     = new Rule();
    /*private var*/ #_scrollable_spt  /*:Sprite*/   = new Sprite('ScrollableContainer'+_Object.incrementId());
    /*private var*/ #_stage_spt       /*:Sprite*/   = new Sprite('EmulatedStage'+_Object.incrementId());
    /*private var*/ #_backStage_spt   /*:Sprite*/   = new Sprite('BackStage'+_Object.incrementId());                                
    /*private var*/ #_backStageMargin /*:Number*/   = 300;
    /*private var*/ #_stageWidth      /*:Number*/   = 550;
    /*private var*/ #_stageHeight     /*:Number*/   = 400;
    /*private var*/ #_ruleV           /*:Rule*/     = null;
    /*private var*/ #_ruleH           /*:Rule*/     = null;
    /*private var*/ #_toolHand        /*:Boolean*/  = false;
    /*private var*/ #_rules           /*:Boolean*/  = false;
    /*private var*/ #_selectedItem    /*:UIComponent*/ = null;
    /*private var*/ #_onSelectedItems /*:Function*/    = null;
    /*private var*/ #_drawScrollCellsBind    /*:Function*/       = this.drawScrollCells.bind(this);
    
    /*public function*/ constructor (width/*:Number*/=800, height/*:Number*/=600){
		super()
        //This container
        this.width                  = width;
        this.height                 = height;
        this.outline                = '#ffffff solid 1px';
        this.horizontalScrollPolicy = 'off';
        this.verticalScrollPolicy   = 'off';
        this.background             = 'white';//Debug
        
        //Scrollable container
        this.#_scrollable_spt.outline                = '#d90d0d solid 1px';
        this.#_scrollable_spt.width                  = width;
        this.#_scrollable_spt.height                 = height;
        this.#_scrollable_spt.horizontalScrollPolicy = 'auto';
        this.#_scrollable_spt.verticalScrollPolicy   = 'auto';
        this.addChild(this.#_scrollable_spt);
       
        //Back stage
        this.#_backStage_spt.backgroundColor = '#c2c2c2';
       
        //Add backStage in to scrollable
        this.#_scrollable_spt.addChild(this.#_backStage_spt);
       
        //Add stage in to backStage
        this.#_backStage_spt.addChild(this.#_stage_spt);
      
         //Stage
         this.stageSize(this.#_stageWidth,this.#_stageHeight);
         this.#_stage_spt.backgroundColor = '#4d5664 ';
        //this.#_backStage_spt.addEventListener(MouseEvent.CLICK, this.#OnClick.bind(this));
        //this.addEventListener('scroll',this.#OnScroll.bind(this));
        //this.addEventListener(ScrollEvent.SCROLL, this.#OnScroll.bind(this));

        //this.addEventListener(FocusEvent.FOCUS_OUT, this.#_paletteFocusOutBind);
        //this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_MOVE  ,this.#_onEventsBind);

        this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_DOWN     , this.#B(this.#StartDrag));
        this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_UP       , this.#B(this.#StopDrag) );
        this.#_backStage_spt.addEventListener(MouseEvent.RELEASE_OUTSIDE, this.#B(this.#StopDrag) );
        this.#_stage_spt.addEventListener(KeyBoardEvent.KEY_DOWN        , this.#B(this.#OnKey)    );
	}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * stageCanvas
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ add(value/*:UIComponent*/)/*:Number*/{
        this.#_stage_spt.addChild(value);
        value.x = (this.#_stage_spt.width/2)-(value.width/2);
        value.y = (this.#_stage_spt.height/2)-(value.height/2);
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * selectedItems
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ set selectedItems(item/*:DisplayObject*/)/*:void*/{
        this.#_selectedItem = item;
		this.#_onSelectedItems(item);//Notifies the property inspector of the selected object to view its properties
    }

    /*public function*/ get selectedItems()/*:DisplayObject*/{
        return this.#_selectedItem;
    }

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * onSelectedItems callback function
	 * Notifies the property inspector of the selected object to view its properties
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/


    /*public function*/ set onSelectedItems(callback/*:Function*/)/*:Number*/{
        this.#_onSelectedItems = callback;
    }
    /*public function*/ get onSelectedItems()/*:Function*/{
        return this.#_onSelectedItems;
    }

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * stageCanvas
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ get stageCanvas()/*:Number*/{return this.#_stage_spt;}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * toolHand
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set toolHand(value/*:Number*/)/*:void*/{
        if(this.#_toolHand == value){return;}
        this.#_toolHand = value;
        if(this.#_toolHand){
            // this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_DOWN     , this.#B(this.#StartDrag));
            // this.#_backStage_spt.addEventListener(MouseEvent.MOUSE_UP       , this.#B(this.#StopDrag));
            // this.#_backStage_spt.addEventListener(MouseEvent.RELEASE_OUTSIDE, this.#B(this.#StopDrag));
        }else{
            // this.#_backStage_spt.removeEventListener(MouseEvent.MOUSE_DOWN     , this.#B(this.#StartDrag));
            // this.#_backStage_spt.removeEventListener(MouseEvent.MOUSE_UP       , this.#B(this.#StopDrag));
            // this.#_backStage_spt.removeEventListener(MouseEvent.RELEASE_OUTSIDE, this.#B(this.#StopDrag));
        }
    }
    /*public function*/ get toolHand()/*:Number*/{return this.#_toolHand;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * rules
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set rules(value/*:Number*/)/*:void*/{
        if(this.#_rules == value){return;}
        this.#_rules = value;
        if(value){
            if(this.#_ruleH==null){
                this.#_ruleH = this.#_rule.createHRuleInTo(this, -3000, 8000, 5, 3, 1, 50, 13);
                this.#_ruleV = this.#_rule.createVRuleInTo(this,-3000, 8000, 5, 3, 1, 50, 13);
            }else{
                this.#_ruleV.visible = true;
                this.#_ruleH.visible = true;
            }
            this.#_scrollable_spt.addEventListener(ScrollEvent.SCROLL, this.#_drawScrollCellsBind);
            this.#_scrollable_spt.width  = this.width-15;
            this.#_scrollable_spt.height = this.height-15;
            this.#_scrollable_spt.move(15,15);
        }else{
            this.#_ruleV.visible = false;
            this.#_ruleH.visible = false;
            this.#_scrollable_spt.width  = this.width;
            this.#_scrollable_spt.height = this.height;
            this.#_scrollable_spt.move(0,0);
            this.#_scrollable_spt.removeEventListener(ScrollEvent.SCROLL, this.#_drawScrollCellsBind);
        }
    }
    /*public function*/ get rules()/*:Number*/{return this.#_rules;}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * trace('e.target.name: '+e.target.name);                             
	 * trace('e.target.parent: '+e.target.parent.name);                           
	 * trace('e.currentTarget.name: '+e.currentTarget.name);                              
	 * trace('e.currentTarget.parent.name: '+e.currentTarget.parent.name);       
	 * trace('---------------------------------');                         
	 * 
	 * #StartDrag(e:Event ):void
	 * 
	 * This serves two functions, selecting an object from the stage and dragging it
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

    /*private function*/ #StartDrag(e/*:MouseEvent*/=null)/*:void*/{
        if(this.#_dragging){return;}	
		//Si hacemos click en cualquier parte del stage y la herramienta mano esta activa, arrastramos el stage
		if(this.toolHand){
			this.selectedItems = this.#_stage_spt;
			this.#_startDragPoint = this.#_scrollable_spt.globalToLocal(new Point(stage.mouseX,stage.mouseY));
		}else{
			/*
			Si toolHand es false entonces comprobamos si debajo del ratón hay un componente, si lo hay, se selecciona.
			si se mantiene pulsado el mouse se arrastra el componente. si se suelta se deja de arrastrar pero se mantiene
			seleccionado.
			*/
			this.selectedItems = this.#FindUnderMouse(this.#_stage_spt.globalToLocal(new Point(stage.mouseX,stage.mouseY)));
			if(this.#_selectedItem==this.#_stage_spt){return;} //Si no encontramos ningún objeto No arrastramos el stage, solo se arrastra si tollHand es enabled
			this.#_startDragPoint = this.#_selectedItem.globalToLocal(new Point(stage.mouseX,stage.mouseY));
		}
		this.#_dragging = true;
		stage.addEventListener(MouseEvent.MOUSE_MOVE, this.#B(this.#MouseMoveHandler));
    }	

	/**
	 * 
	 * @param {Point} p 
	 * @returns DisplayObject
	 * Search the displayList of the emulated stage and return the object that is furthest forward whose coordinates and dimensions match 
	 * those of the mouse at the moment of clicking.
	 * 
	 * If nothing is found, it returns the emulated stage itself.
	 * 
	 */

	/*private function*/ #FindUnderMouse(p/*:Point*/)/*:DisplayObject*/{
		const dLen /*:uint*/ = this.#_stage_spt.displayList.length;
		for (let i /*:uint*/ = dLen - 1; i >= 0; i--) {
			const child /*:DisplayObject*/ = this.#_stage_spt.displayList[i];
			if (p.x >= child.x && p.x <= child.x + child.width && p.y >= child.y && p.y <= child.y + child.height) {
				return child;
			}
		}
		return this.#_stage_spt;
	}

	/**
	 * This first version of startDrag to select objects based on events has been left aside because it was necessary to set mouseChildren 
	 * to false for objects in edit mode, but some of them still had working events that caused undesired behavior, such as checkBox which 
	 * every time it was selected to drag it changed its selected state, to solve this it would be necessary to set mouseEnabled to false 
	 * for the component itself, but then it is completely hidden from events and cannot be selected or dragged, and then mouseEnabled 
	 * could be activated again by setting enabled to true from the editor property inspector, which would cause the problem to occur again. 
	 * This is because enabled activates mouseEnabled and mouseEnabled is in charge of controlling CSS pointerEvents.
	 * 
	 * Another solution that has been tested is to add a property called editorModeEnabled in InteractiveObject, to know which components 
	 * are in editor mode and explicitly avoid certain events if editorModeEnabled was set to true. This way it doesn't matter how the 
	 * enabled property of the component is set in edit mode, because it won't interfere or take effect until editorModeEnabled becomes 
	 * false again.
	 * 
	 * This option seems to work well, but it doesn't seem clean to me, so in the end it was decided to select the objects based on the 
	 * mouse position when clicking on the stage instead of using the events, however it is not ruled out to combine editorModeEnabled 
	 * with this selection system and as it is not clear if it will be the final solution, the first version of the method mentioned is 
	 * kept in case it is necessary to return to it.
	 * 
	 * Another cleaner option would be to create specific components for the editor instead of using the same ones used for production, 
	 * but this would require more time and I am very tight with my work and with how big the library has become, I cannot cope with 
	 * cleaning up and modernizing old classes and also creating a set of representative components of the originals just for the editor.
	 * 
	 * Esta primera versión de startDrag para seleccionar los objetos basándose en los eventos se ha dejado aparcada porque era necesario 
	 * establecer mouseChildren a false para los objetos en modo edición, pero algunos de ellos seguían disponiendo de eventos trabajando 
	 * que provocaban comportamientos no deseados, como pro ejemplo checkBox que cada vez que se seleccionaba para arrastrar cambiaba su 
	 * estado selected, para solucionar esta habría que establecer mouseEnabled a false para el propio componente, pero entonces queda 
	 * completamente oculto para los eventos y no puede ser seleccionado o arrastrado, además luego podría activarse mouseEnabled de nuevo 
	 * al establecer enabled a true desde el inspector de propiedades del editor con lo que volvería a producirse el problema. 
	 * Esto es debido a que enabled activa mouseEnabled y mouseEnabled se encarga de controlar pointerEvents de css.
	 * 
	 * Otra solución que se ha probado es añadir una propiedad llamada editorModeEnabled en InteractiveObject, para saber qué componentes 
	 * están en modo de editor y evitar de forma explícita ciertos eventos si editorModeEnabled se estableció en true. De esta forma no 
	 * importa como se establezca la propiedad enabled del componente en modo edición, porque no interferirá o no surtirá efecto hasta 
	 * que editorModeEnabled vuela a ser false.
	 * Esta opción parece funcionar bien, pero no acaba de parecerme limpia, por lo tanto, finalmente se ha optado por seleccionar los 
	 * objetos basándose en la posición del mouse cuando se hace clic en el escenario en vez de utilizar los eventos, de todas formas no 
	 * se descarta combinar editorModeEnabled con este sistema de selección y como tampoco no se tiene claro si será la solución final se 
	 * mantiene la primera versión del método comentada por si fuera necesario volver a ella.
	 */

	// /*private function*/ #StartDrag(e/*:MouseEvent*/=null)/*:void*/{
	// 	/*
	// 	Si donde se hizo clic es en el stage y la herramienta mano no esta activada,
	// 	seleccionamos el stage y salimos
	// 	Si la herramienta mano está activada, pasamos a arrastrar el backStage
	// 	*/
    //     if(e.target ==  this.#_stage_spt && !this.toolHand){
    //         this.selectedItems = e.target;
    //         return;
    //     }
	// 	/*
	// 	Si la accion de arrastrar está activada no hacemos nada
	// 	Si no esta activada, entonces nos aseguramos que el padre del objeto seleccionado sea el stage
	// 	para no seleccionar backStage, seleccionamos el objeto y almacenamos la posicion local del
	// 	mouse.
	// 	Si el padre del objeto seleccionado no es el stage entonces capturamos la posicion local del mouse
	// 	del contenedor scrollable para arrastrar el backStage
	// 	*/
    //     if(!this.#_dragging){
    //         if(e.target.parent ==  this.#_stage_spt){
    //             this.selectedItems = e.target;
    //             this.#_startDragPoint = e.target.globalToLocal(new Point(stage.mouseX,stage.mouseY));
    //         }else{
    //             this.#_startDragPoint = this.#_scrollable_spt.globalToLocal(new Point(stage.mouseX,stage.mouseY));
    //         }
    //         this.#_dragging = true;
    //         stage.addEventListener(MouseEvent.MOUSE_MOVE, this.#B(this.#MouseMoveHandler));
    //     }
    // }
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
            //this.#_selectedItem = null;
            //this.#_backStage_spt.stopDrag();
            stage.removeEventListener(MouseEvent.MOUSE_MOVE, this.#B(this.#MouseMoveHandler));
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
	 * #EventsHandler(e:Event):void
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

    // /*private function*/ #EventsHandler(e/*:Event*/)/*:void*/ {
    //     let t /*:DisplayObject*/ = e.target;
    //     if(e.type=='click'){
    //        if(t.group =='color'){
    //             let color /*:String*/ = '';
    //             if(t.name.startsWith("gradientSwatch")){
    //                 color =  this.#GetHEXColorFromGradientSwatchByMousePosition();
    //             }else if(t.name.startsWith("gradientPalette")){
    //                 this.#DrawGradientSwathByMousePosition();
    //                 return;
    //             }else{
    //                 color = t.flyColor;
    //             }

    //             if(this.selectedColor != color){
    //                 this.selectedColor = color;
    //                 this.dispatchEvent(ColorPickerEvent.CHANGE,new ColorPickerEvent(ColorPickerEvent.CHANGE,color));
    //             }
                
    //             this.close();
    //         }else if (t.name.startsWith("#_gradient_btn")){
    //             if(this.#_gradientBox_spt ==null || !this.#_gradientBox_spt.visible){
    //                 this.#GradientColorPickerShow(true);
    //             }else{
    //                 this.#GradientColorPickerShow(false);
    //             }
                
    //         }else if (t.name.startsWith("#_swatch_btn")){

    //             this.open();
    //         }
    //     }else {//MouseMove
    //         if(t.group =='color'){
    //             let color /*:String*/ = '';
    //             if(t.name.startsWith("gradientSwatch")){
    //                 color =  this.#GetHEXColorFromGradientSwatchByMousePosition();
    //             }else if(t.name.startsWith("gradientPalette")){
    //                 return;
    //             }else{
    //                 color = t.flyColor;
    //             }
    //             this.#ReflectColor(color);
    //         }
    //     } 
    // }

   /*public internal function*/ drawScrollCells(e/*:ScrollEvent*/=null)/*:void*/ {
    if(this.#_ruleH!==null && !this.#_dragging){
        // Utiliza valores fijos para el offset inicial
        const rulesThickness = 15;
        const initialOffsetY = this.#_backStage_spt.y+this.#_stage_spt.y+rulesThickness;
        const initialOffsetX = this.#_backStage_spt.x+this.#_stage_spt.x+rulesThickness;
        
        if(e.direction=='vertical'){
            // Usa el offset fijo inicial en lugar del calculado
            this.#_ruleV.y = -(e.position + (3000 - initialOffsetY));
        }else{
            // Usa el offset fijo inicial en lugar del calculado
            this.#_ruleH.x = -(e.position + (3000 - initialOffsetX));
        }
    }
}
    
	/**-----------------------------------------------------------------------------------------------------------------------------------
	 *  
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnKey(event) {
		if (event.key === 'Delete') {
			if(this.#_selectedItem!==null && this.#_selectedItem!==this.#_stage_spt){
				this.#_stage_spt.removeChild(this.#_selectedItem);
				this.#_selectedItem = this.#_stage_spt;
				this.#_onSelectedItems(this.#_stage_spt);
			}
		}
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * #MouseMoveHandler(e:Event=null,mp:Number):void 
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

    /*private function*/ #MouseMoveHandler(e/*:Event*/=null)/*:void*/{ 
        
        let p = null;
        if(this.toolHand){
            p = this.globalToLocal(new Point(stage.mouseX,stage.mouseY));
            this.#_scrollable_spt.horizontalScrollPosition = -(p.x-(this.#_startDragPoint.x));
            this.#_scrollable_spt.verticalScrollPosition = -(p.y-(this.#_startDragPoint.y));
            if(this.#_ruleH!==null){
                const stageRect  = this.#_stage_spt.node.getBoundingClientRect();
                const editorRect = this.node.getBoundingClientRect();
                const offsetX    = stageRect.x - editorRect.x;
                const offsetY    = stageRect.y - editorRect.y;
                this.#_ruleH.x   = offsetX-3000;
                this.#_ruleV.y   = offsetY-3000;
            }
        }else{
            if(this.#_selectedItem!==null){
                p                     = this.#_stage_spt.globalToLocal(new Point(stage.mouseX,stage.mouseY));
                this.#_selectedItem.x = p.x-(this.#_startDragPoint.x);
                this.#_selectedItem.y = p.y-(this.#_startDragPoint.y);
            }
            
        }
       
      

       
       
		
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
   
    /*private function*/ #B(cb/*:Function/callback*/,bind/*:Object*/=this)/*:Function*/ {return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(bind);}
}    
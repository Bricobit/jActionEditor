/*
Sample: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

You can freely use jActionLib and jActionFramework within MPL limitations. The default images that are 
used by the library and the framework they are copyrighted but can be used freely, as long as they are 
used together to the library and the framework. The images and example codes that are not part of the 
library or the framework are copyrighted and their use is not allowed outside the learning objective, 
visual sample and library development testing of the collaborators.
*/
class Properties extends Form {

	/*private var*/ #_BINDINGS     /*:Object*/        = {};
    /*private var*/ #_owner        /*:Form*/          = null;
    /*private var*/ #_INSP         /*:Object*/        = {};
	/*private var*/ #_params       /*:Object*/        = {};
	/*private var*/ #_selectedItem /*:DisplayObject*/ = null;
	/*private var*/ #_dpLabelPlacement /*:DataProvider*/  = new DataProvider(['left','right','top','bottom']);

	/*public function*/ constructor(){
        super();     
        /*inherit prop*/ this.width        = 310;
        /*inherit prop*/ this.text         = 'Properties'; 
        /*inherit prop*/ this.draggableBox = true;
        /*inherit prop*/ this.headerHeight = 22;
		/*inherit prop*/ this.anchor       = 'top | bottom';
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * Segundo constructor, es llamado automáticamente por FormLoader justo después de haber sido cargado
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ Properties(params/*:Array*/=null)/*:void*/{
        this.#_owner = params[0];
        this.#_owner.stageEditor.onSelectedItems = this.onSelectedItems.bind(this);
		const p /*:Object*/ = {className	           :['className'               ,Label      ,null,null], 
							   name                    :['name'                    ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   x  	                   :['x'                       ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   y                       :['y'                       ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   width  	               :['width'                   ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   height                  :['height'                  ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   prompt                  :['prompt'                  ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   restrict                :['restrict'                ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   rowCount                :['rowCount'                ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   emphasized              :['emphasized'              ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   enabled                 :['enabled'                 ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   label                   :['label'                   ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   labelPlacement          :['labelPlacement'          ,ComboBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   selected                :['selected'                ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],
							   editable                :['editable'                ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   toggle                  :['toggle'                  ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],
							   visible                 :['visible'                 ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   dataProvider            :['dataProvider'            ,Button     ,null,null],
							   selectedColor           :['selectedColor'           ,ColorPicker,Event.CHANGE,this.#B(this.#OnChange)], 
							   showTextField           :['showTextField'           ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   allowMultipleSelection  :['allowMultipleSelection'  ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   headerHeight            :['headerHeight'            ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   horizontalLineScrollSize:['horizontalLineScrollSize',TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   horizontalPageScrollSize:['horizontalPageScrollSize',TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   horizontalScrollPolicy  :['horizontalScrollPolicy'  ,ComboBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   resizableColumns        :['resizableColumns'        ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   rowHeight               :['rowHeight'               ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   showHeaders             :['showHeaders'             ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   sortableColumns         :['sortableColumns'         ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   verticalLineScrollSize  :['verticalLineScrollSize'  ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   verticalPageScrollSize  :['verticalPageScrollSize'  ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   verticalScrollPolicy    :['verticalScrollPolicy'    ,ComboBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   autoSize                :['autoSize'                ,ComboBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   condenseWhite           :['condenseWhite'           ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   htmlText                :['htmlText'                ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   selectable              :['selectable'              ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   text                    :['text'                    ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   wordWrap                :['wordWrap'                ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   maximum                 :['maximum'                 ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   minimum                 :['minimum'                 ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   stepSize                :['stepSize'                ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   value                   :['value'                   ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   direction               :['direction'               ,ComboBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   mode                    :['mode'                    ,ComboBox   ,Event.CHANGE,this.#B(this.#OnChange)], 
							   source                  :['source'                  ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   groupName               :['groupName'               ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   liveDragging            :['liveDragging'            ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   snapInterval            :['snapInterval'            ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   tickInterval            :['tickInterval'            ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],  
							   maxChars                :['maxChars'                ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)], 
							   displayAsPassword       :['displayAsPassword'       ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],  
							   color                   :['color'                   ,ColorPicker,Event.CHANGE,this.#B(this.#OnChange)]};

		this.#_params.cmn = [p.className,p.name, p.x, p.y, p.width, p.height];
		this.#_params.txa = [...this.#_params.cmn, p.condenseWhite, p.editable, p.enabled, p.horizontalScrollPolicy, p.htmlText, p.maxChars, p.restrict, p.text, p.verticalScrollPolicy, p.visible, p.wordWrap];
		this.#_params.txi = [...this.#_params.cmn, p.displayAsPassword, p.editable, p.enabled, p.maxChars, p.restrict, p.text, p.visible];
		this.#_params.stg = [p.className,p.width, p.height, p.color];
		this.#_params.sld = [...this.#_params.cmn, p.direction, p.enabled, p.liveDragging, p.maximum, p.minimum, p.snapInterval, p.tickInterval, p.value, p.visible];
		this.#_params.rdb = [...this.#_params.cmn, p.enabled, p.groupName, p.label, p.labelPlacement, p.selected, p.value, p.visible];
		this.#_params.pgb = [...this.#_params.cmn, p.direction, p.mode, p.source, p.visible];
		this.#_params.nms = [...this.#_params.cmn, p.enabled, p.maximum, p.minimum, p.stepSize, p.value, p.visible];
		this.#_params.lst = [...this.#_params.cmn, p.allowMultipleSelection, p.dataProvider, p.enabled, p.horizontalLineScrollSize, p.horizontalPageScrollSize, p.horizontalScrollPolicy, p.verticalLineScrollSize, p.verticalPageScrollSize, p.verticalScrollPolicy, p.visible];
		this.#_params.lbl = [...this.#_params.cmn, p.autoSize, p.condenseWhite, p.enabled, p.htmlText, p.selectable, p.text, p.visible, p.wordWrap];
		this.#_params.dtg = [...this.#_params.cmn, p.allowMultipleSelection, p.editable, p.headerHeight, p.horizontalLineScrollSize, p.horizontalPageScrollSize, p.horizontalScrollPolicy, p.resizableColumns, p.rowHeight, p.showHeaders, p.sortableColumns, p.verticalLineScrollSize, p.verticalPageScrollSize, p.verticalScrollPolicy];
		this.#_params.cmb = [...this.#_params.cmn, p.dataProvider, p.editable, p.enabled, p.prompt, p.restrict, p.rowCount, p.visible];
		this.#_params.clp = [...this.#_params.cmn, p.enabled, p.selectedColor, p.showTextField, p.visible];
		this.#_params.chk = [...this.#_params.cmn, p.enabled, p.label, p.labelPlacement, p.visible, p.selected];
		this.#_params.btn = [...this.#_params.cmn, p.emphasized, p.enabled, p.label, p.labelPlacement, p.toggle, p.visible];
		this.#_params.spt = this.#_params.cmn;	
		this.#_params.mvc = this.#_params.cmn;	

		//Selected emulated stage on init
		this.onSelectedItems(this.#_owner.stageEditor.stageCanvas);
    }

	/**-----------------------------------------------------------------------------------------------------------------------------------
    * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    *
    *----------------------------------------------------------------------------------------------------------------------------------*/

	 //...

	/**-----------------------------------------------------------------------------------------------------------------------------------
	* 
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	*
	*----------------------------------------------------------------------------------------------------------------------------------*/	

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * Al seleccionarse un item determina que tipo de componentes se crearan en el inspector de propiedades para poder visualizar
	 * los valores de las propiedades del item seleccionado.
	 * También determina si deben eliminarse los componentes del inspector y crearlos de nuevo dependiendo de si el item anterior
	 * es de la misma clase o el mismo item para no tener que recrear innecesariamente componentes en el inspector de propiedades
	 * cuando los items que se seleccionan comparten las mismas propiedades del inspector.
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ onSelectedItems(item/*:UIComponent*/)/*:void*/{
		let params /*:Array*/ = null;
			  if(item instanceof Button               ){params = this.#_params.btn;
		}else if(item instanceof CheckBox             ){params = this.#_params.chk;
		}else if(item instanceof ColorPicker          ){params = this.#_params.clp;
		}else if(item instanceof ComboBox             ){params = this.#_params.cmb;
		}else if(item instanceof DataGrid             ){params = this.#_params.dtg;
		}else if(item instanceof Label                ){params = this.#_params.lbl;
		}else if(item instanceof List                 ){params = this.#_params.lst;
		}else if(item instanceof NumericStepper       ){params = this.#_params.nms;
		}else if(item instanceof ProgressBar          ){params = this.#_params.pgb;
		}else if(item instanceof RadioButton          ){params = this.#_params.rdb;
		}else if(item instanceof Slider               ){params = this.#_params.sld;
		}else if(item instanceof TextArea             ){params = this.#_params.txa;
		}else if(item instanceof TextInput            ){params = this.#_params.txi;
		}else if(item.name.startsWith('EmulatedStage')){params = this.#_params.stg;
		}else if(item instanceof Sprite               ){params = this.#_params.spt;
		}else if(item instanceof MovieClip            ){params = this.#_params.mvc;}

		if(this.#_selectedItem == null){
			this.#AddInspectionComponents(params);
		}else{
			if(this.#_selectedItem !== item && this.#_selectedItem.className !== item.className){
				this.#RemoveAll();
				this.#AddInspectionComponents(params); 
			}
		}
		this.#ReflectProps(item,params);
		this.#_selectedItem = item;
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
    * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PRIVATE METHODS  * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   Pascal Case     * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    *
    *----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * Añade al inspector de propiedades los componentes indicados en el array para poder visualizar los valores de las propiedades
	 * de los items seleccionados
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ #AddInspectionComponents(params/*:Array*/=null)/*:void*/{
		const pLen /*:uint*/ = params.length;
		const CMB /*:Array*/ = [];
		for(let i = 0;i<pLen; i++){
			const property  /*:String*/        = params[i][0];
			const classRef  /*:Class*/         = params[i][1];
			const event     /*:String*/        = params[i][2];
			const callback  /*:Function*/      = params[i][3];
            const lbl       /*:Label*/         = new Label();
			const component /*:DisplayObject*/ = new classRef();
            lbl.text = property;
			if(lbl.text == 'dataProvider'){component.label = '[]✏️🖊️';}
			lbl.move(5,5 + (lbl.height * i));
            if(component instanceof CheckBox){component.label = '';}
			if(component instanceof ComboBox){CMB.push(component);}
			if(component instanceof ColorPicker){
				component.setSize(22,22);
            }else{
				component.width = 170;
			}

			if(property=='labelPlacement'){
				component.dataProvider = this.#_dpLabelPlacement;
			}
			component.tabIndex = i+1;
			component.dynamicProperty = property;

			component.move(135, 5 + (component.height * i));
			this.controls.addChild(lbl);
			this.controls.addChild(component);
			if(event!==null){
				component.addEventListener(event,callback);
			}
			this.#_INSP[property] = {lbl:lbl,com:component,evt:event,callback:callback};
        }

       //Reubicamos los ComboBox por encima
		for(let i2 = CMB.length;i2>0; i2--){
            CMB[i2-1].bringMeToFront();
		}
	}


	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * Refleja los valores de las propiedades del item seleccionado en sus respectivos campos del inspector de propiedades
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #ReflectProps(item/*:DisplayObject*/,props)/*:void*/{
		const pl = props.length;
		for (let i = 0; i < pl; i++) {
			const prop = props[i][0];
			const com  = this.#_INSP[prop].com;//this.#_INSP[params[i][0]] = {lbl:lbl,com:d,data:null};

			if(prop=='labelPlacement'){
				com.selectedIndex = com.searchIndexFromProp('label',item.labelPlacement);
				continue;
			}
				  if(com instanceof CheckBox ){
						com.selected = item[prop];
			}else if(com instanceof TextField || com instanceof TextInput || com instanceof TextArea || com instanceof Label){
				if(item instanceof Sprite && item.name.startsWith('EmulatedStage') && prop =='className'){
					com.text = 'Stage';
				}else{
					com.text = item[prop] == null ? '':item[prop];
				}
			}else if(com instanceof ColorPicker){
				/*
				Since two instances of stage cannot be created, stage is emulated with a Sprite and sprite 
				does not have the color property, that is why backgroundColor is used, although really to be 
				more exact to as3 the colorTransform object should be used but it is not implemented.
				*/
				com.selectedColor = prop=='color' ? '#'+Color.rgbStrTo(item.backgroundColor) : item[prop];
				
			}else if(com instanceof Button || com instanceof ComboBox){
					com.label = item[prop].toString(); 
					com.data = item[prop];
			}
		}
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * Elimina todas las etiquetas y componentes del inspector de propiedades
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #RemoveAll()/*:void*/{
		for (const key in this.#_INSP) {
			if (this.#_INSP.hasOwnProperty(key)) {
				const element = this.#_INSP[key];
				if(element.evt!==null){
					element.com.removeEventListener(element.evt,element.callback);
				}
				this.controls.removeChild(element.lbl);
				this.controls.removeChild(element.com);
			}
		}
		this.#_INSP = {};
	}

	/*private function*/ #OnChange(e/*:Event*/)/*:void*/{
		
		let item /*:DisplayObject*/ = this.#_selectedItem;
		let itemTriggered = e.currentTarget;
		let property      = e.currentTarget.dynamicProperty;
		          if(property == 'className'               ){item[property]=itemTriggered.text;
			}else if(property == 'name'                    ){item[property]=itemTriggered.text;
			}else if(property == 'x'                       ){item[property]=int(itemTriggered.text);
			}else if(property == 'y'                       ){item[property]=int(itemTriggered.text);
			}else if(property == 'width'                   ){item[property]=int(itemTriggered.text);
			}else if(property == 'height'                  ){item[property]=int(itemTriggered.text);
			}else if(property == 'prompt'                  ){item[property]=itemTriggered.text;
			}else if(property == 'restrict'                ){item[property]=itemTriggered.text;
			}else if(property == 'rowCount'                ){item[property]=int(itemTriggered.text);
			}else if(property == 'emphasized'              ){item[property]=itemTriggered.selected;
			}else if(property == 'enabled'                 ){item[property]=itemTriggered.selected;
			}else if(property == 'label'                   ){item[property]=itemTriggered.text;
			}else if(property == 'labelPlacement'          ){item[property]=itemTriggered.selectedItem.label;
			}else if(property == 'selected'                ){item[property]=itemTriggered.selected;
			}else if(property == 'editable'                ){item[property]=itemTriggered.selected;
			}else if(property == 'toggle'                  ){item[property]=itemTriggered.selected;
			}else if(property == 'visible'                 ){item[property]=itemTriggered.selected;
			//}else if(property == 'dataProvider'            ){item[property]=itemTriggered.text;
			}else if(property == 'selectedColor'           ){item[property]= itemTriggered[property];
			}else if(property == 'showTextField'           ){item[property]=itemTriggered.selected;
			}else if(property == 'allowMultipleSelection'  ){item[property]=itemTriggered.selected;
			}else if(property == 'headerHeight'            ){item[property]=int(itemTriggered.text);
			}else if(property == 'horizontalLineScrollSize'){item[property]=int(itemTriggered.text);
			}else if(property == 'horizontalPageScrollSize'){item[property]=int(itemTriggered.text);
			//}else if(property == 'horizontalScrollPolicy'  ){item[property]=itemTriggered.text;
			}else if(property == 'resizableColumns'        ){item[property]=itemTriggered.selected;
			}else if(property == 'rowHeight'               ){item[property]=int(itemTriggered.text);
			}else if(property == 'showHeaders'             ){item[property]=itemTriggered.selected;
			}else if(property == 'sortableColumns'         ){item[property]=itemTriggered.selected;
			}else if(property == 'verticalLineScrollSize'  ){item[property]=int(itemTriggered.text);
			}else if(property == 'verticalPageScrollSize'  ){item[property]=int(itemTriggered.text);
			//}else if(property == 'verticalScrollPolicy'    ){item[property]=itemTriggered.text;
			}else if(property == 'autoSize'                ){item[property]=itemTriggered.selected;
			}else if(property == 'condenseWhite'           ){item[property]=itemTriggered.selected;
			}else if(property == 'htmlText'                ){item[property]=itemTriggered.text;
			}else if(property == 'selectable'              ){item[property]=itemTriggered.selected;
			}else if(property == 'text'                    ){item[property]=itemTriggered.text;
			}else if(property == 'wordWrap'                ){item[property]=itemTriggered.selected;
			}else if(property == 'maximum'                 ){item[property]=int(itemTriggered.text);
			}else if(property == 'minimum'                 ){item[property]=int(itemTriggered.text);
			}else if(property == 'stepSize'                ){item[property]=int(itemTriggered.text);
			}else if(property == 'value'                   ){item[property]=itemTriggered.text;
			//}else if(property == 'direction'               ){item[property]=itemTriggered.text;
			//}else if(property == 'mode'                    ){item[property]=itemTriggered.text;
			//}else if(property == 'source'                  ){item[property]=itemTriggered.text;
			}else if(property == 'groupName'               ){item[property]=itemTriggered.text;
			}else if(property == 'liveDragging'            ){item[property]=itemTriggered.selected;
			}else if(property == 'snapInterval'            ){item[property]=int(itemTriggered.text);
			}else if(property == 'tickInterval'            ){item[property]=int(itemTriggered.text);
			}else if(property == 'maxChars'                ){item[property]=int(itemTriggered.text);
			}else if(property == 'displayAsPassword'       ){item[property]=itemTriggered.selected;
			}else if(property == 'color'                   ){item.backgroundColor = itemTriggered.selectedColor;}



	    //       if(item instanceof TextInput            ){params = this.#_params.txi;
	 	// }else if(item instanceof ColorPicker          ){item.selectedColor = e.currentTarget.selectedColor;
		// }else if(item.name.startsWith('EmulatedStage')){item.backgroundColor = e.currentTarget.selectedColor;}
	}

	/*private function*/ #B(cb/*:Function/callback*/,bind/*:Object*/=this)/*:Function*/ {return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(bind);}

	

	// /*private function*/ #Enabled(array,props)/*:void*/{
	// 	//for (const key in props) {
	// 	for(let i = 0;i<props.length;i++){
	// 		const key = props[i];
	// 		if (array.hasOwnProperty(key)) {
	// 			array[key].com.enabled = true;
	// 		}
	// 	}
	// }

    //*private function*/ #OnHandClick(e/*:Event*/)/*:void*/{
      //this.#_owner.selectedItem[property] = propertyChange; Not yet implemented
    //}

	// /*private function*/ #Reset()/*:void*/{
	// 	for (const key in this.#_INSP) {
	// 		if (this.#_INSP.hasOwnProperty(key)) {
	// 			const item = this.#_INSP[key].com;
	// 			item.enabled = false;
	// 			      if(item instanceof CheckBox ){item.selected = false;
	// 			}else if(item instanceof ComboBox ){item.selectedIndex = 0;
	// 			}else if(item instanceof TextArea ){item.text = '';
	// 			}else if(item instanceof Label    ){item.text = '';
	// 			}else if(item instanceof TextInput){item.text = '';}
	// 		}
	// 	}
	// }
}
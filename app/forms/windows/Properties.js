/*
PropertyInspector: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

You can freely use jActionEditor within MPL limitations. The default images that are 
used by the jActionEditor they are copyrighted but can be used freely, as long as they are 
used together to the jActionEditor.

This class is responsible for creating a window where you can modify and display the properties and their 
values ​​of the objects that are selected in the stage.
*/
class Properties extends Form {

	/*private var*/ #_BINDINGS         /*:Object*/        = {};
	/*private var*/ #_owner            /*:Form*/          = null;
	/*private var*/ #_INSP             /*:Object*/        = {};
	/*private var*/ #_params           /*:Object*/        = {};
	/*private var*/ #_selectedItem     /*:DisplayObject*/ = null;
	/*private var*/ #_dpLabelPlacement /*:DataProvider*/  = new DataProvider(['left','right','top','bottom']);
	/*private var*/ #_dpAutoSize       /*:DataProvider*/  = new DataProvider(['left','center','right','none']);

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
	* Second constructor, it is called automatically by FormLoader right after it has been loaded
	*
	*----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ Properties(params/*:Array*/=null)/*:void*/{
		this.#_owner = params[0];
		this.#_owner.stageEditor.onSelectedItems = this.onSelectedItems.bind(this);

		/*
		The full list of properties supported at the moment

		const p:Object = {propName:['propName', UIComponent  ,Event, EventListener], etc 

		propName      -> Key with the name of the property. 
		'propName'    -> Property name as a string. 
		UIComponent   -> Type of component that will be created in the inspector to display the value contained in that property of the component that is selected on the stage.
		                 Only if the component selected in the stage has this property, otherwise it will not be created in the inspector. 
		Event         -> Common event that will be fired when the component of the property changes to reflect that value in the component on the stage
		EventListener -> Function that will be called when the event is fired.
		*/
		const p /*:Object*/ = {className               :['className'               ,Label      ,null        ,null                   ],
							   name                    :['name'                    ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],
							   x                       :['x'                       ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],
							   y                       :['y'                       ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],
							   width                   :['width'                   ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],
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
							   dataProvider            :['dataProvider'            ,Button     ,null        ,null                   ],
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
							   //font, size, bold and color should be grouped under TextFormat and displayed as a group associated 
							   //with TextFormat, at the moment I put them here the same as the others but it can change
							   font                    :['font'                    ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],
							   size                    :['size'                    ,TextInput  ,Event.CHANGE,this.#B(this.#OnChange)],
							   bold                    :['bold'                    ,CheckBox   ,Event.CHANGE,this.#B(this.#OnChange)],
							   color                   :['color'                   ,ColorPicker,Event.CHANGE,this.#B(this.#OnChange)],
							   fontColor               :['fontColor'                   ,ColorPicker,Event.CHANGE,this.#B(this.#OnChange)]};

		//Assignment of the common and specific properties supported by the different components that can be selected in the stage
		this.#_params.cmn = [p.className,p.name, p.x, p.y, p.width, p.height];
		this.#_params.txa = [...this.#_params.cmn, p.condenseWhite, p.editable, p.enabled, p.horizontalScrollPolicy, p.htmlText, p.maxChars, p.restrict, p.text, p.verticalScrollPolicy, p.visible, p.wordWrap,p.font, p.size, p.bold, p.fontColor];
		this.#_params.txi = [...this.#_params.cmn, p.displayAsPassword, p.editable, p.enabled, p.maxChars, p.restrict, p.text, p.visible,p.font, p.size, p.bold, p.fontColor];
		this.#_params.stg = [p.className,p.width, p.height, p.color];
		this.#_params.sld = [...this.#_params.cmn, p.direction, p.enabled, p.liveDragging, p.maximum, p.minimum, p.snapInterval, p.tickInterval, p.value, p.visible];
		this.#_params.rdb = [...this.#_params.cmn, p.enabled, p.groupName, p.label, p.labelPlacement, p.selected, p.value, p.visible];
		this.#_params.pgb = [...this.#_params.cmn, p.direction, p.mode, p.source, p.visible];
		this.#_params.nms = [...this.#_params.cmn, p.enabled, p.maximum, p.minimum, p.stepSize, p.value, p.visible];
		this.#_params.lst = [...this.#_params.cmn, p.allowMultipleSelection, p.dataProvider, p.enabled, p.horizontalLineScrollSize, p.horizontalPageScrollSize, p.horizontalScrollPolicy, p.verticalLineScrollSize, p.verticalPageScrollSize, p.verticalScrollPolicy, p.visible];
		this.#_params.lbl = [...this.#_params.cmn, p.autoSize, p.condenseWhite, p.enabled, p.htmlText, p.selectable, p.text, p.visible, p.wordWrap, p.font, p.size, p.bold, p.fontColor];
		this.#_params.dtg = [...this.#_params.cmn, p.allowMultipleSelection, p.editable, p.headerHeight, p.horizontalLineScrollSize, p.horizontalPageScrollSize, p.horizontalScrollPolicy, p.resizableColumns, p.rowHeight, p.showHeaders, p.sortableColumns, p.verticalLineScrollSize, p.verticalPageScrollSize, p.verticalScrollPolicy];
		this.#_params.cmb = [...this.#_params.cmn, p.dataProvider, p.editable, p.enabled, p.prompt, p.restrict, p.rowCount, p.visible];
		this.#_params.clp = [...this.#_params.cmn, p.enabled, p.selectedColor, p.showTextField, p.visible];
		this.#_params.chk = [...this.#_params.cmn, p.enabled, p.label, p.labelPlacement, p.visible, p.selected,p.font, p.size, p.bold, p.fontColor];
		this.#_params.btn = [...this.#_params.cmn, p.emphasized, p.enabled, p.label, p.labelPlacement, p.toggle, p.visible,p.font, p.size, p.bold, p.fontColor];
		this.#_params.txf = [...this.#_params.cmn, p.condenseWhite, p.horizontalScrollPolicy, p.htmlText, p.maxChars, p.restrict, p.text, p.verticalScrollPolicy, p.visible, p.wordWrap,p.font, p.size, p.bold, p.fontColor];
		this.#_params.spt = this.#_params.cmn;
		this.#_params.mvc = this.#_params.cmn;

		//When starting, we select the stage itself by default to display its dimensions and background color in the properties.
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
	* [en]
	* When selecting an item from the stage this function is executed and receives the selected item, then determines what type of 
	* components will be created in the property inspector in order to display the values ​​of the properties of the selected item.
	*
	* It also determines whether components should be removed from the inspector and created again depending on whether the previous item
	* is of the same class or the same item so as not to have to unnecessarily recreate components in the property inspector
	* when the selected items share the same inspector properties.
	*
	* [es]
	* Al seleccionar un item del escenario esta funcion se ejecuta y recibe el item seleccionado, a continuación determina que tipo de 
	* componentes se crearan en el inspector de propiedades para poder visualizar los valores de las propiedades del item seleccionado.
	*
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
		}else if(item instanceof TextField            ){params = this.#_params.txf;
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
	 * [en]
	 * Adds the components indicated in the array to the property inspector to be able to view the property values
	 * of the selected items
	 *
	 * [es]
	 * Añade al inspector de propiedades los componentes indicados en el array para poder visualizar los valores de las propiedades
	 * de los items seleccionados
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ #AddInspectionComponents(params/*:Array*/=null)/*:void*/{
		const pLen /*:uint*/  = params.length;
		const CMB  /*:Array*/ = [];
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
			}else if(property=='autoSize'){
				component.dataProvider = this.#_dpAutoSize;
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

		//We relocate the ComboBox above
		//Reubicamos los ComboBox por encima
		for(let i2 = CMB.length;i2>0; i2--){
			CMB[i2-1].bringMeToFront();
		}
	}


	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* [en]
	* Reflects the values ​​of the selected item's properties in their respective fields in the Property Inspector
	*
	* [es]
	* Refleja los valores de las propiedades del item seleccionado en sus respectivos campos del inspector de propiedades
	*
	*
	* @param {DisplayObject} stageCom Reference to the instance of the component currently selected on the stage
	* @param {Array} props Array with the supported properties to be inspected for the selected component
	*
	*----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #ReflectProps(stageCom/*:DisplayObject*/,props/*:Array*/)/*:void*/{
		const pl /*:int*/ = props.length;
		for (let i /*:int*/ = 0; i < pl; i++) {
			const prop         /*:String*/        = props[i][0];
			const inspCom  /*:DisplayObject*/ = this.#_INSP[prop].com;//this.#_INSP['width'] = {lbl:Label,com:Component,data:null};

			//If the selected stage item has the labelPlacement property then we look for its value in the ComboBox of the inspector 
			//to select it and display it
			if(prop=='labelPlacement'){
				inspCom.selectedIndex = inspCom.searchIndexFromProp('label',stageCom.labelPlacement);
				continue;
			}

			//Same logic for the rest
			if(inspCom instanceof CheckBox ){
				if(prop=='bold'){
					if(stageCom.getStyle){
						const tf /*:TextFormat*/ = stageCom.getStyle("textFormat");
						inspCom.selected = tf.bold; 
					}
				}else{
					inspCom.selected = stageCom[prop];
				}
				
			}else if(inspCom instanceof TextField || inspCom instanceof TextInput || inspCom instanceof TextArea || inspCom instanceof Label){
				
				if(stageCom instanceof Sprite && stageCom.name.startsWith('EmulatedStage') && prop =='className'){
					inspCom.text = 'Stage';
				}else{
					if(prop=='font'){
						if(stageCom.getStyle){
							const tf /*:TextFormat*/ = stageCom.getStyle("textFormat");
							inspCom.text = tf.font; 
							//inspCom.className=='Label' ? inspCom.setStyle('textFormat',tf) : inspCom.defaultTextFormat = tf;
						}
					}else if(prop=='size'){
						if(stageCom.getStyle){
							const tf /*:TextFormat*/ = stageCom.getStyle("textFormat");
							inspCom.text = tf.size; 
						}
					}else{
						inspCom.text = stageCom[prop] == null ? '':stageCom[prop];
					}
					
				}
			}else if(inspCom instanceof ColorPicker){
				/*
				You can create two instances of the Stage class, but this was problematic, as I did not take it into account in the 
				foundations of the library development and would have to make some rather deep changes.

				Because you cannot create two instances of Stage, because the editor itself is already inside the main Stage, then 
				the editor emulates its own Stage with a Sprite.

				The Sprite does not have the color property, that is why backgroundColor is used, although actually to be more exact 
				with as3 the colorTransform object should be used, but it is not implemented.
				*/
				if(prop=='fontColor'){
					if(stageCom.getStyle){
						const tf /*:TextFormat*/ = stageCom.getStyle("textFormat");
						//inspCom.selectedColor = tf.color;
						inspCom.selectedColor = typeof tf.color === 'string' && tf.color.startsWith('#') ? tf.color : '#'+Color.uintToHex(tf.color);
						
					}
				}else{
					inspCom.selectedColor = prop=='color' ? '#'+Color.rgbStrTo(stageCom.backgroundColor) : stageCom[prop];
				}
				
				
			}else if(inspCom instanceof Button || inspCom instanceof ComboBox){
					inspCom.label = stageCom[prop].toString(); 
					inspCom.data = stageCom[prop];
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
			}else if(property == 'color'                   ){item.backgroundColor = itemTriggered.selectedColor;
			}else if(property == 'font'                    ){

				const tf /*:TextFormat*/ = item.getStyle("textFormat");
				tf.font = itemTriggered.text;
				item.setStyle("textFormat",tf);

			}else if(property == 'size'                    ){
				const tf /*:TextFormat*/ = item.getStyle("textFormat");
				tf.size = int(itemTriggered.text);
				item.setStyle("textFormat",tf);
			}else if(property == 'bold'                    ){
				const tf /*:TextFormat*/ = item.getStyle("textFormat");
				tf.bold = itemTriggered.selected;
				item.setStyle("textFormat",tf);
			}else if(property == 'fontColor'               ){
				const tf /*:TextFormat*/ = item.getStyle("textFormat");
				tf.color = itemTriggered.selectedColor; 
				item.setStyle("textFormat",tf);
			}



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
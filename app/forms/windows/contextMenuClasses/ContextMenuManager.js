/* 
ContextMenuManager: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 

Package:      jActionEditor/app/forms/windows/ContextMenuClasses/ContextMenuManager.js
Class:        public class ContextMenuManager
Inheritance:  ContextMenuManager > Form > BaseForm > Sprite > DisplayObjectContainer > InteractiveObject > DisplayObject > EventDispatcher >  _Object
Version:
 
0.0.1 - Last update 2024-11-03 -> First version

ContextMenuManager es una clase mediadora cuya funcion es abstraer, encapsular y gestionar toda la lógica de carga y descarga de ContextMenu,
asi como de los diferentes eventos o variables necesarias que deben existir aunque ContextMenu este descargado.

ContextMenuManager no extiende de ninguna clase visual, por lo tanto se deberá pasar siempre el contenedor
donde se desea cargar el ContextMenu.
*/

class ContextMenuManager {

	/*private var*/ #_ctrlKey          /*:Boolean*/ = false;
	/*private var*/ #_dKey            /*:Boolean*/ = false;
	/*private var*/ #_shiftKey         /*:Boolean*/ = false;
	/*private var*/ #_BINDINGS         /*:Object*/  = {};
    /*private var*/ #_mainMenu         /*:Form*/    = null;
	/*private var*/ #_savedSelection   /*:Range*/   = null;
	/*private var*/ #_ctxMenu_frm      /*:Form*/    = null;
	/*private var*/ #_ctxNativeEnabled /*:Boolean*/ = true;
	/*private var*/ #_sharedData       /*:Object*/  = {
		selectionRange : null,
		selectionType  : 'TEXT',
		selection      : null
	};

	/*public function*/ constructor(params/*:Array*/){
		this.#_mainMenu = params[0];
		stage.addEventListener('contextmenu'         , this.#B(this.#OnContextMenu)   );//This event is not intercepted by the EventDispatcher class
		stage.addEventListener(MouseEvent.MOUSE_DOWN , this.#B(this.#OnStageMouseDown));
		stage.addEventListener(KeyBoardEvent.KEY_DOWN, this.#B(this.#OnKeyDown)       );
		stage.addEventListener(KeyBoardEvent.KEY_UP  , this.#B(this.#OnKeyUp)         );

		document.addEventListener('copy', this.#B(this.copy));
		document.addEventListener('paste', this.#B(this.paste));	
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/
	
	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * sharedData : Object
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set sharedData(value/*:Object*/)/*:void*/{this.#_sharedData = value;}
	/*public function*/ get sharedData()/*:Object*/{return this.#_sharedData;}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * ctxNativeEnabled : Boolean
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set ctxNativeEnabled(value/*:Boolean*/)/*:void*/{this.#_ctxNativeEnabled = value;}
	/*public function*/ get ctxNativeEnabled()/*:Boolean*/{return this.#_ctxNativeEnabled;}


	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * #OnContextMenu(e:Event):void
	 * 
	 * Es llamado cada vez que se produce un evento contextMenu
	 * 
	 *----------------------------------------------------------------------------------------------------------------------------------*/
	
	/*public function*/ copy(e/*:NativeEvent*/=null)/*:void*/ {
		
		if (this.sharedData.selectionRange) {
			
			const selection /*:Object*/ = window.getSelection();

			selection.removeAllRanges();
			selection.addRange(this.sharedData.selectionRange);
			const selectedText /*:String*/ = selection.toString();

			if (selectedText.length > 0) {
				System.setClipboard(selectedText);
				this.sharedData.selectionType = 'TEXT';
				// navigator.clipboard.writeText(selectedText).then(function() {
				//     console.log('Texto copiado al portapapeles');
				// }).catch(function(err) {
				//     console.error('Error al copiar el texto: ', err);
				// });
				return;
			}
		}

		let item = this.#_mainMenu.simpleLayout.selectedItems;
		if(item == null){
			return;
		}

		if(!item.name.startsWith('EmulatedStage')){
			this.sharedData.selectionType = 'OBJECT';

			this.sharedData.selection     = G.FU.getLayout(null,[item],false);
			trace(this.sharedData.selection);
		}
	}

	/**
	 * paste(e:NativeEvent=null):void
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * Se ejecuta cuando se presiona Ctrl+V y cuando se hace click en el botón pegar del menu contextual
	 * Si se ejecuta con Ctrl+V recibe el evento, si se hace click en el botón de pegar recibe null
	 * Actualmente el evento 'paste' no es interceptado por EventDispatcher.
	 * @param {NativeEvent} e El objeto devuelto por el evento 'paste' disparado por Ctrl+V
	 * @returns {void}
	 * La funcion se establece como asincrònica porque clipBoard.readText() es asíncrono y requiere await.
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	async /*public function*/ paste(e/*:NativeEvent*/=null,pasteLocation/*:String*/='pic')/*:void*/ {


		trace('focus: '+stage.focus.name);
		
		//Si el evento es disparado por ctrl+v lo bloqueamos
		if(e!=null){e.preventDefault();
			trace('ctrl+v bloqueado');
		}

		//Si el tipo copiado es un objeto
		if(this.sharedData.selectionType == 'OBJECT'){
			/*
			Se presupone que el contenido de #_objCopied contiene una un array como cadena con las propiedades del objeto copiado.
			Se le pasa al método setLayout de FormUtils para que cree una instancia de ese mismo objeto, le aplique las propiedades
			y lo añada al DisplayList del contenedor virtualStage
			*/

			//Sample content '["instanceName","Label",x,y,w,h,zIndex,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0]'
			const obj /*:Array*/ = JSON.parse(this.sharedData.selection);
			if(pasteLocation=='pic'){//Paste in center
				const w /*:Number*/ = this.#_mainMenu.simpleLayout.virtualStage.width;
				const h /*:Number*/ = this.#_mainMenu.simpleLayout.virtualStage.height;
				obj[2] = w/2-obj[4]/2;
				obj[3] = h/2-obj[5]/2;		
			}else if(pasteLocation=='dts'){//Duplicate to the side - Action by Ctrl+D
				obj[2] = obj[2]+10;
				obj[3] = obj[3]+10;
			}//default pip -> Paste in place


		
			const instanceName/*:String*/ = obj[0];
			let lastObject /*:DisplayObject*/ = null;
			//Verificar si la instancia existe
			if (this.#_mainMenu.simpleLayout.virtualStage.getChildByName(instanceName) != null) {
				//let aliasName/*:String*/ = instanceName;
				//let ext/*:String*/ = instanceName.slice(instanceName.lastIndexOf("_")+1);
				//obj[0] = 'Copy_instance_'+_Object.incrementId();
				obj[0] = '';
				lastObject /*:DisplayObject*/ = G.FU.setLayout(this.#_mainMenu.simpleLayout.virtualStage,[obj]);
				lastObject.aliasName = instanceName;
			} else {
				lastObject /*:DisplayObject*/ = G.FU.setLayout(this.#_mainMenu.simpleLayout.virtualStage,[obj]);
			}
			this.#_mainMenu.simpleLayout.selectedItems = lastObject;
			stage.focus = lastObject;
			return;
		}//TEXT
		try {
			const text            /*:String*/ = await navigator.clipboard.readText();	
			const selection /*:Object*/ = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(this.sharedData.selectionRange);
			//const selectedElement /*:Node*/   = selection.anchorNode.parentElement;
			//selectedElement.innerText = text;
				const range = selection.getRangeAt(0);
				
				// Crear un DocumentFragment para insertar el texto
				const fragment = document.createDocumentFragment();
				const textNode = document.createTextNode(text);
				fragment.appendChild(textNode);
				
				// Insertar el fragmento en la posición del cursor
				range.deleteContents();
				range.insertNode(fragment);
				
				// Ajustar la selección para que el cursor quede después del texto insertado
				range.setStartAfter(textNode);
				range.setEndAfter(textNode);
				selection.removeAllRanges();
				selection.addRange(range);
				
		} catch (err) {
			trace('Error al pegar el contenido: '+ err);
		}
	};

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #OnContextMenu(e:Event):void
	 * @param {NativeEvent} e - Evento de contextMenu
	 * @returns {void} 
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	/*private function*/ #OnContextMenu(e/*:Event*/)/*:void*/{
		if(!this.#_ctxNativeEnabled){
			e.preventDefault();
		}
	}

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #OnStageMouseDown(e:Event):void
	 * @param {Event} e - Evento de pulsación en cualquier parte del stage
	 * @returns {void} 
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	/*private function*/ #OnStageMouseDown(e/*:Event*/)/*:void*/{
		if(e.nativeEvent.button==2){

			const selection = window.getSelection(); 


			if (selection.rangeCount > 0) { 
				//this.#_savedSelection = selection.getRangeAt(0); 
				this.sharedData.selectionRange = selection.getRangeAt(0);
			} else { 
				//this.#_savedSelection = null; 
				this.sharedData.selectionRange = null
			}
			
			if(!this.#_ctxMenu_frm){	
				G.FLoader.load(this.#_mainMenu.controls,'app/forms/windows/ContextMenu.js',this.#OnLoadCtxMenu.bind(this),
				this.#OnCloseCtxMenu.bind(this),[this.#_mainMenu,this]);
			}else{
				this.#_ctxMenu_frm.moveToMousePointer();
			}
		}else{
			if(this.#_ctxMenu_frm){
				this.#_ctxMenu_frm.checkClickOut();
			}
		}
	}	

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #OnLoadCtxMenu():void
	 * @returns {void} 
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */
	/*private function*/ #OnLoadCtxMenu()/*:void*/ {

		this.#_ctxMenu_frm = G.FLoader.content;
		//this.#_ctxMenu_frm.selection = this.#_savedSelection;
	}

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #OnCloseCtxMenu():void
	 * @returns {void} 
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */
	/*private function*/ #OnCloseCtxMenu()/*:void*/ {
		//delete this.#_windowRefs[this.#_CTX_MENU];
		this.#_ctxMenu_frm = null;
	}

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #OnKeyDown(e:Event):void
	 * Es llamado cada vez que se pulsa una tecla
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	/*private function*/ #OnKeyDown(e/*:Event*/)/*:void*/ {
		if(!e.key){
          trace('Navigator version unsupported key property also support deprecated which:'+e.which+' old IE keyCode:'+e.keyCode);
		  return;
		}
		switch (e.key) {
			case Keyboard.D.KEY     : this.#_dKey     = true; break
			case Keyboard.CTRL.KEY  : this.#_ctrlKey  = true; break
			case Keyboard.SHIFT.KEY : this.#_shiftKey = true; break
			default:				                         return;
		}
		e.stopPropagation();

		if(this.#_ctrlKey && this.#_dKey){
			e.preventDefault();
		}
	}


	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #OnKeyUp(e:Event):void
	 * Es llamado cada vez que se suelta una tecla
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	/*private function*/ #OnKeyUp(e/*:Event*/)/*:void*/ {
		if(this.#_ctrlKey && this.#_dKey){
			//Duplicate selected DisplayObject from virtualStage
			//Automatic copy and paste
			let dup = G.FU.duplicateComponent(this.#_mainMenu.simpleLayout.selectedItems);
			this.#_mainMenu.simpleLayout.virtualStage.addChild(dup);
			this.#_mainMenu.simpleLayout.selectedItems = dup;
			stage.focus = dup;
			//this.copy();
			//this.paste(null,'dts');
		}
		const key/*:String*/ = e.key;
		switch (key) {
			case Keyboard.D.KEY    : this.#_dKey     = false; break
			case Keyboard.CTRL.KEY : this.#_ctrlKey  = false; break;	 
			case Keyboard.SHIFT.KEY: this.#_shiftKey = false; break;
			case Keyboard.DELETE.KEY: this.#DeleteSelected(); break;
		}
	}

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #DeleteSelected():void
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	/*private function*/ #DeleteSelected()/*:void*/ {
		const item = this.#_mainMenu.simpleLayout.selectedItems;
		if(item != null && !item.name.startsWith('EmulatedStage')){
			this.#_mainMenu.simpleLayout.remove(item);
		}
	}
	

	/**
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * #B(cb:Function/callback):Function
	 * Binds a callback function to the ContextMenuManager class
	 * @param {Function/callback} cb
	 * @returns {Function}	
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */

	/*private function*/ #B(cb/*:Function/callback*/)/*:Function*/ {
		return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(this);
	}

}
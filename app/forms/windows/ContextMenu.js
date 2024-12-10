/* 
-----------------------------------------------------------------------------------------------------------------------------------
ContextMenu: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 

Package:      jActionEditor/app/forms/windows/ContextMenu
Class:        public class ContextMenu
Inheritance:  ContextMenu > Form > BaseForm > Sprite > DisplayObjectContainer > InteractiveObject > DisplayObject > EventDispatcher >  _Object
Version:
0.0.2 - Last update 2024-11-04 -> Added Copy and Paste to the context menu
0.0.1 - Last update 2024-10-27 -> First version

Este es el menu contextual personalizado que sustituye al menu del navegador por defecto
-----------------------------------------------------------------------------------------------------------------------------------
*/


class ContextMenu extends Form {
	//Convenciones de

	/*private var*/ #_BINDINGS /*:Object*/             = {};
	/*private var*/ #_PREPARED /*:Array*/              = [];
	/*private var*/ #_ctx_mbr  /*:MenuBar*/            = new MenuBar("MASTER","ContextMainMenu");
	/*private var*/ #_mainMenu /*:Form*/               = null;
	/*private var*/ #_ctxMM    /*:ContextMenuManager*/ = null;
	
	/*public function*/ constructor(){
		super() ;
		/*inherit prop*/ this.formBorderStyle = "none";
		/*inherit prop*/ this.roundEnabled    = true;
		/*inherit prop*/ this.roundStyle      = "10px";
	}
	
	/*public function*/ ContextMenu(params/*:Array*/=null)/*:void*/{

		this.#_mainMenu = params[0];
		this.#_ctxMM    = params[1];

		const emojis /*:Array*/  = ['🗐','🖊','🔄','🗑','🛠','📝','⚙️','💾','✏️','📁','✂️','🖼️','🔗','🔍','🎨','📋','⚠️','❌','📏','⿻'];
		const st     /*:String*/ = '<span style="font-size: 10px;">';
		const et     /*:String*/ = '</span>';
		this.#_ctx_mbr.setConfig('V','L',true,false,'L',false,10,3,0,false);
		this.#_ctx_mbr.setButton(emojis[0] +' Copy               '+st+'Ctrl+C'+et   , 'cop', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[1] +' Paste              '+st+'Ctrl+V'+et   , 'pic', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[1] +' Paste in place     '                  , 'pip', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[18]+' Rules              '                  , 'rul', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[2]+' Seleccionar        '+st+'Ctrl+A'+et   , 'sel', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[3]+' Borrar             '+st+'Ctrl+Del'+et , 'del', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[4]+' Ajustes / Imprimir '+st+'Ctrl+P'+et   , 'cfg', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[5]+' Notas              '+st+'Ctrl+N'+et   , 'not', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[6]+' Herramientas       '+st+'Ctrl+T'+et   , 'too', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[7]+' Guardar            '+st+'Ctrl+S'+et   , 'sav', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[8]+' Nuevo              '+st+'Ctrl+N'+et   , 'new', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[9]+' Abrir              '+st+'Ctrl+O'+et   , 'ope', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[10]+' Modificar         '+st+'Ctrl+M'+et   , 'mod', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[11]+' Capturar          '+st+'Ctrl+C'+et   , 'cap', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[12]+' Enlace            '+st+'Ctrl+L'+et   , 'lnk', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[13]+' Buscar            '+st+'Ctrl+F'+et   , 'src', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[14]+' Color             '+st+'Ctrl+C'+et   , 'col', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[15]+' Propiedades       '+st+'Ctrl+P'+et   , 'pro', this.#B(this.#Evt), '', null, {path:''});
		// this.#_ctx_mbr.setButton(emojis[16]+' Avisos            '+st+'Ctrl+A'+et   , 'warn', this.#B(this.#Evt), '', null, {path:''});		
		// this.#_ctx_mbr.setButton(emojis[17]+' Cerrar            '+st+'Ctrl+W'+et   , 'clo', this.#B(this.#Evt), '', null, {path:''});			
		

		this.#_PREPARED  = G.FU.lst([[this    , 'formClose', this.#B(this.#Clean)   ]]);


		this.#_ctx_mbr.startMenu(this.#OnMenuComplete.bind(this));
		//document.addEventListener('copy', this.#OnCopy.bind(this));
		//document.addEventListener('paste', this.#OnPaste.bind(this));	
		// document.addEventListener('copy', function(e) {
		// 	console.log('Evento copy interceptado');
		// 	e.preventDefault();
		// 	const selection = window.getSelection().toString();
		// 	e.clipboardData.setData('text/plain', selection);
		// });
		
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *    camelCase      * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/
	
	//...

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *    camelCase      * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 *
	 * moveToMousePointer()
	 * 
	 * Debe ser ejecutado desde fuera mediante el evento click del boton 2(derecho) del mouse
	 * Posiciona el formulario en el lugar que se hizo click con el botone derecho
	 * 
	 * La primera vez que se carga el formulario también es llamado, es necesario cargar el formulario cuando se hace click con el 
	 * boton derecho
	 *
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ moveToMousePointer()/*:void*/ {
		const g  /*:Object*/ = this.parent.globalToLocal(new Point(stage.mouseX,stage.mouseY));
		const w  /*:Number*/ = this.width;
		const h  /*:Number*/ = this.height;
		const cw /*:Number*/ = 300;//Ancho aproximado del menu contextual nativo del navegador

		if(this.#_ctxMM.ctxNativeEnabled){
			//Cuando el menu contextual nativo del navegador esta habilitado con propósitos de debug.
			//Reposicionamos el formulario si se sale fuera de la pantalla mas los tamaños aproximados del menu contextual nativo del navegador
			//para que el menu personalizado no quede solapado por el menu contextual nativo
		 	g.x = g.x-cw;
			if((stage.mouseX-w)<0 ){g.x+=w+(cw*2);}
		}else{
			//Reposicionamos el formulario si se sale fuera de la pantalla
			if((stage.mouseX+w)>stage.width ){g.x-=w;}
			
		}
		if((stage.mouseY+h)>stage.height){g.y-=h;}
		this.move(g.x,g.y);
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * checkClickOut()
	 * Debe ser ejecutado desde fuera mediante el evento click del boton 1(izquierdo) del mouse
	 * Comprueba si el ratón esta dentro del area del formulario, si es asi salimos de la funcion sin cerrar
	 * a no ser que el clic haya pulsado algun boton del menu.
	 * 
	 * Si la pulsación ha sido fuera del area del formulario, se ejecuta el evento close del formulario
	 *
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ checkClickOut()/*:void*/ {
		const p /*:Point<Object>*/ = this.parent.globalToLocal(new Point(stage.mouseX,stage.mouseY));
		if(p.x >= this.x && p.x <= this.x+this.width && p.y >= this.y && p.y <= this.y+this.height){
			return;	
		}
		this.close();
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PRIVATE METHODS  * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   Pascal Case     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * @param {Event} e 
	 * 
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnMenuComplete(e/*:Event*/)/*:void*/ {
		this.addControl(this.#_ctx_mbr);
		this.setSize(this.#_ctx_mbr.width,this.#_ctx_mbr.height);
		this.moveToMousePointer();
	}


	/**-----------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * @param {Event} e 
	 * 
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #Evt(e/*:Event*/)/*:void*/ {
		const data   /*:String*/ = e.currentTarget.path;
		const name   /*:String*/ = e.currentTarget.name;
		const label  /*:String*/ = e.currentTarget.label
		const params /*:Array*/  = [this,1000, 900,label,true];
		if(data.path!=""){//Load
			//G.FLoader.load(data.target,data.path,null,null,params,data.x,data.y);
		}else{//Actions
				  if(name=='cop'){this.#_ctxMM.copy();
			}else if(name=='pic'                           //Paste in center
				  || name=='pip'){this.#_ctxMM.paste(null,name);//Paste in place
			}else if(name=='rul'){this.#_mainMenu.simpleLayout.rules = !this.#_mainMenu.simpleLayout.rules; this.close();
			}else if(name=='ac4'){trace('Action 4 for...');
			}else if(name=='ac5'){trace('Action 5 for...');
			}else{ 
				trace(label);
			}
		}
		this.close();
	}


	
	
	// /*private function*/ #OnCopy(e/*:NativeEvent*/=null)/*:void*/ {
		
	// 	if (this.#_ctxMM.sharedData.selectionRange) {
			
	// 		const selection /*:Object*/ = window.getSelection();

	// 		selection.removeAllRanges();
	// 		selection.addRange(this.#_ctxMM.sharedData.selectionRange);
	// 		const selectedText /*:String*/ = selection.toString();

	// 		if (selectedText.length > 0) {
	// 			System.setClipboard(selectedText);
	// 			this.#_ctxMM.sharedData.selectionType = 'TEXT';
	// 			// navigator.clipboard.writeText(selectedText).then(function() {
	// 			//     console.log('Texto copiado al portapapeles');
	// 			// }).catch(function(err) {
	// 			//     console.error('Error al copiar el texto: ', err);
	// 			// });
	// 			this.close();
	// 			return;
	// 		}
	// 	}

	// 	let item = this.#_mainMenu.simpleLayout.selectedItems;
	// 	if(item == null){
	// 		return;
	// 	}

	// 	if(!item.name.startsWith('EmulatedStage')){
	// 		this.#_ctxMM.sharedData.selectionType = 'OBJECT';
	// 		this.#_ctxMM.sharedData.selection     = G.FU.getLayout(null,[item],false);
	// 		this.close();
	// 	}
	// }

	/**
	 * #OnPaste(e:NativeEvent=null):void
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 * Se ejecuta cuando se presiona Ctrl+V y cuando se hace click en el botón pegar del menu contextual
	 * Si se ejecuta con Ctrl+V recibe el evento, si se hace click en el botón de pegar recibe null
	 * Actualmente el evento 'paste' no es interceptado por EventDispatcher.
	 * @param {NativeEvent} e El objeto devuelto por el evento 'paste' disparado por Ctrl+V
	 * @returns {void}
	 * La funcion se establece como asincrònica porque clipBoard.readText() es asíncrono y requiere await.
	 * -----------------------------------------------------------------------------------------------------------------------------------
	 */
	// async /*private function*/ #OnPaste(e/*:NativeEvent*/=null,pasteLocation/*:String*/='pas')/*:void*/ {


	// 	trace('focus: '+stage.focus.name);
		
	// 	//Si el evento es disparado por ctrl+v lo bloqueamos
	// 	if(e!=null){e.preventDefault();
	// 		trace('ctrl+v bloqueado');
	// 	}

	// 	//Si el tipo copiado es un objeto
	// 	if(this.#_ctxMM.sharedData.selectionType == 'OBJECT'){
	// 		/*
	// 		Se presupone que el contenido de #_objCopied contiene una un array como cadena con las propiedades del objeto copiado.
	// 		Se le pasa al método setLayout de FormUtils para que cree una instancia de ese mismo objeto, le aplique las propiedades
	// 		y lo añada al DisplayList del contenedor virtualStage
	// 		*/

	// 		//Sample content '["instanceName","Label",x,y,w,h,zIndex,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0]'
	// 		const obj /*:Array*/ = JSON.parse(this.#_ctxMM.sharedData.selection);

	// 		if(pasteLocation=='pas'){//Paste in the center
	// 			const w /*:Number*/ = this.#_mainMenu.simpleLayout.virtualStage.width;
	// 			const h /*:Number*/ = this.#_mainMenu.simpleLayout.virtualStage.height;
	// 			obj[2] = w/2-obj[4]/2;
	// 			obj[3] = h/2-obj[5]/2;		
	// 		}//else pap -> Paste in place
	// 		G.FU.setLayout(this.#_mainMenu.simpleLayout.virtualStage,[obj]);
	// 		this.close();
	// 		return;
	// 	}//TEXT
	// 	try {
	// 		const text            /*:String*/ = await navigator.clipboard.readText();	
	// 		const selection /*:Object*/ = window.getSelection();
	// 		selection.removeAllRanges();
	// 		selection.addRange(this.#_ctxMM.sharedData.selectionRange);
	// 		//const selectedElement /*:Node*/   = selection.anchorNode.parentElement;
	// 		//selectedElement.innerText = text;
	// 			const range = selection.getRangeAt(0);
				
	// 			// Crear un DocumentFragment para insertar el texto
	// 			const fragment = document.createDocumentFragment();
	// 			const textNode = document.createTextNode(text);
	// 			fragment.appendChild(textNode);
				
	// 			// Insertar el fragmento en la posición del cursor
	// 			range.deleteContents();
	// 			range.insertNode(fragment);
				
	// 			// Ajustar la selección para que el cursor quede después del texto insertado
	// 			range.setStartAfter(textNode);
	// 			range.setEndAfter(textNode);
	// 			selection.removeAllRanges();
	// 			selection.addRange(range);
				
	// 	} catch (err) {
	// 		trace('Error al pegar el contenido: '+ err);
	// 	}
	// };

		// if(e!=null){
		// 	trace('Copy with event ctrl+c');
		// 	e.preventDefault();
		// }//else{
		// 	//trace('Copy with custom contextMenu button');
		// //}	

		// const selection = window.getSelection();
		// trace(selection);
		// const selectedElement = selection.anchorNode.parentElement;

		// const selectedText = selection.toString();

		// if (selectedText.length > 0) {
		// 	System.setClipboard(selectedText);
		// 	} else {
		// 		//Pendiente de implementar
		// 		// Copiar el componente TextArea en sí
		// 		// const textAreaData = {
		// 		// 	properties: selectedElement.getProperties(), // Suponiendo que tienes un método para obtener las propiedades
		// 		// 	type: 'TextArea'
		// 		// };
		// 		// navigator.clipboard.writeText(JSON.stringify(textAreaData));
		// 	}
		// if (selectedElement.classList.contains('ComboBox')) {
		// 	// Copiar propiedades del ComboBox
		// 	const comboBoxData = {
		// 		properties: selectedElement.getProperties(), // Suponiendo que tienes un método para obtener las propiedades
		// 		type: 'ComboBox'
		// 	};
		// 	//event.clipboardData.setData('application/json', JSON.stringify(comboBoxData));
		// } else {
			// Copiar texto plano
			//event.clipboardData.setData('text/plain', selection.toString());
			//System.setClipboard(selection.toString);
		//}





	// document.getElementById('copyButton').addEventListener('click', function(event) {
	// 	const selection = window.getSelection();
	// 	const selectedElement = selection.anchorNode.parentElement;
		
	// 	if (selectedElement.tagName === 'TEXTAREA') {
	// 		// Copiar texto seleccionado dentro del TextArea
	// 		const selectedText = selection.toString();
	// 		if (selectedText.length > 0) {
	// 			navigator.clipboard.writeText(selectedText);
	// 		} else {
	// 			// Copiar el componente TextArea en sí
	// 			const textAreaData = {
	// 				properties: selectedElement.getProperties(), // Suponiendo que tienes un método para obtener las propiedades
	// 				type: 'TextArea'
	// 			};
	// 			navigator.clipboard.writeText(JSON.stringify(textAreaData));
	// 		}
	// 	} else {
	// 		// Copiar otros elementos
	// 		if (selectedElement.classList.contains('ComboBox')) {
	// 			const comboBoxData = {
	// 				properties: selectedElement.getProperties(), // Suponiendo que tienes un método para obtener las propiedades
	// 				type: 'ComboBox'
	// 			};
	// 			navigator.clipboard.writeText(JSON.stringify(comboBoxData));
	// 		} else {
	// 			navigator.clipboard.writeText(selection.toString());
	// 		}
	// 	}
	// 	event.preventDefault();
	// });
	
	
	// /*private function*/ #OnPaste(e/*:Event*/)/*:void*/ {
	// 	const clipboardData = event.clipboardData.getData('application/json');
	// 	if (clipboardData) {
	// 		const data = JSON.parse(clipboardData);
	// 		if (data.type === 'ComboBox') {
	// 			// Crear una nueva instancia de ComboBox con las propiedades copiadas
	// 			const newComboBox = new ComboBox();
	// 			newComboBox.setProperties(data.properties); // Suponiendo que tienes un método para establecer las propiedades
	// 			document.body.appendChild(newComboBox);
	// 		}
	// 	} else {
	// 		// Pegar texto plano
	// 		const text = event.clipboardData.getData('text/plain');
	// 		document.execCommand('insertText', false, text);
	// 	}
	// 	event.preventDefault();
	// };


	
	
	

	// document.getElementById('pasteButton').addEventListener('click', function() {
	// 	navigator.clipboard.readText().then(function(text) {
	// 		const selection = window.getSelection();
	// 		const selectedElement = selection.anchorNode.parentElement;
	// 		if (selectedElement.classList.contains('ComboBox')) {
	// 			// Pegar propiedades del ComboBox
	// 			const comboBoxData = JSON.parse(text);
	// 			if (comboBoxData.type === 'ComboBox') {
	// 				selectedElement.setProperties(comboBoxData.properties); // Suponiendo que tienes un método para establecer las propiedades
	// 			}
	// 		} else {
	// 			// Pegar texto plano
	// 			selectedElement.innerText = text;
	// 		}
	// 	}).catch(function(err) {
	// 		console.error('Error al pegar el contenido: ', err);
	// 	});
	// });
	
	

	/*private function*/ #Clean(e/*:Event*/)/*:void*/{G.FU.lst(this.#_PREPARED,'remove');}
	/*private function*/ #B(cb/*:Function/callback*/)/*:Function*/ {return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(this);}



// 	magnifico, otro caso que se da, suponte ahora que quiero pegar ese texto o un objeto, a la hora de pegar como se si lo que tengo que pegar es un texto y si es asi, tengo que asegurarme que el usuario a pueto el cursor dentro de un campo de texto, si no lo que hago es instancia un textField en el escenario y pegarle el texto, y si resulta que lo que va a pegar es un objeto por ejemplo un combobox tengo que saber que el contenido copiado es un combobox de manera que al pegar lo que are sera crear una instacia nueva de un combobox y asignarle las mismas propiedades del combobox copiado
// Para manejar este caso, puedes verificar el contenido del portapapeles antes de pegarlo. Si es texto, asegúrate de que el usuario haya colocado el cursor dentro de un campo de texto. Si no es así, crea un nuevo campo de texto y pega el contenido allí. Si el contenido es un objeto, como un ComboBox, crea una nueva instancia del objeto y asigna las propiedades copiadas. Aquí tienes un ejemplo de cómo podrías hacerlo:


	// document.getElementById('pasteButton').addEventListener('click', async function() {
	// 	try {
	// 		const text = await navigator.clipboard.readText();
	// 		const selection = window.getSelection();
	// 		const selectedElement = selection.anchorNode.parentElement;
	
	// 		// Intentar parsear el texto como JSON
	// 		let parsedData;
	// 		try {
	// 			parsedData = JSON.parse(text);
	// 		} catch (e) {
	// 			parsedData = null;
	// 		}
	
	// 		if (parsedData && parsedData.type === 'ComboBox') {
	// 			// Pegar un ComboBox
	// 			const newComboBox = document.createElement('div'); // Suponiendo que el ComboBox es un div
	// 			newComboBox.classList.add('ComboBox');
	// 			newComboBox.setProperties(parsedData.properties); // Suponiendo que tienes un método para establecer las propiedades
	// 			document.body.appendChild(newComboBox); // Añadir el nuevo ComboBox al escenario
	// 		} else {
	// 			// Pegar texto
	// 			if (selectedElement.tagName === 'TEXTAREA' || selectedElement.tagName === 'INPUT') {
	// 				selectedElement.value += text; // Pegar el texto en el campo de texto
	// 			} else {
	// 				const newTextField = document.createElement('textarea');
	// 				newTextField.value = text;
	// 				document.body.appendChild(newTextField); // Añadir el nuevo campo de texto al escenario
	// 			}
	// 		}
	// 	} catch (err) {
	// 		console.error('Error al pegar el contenido: ', err);
	// 	}
	// });
	
}
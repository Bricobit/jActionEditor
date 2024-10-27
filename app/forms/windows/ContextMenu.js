/* 
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

0.0.1 - Last update 2024-10-27 -> First version

Este es el menu contextual personalizado que sustituye al menu del navegador por defecto


Notas convenciones -> colocar el siguiente texto en la ayuda de colaboradores y quitar de aquí

Constantes, Arrays u objetos grandes e importantes que queramos resaltar se pueden escribir completamente en mayúsculas si se desea. 
Las variables normales de clase deben seguir el formato camelCase combinado con snake_case
es decir comenzar con un guion bajo e incluso terminar con otro guion bajo y con una serie de letras a modo identificativo o extensión. 
Ejemplo: 
#_moveTo_btn = New Button();"
o simplemente
#_index = 0;

Las variables que viven solo en el ámbito local de una funcion no requieren empezar con guion bajo.

Deben ser camelCase las funciones publicas y los getters y setters de las propiedades.

Las funciones privadas deben ser PascalCase, ejemplo:
#OnEvtHandler();

Aunque el lenguaje no soporte tipado, es necesario indicar entre comentarios los tipos de las variables, parámetros, valores 
devuelto por las funciones, etc

*/


class ContextMenu extends Form {

	/*private var*/ #_BINDINGS /*:Array*/   = [];
	/*private var*/ #_PREPARED /*:Array*/   = [];
	/*private var*/ #_ctx_mbr  /*:MenuBar*/ = new MenuBar("MASTER","ContextMainMenu");
	
	/*public function*/ constructor(){
		super() ;
		/*inherit prop*/ this.formBorderStyle = "none";
		/*inherit prop*/ this.roundEnabled    = true;
		/*inherit prop*/ this.roundStyle      = "10px";
	}
	
	/*public function*/ ContextMenu(params/*:Array*/=null)/*:void*/{

		const emojis /*:Arra*/ = ['🗐','🖊','🔄','🗑','🛠','📝','⚙️','💾','✏️','📁','✂️','🖼️','🔗','🔍','🎨','📋','⚠️','❌'];
		const st /*:String*/ = '<span style="font-size: 10px;">';
		const et /*:String*/ = '</span>';
		this.#_ctx_mbr.setConfig('V','L',true,false,'L',false,10,3,0,false);
		this.#_ctx_mbr.setButton(emojis[0]+' Copi               '+st+'Ctrl+C'+et   , 'cop', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[1]+' Pegar              '+st+'Ctrl+V'+et   , 'pas', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[2]+' Seleccionar        '+st+'Ctrl+A'+et   , 'sel', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[3]+' Borrar             '+st+'Ctrl+Del'+et , 'del', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[4]+' Ajustes / Imprimir '+st+'Ctrl+P'+et   , 'cfg', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[5]+' Notas              '+st+'Ctrl+N'+et   , 'not', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[6]+' Herramientas       '+st+'Ctrl+T'+et   , 'too', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[7]+' Guardar            '+st+'Ctrl+S'+et   , 'sav', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[8]+' Nuevo              '+st+'Ctrl+N'+et   , 'new', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[9]+' Abrir              '+st+'Ctrl+O'+et   , 'ope', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[10]+' Modificar         '+st+'Ctrl+M'+et   , 'mod', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[11]+' Capturar          '+st+'Ctrl+C'+et   , 'cap', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[12]+' Enlace            '+st+'Ctrl+L'+et   , 'lnk', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[13]+' Buscar            '+st+'Ctrl+F'+et   , 'src', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[14]+' Color             '+st+'Ctrl+C'+et   , 'col', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[15]+' Propiedades       '+st+'Ctrl+P'+et   , 'pro', this.#B(this.#Evt), '', null, {path:''});
		this.#_ctx_mbr.setButton(emojis[16]+' Avisos            '+st+'Ctrl+A'+et   , 'warn', this.#B(this.#Evt), '', null, {path:''});		
		this.#_ctx_mbr.setButton(emojis[17]+' Cerrar            '+st+'Ctrl+W'+et   , 'clo', this.#B(this.#Evt), '', null, {path:''});			
		
		this.#_ctx_mbr.startMenu(this.#OnMenuComplete.bind(this));
		this.#_PREPARED = G.FU.lst([[this , FormEvent.FORM_CLOSE, this.#B(this.#Clean)]]);
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	//...

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
		const g /*:Object*/ = this.parent.globalToLocal(new Point(stage.mouseX,stage.mouseY));
		const w /*:Number*/ = this.width;
		const h /*:Number*/ = this.height;
		//Reposicionamos el formulario si se sale fuera de la pantalla
		if((stage.mouseX+w)>stage.width ){g.x-=w;}
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
				  if(name=='cop'){trace('Action for Copy');//
			}else if(name=='pas'){trace('Action for Paste');//
			}else if(name=='ac3'){trace('Action 3 for...');
			}else if(name=='ac4'){trace('Action 4 for...');
			}else if(name=='ac5'){trace('Action 5 for...');
			}else{ 
				trace(label);
			}
		}
	}

	/*private function*/ #Clean(e/*:Event*/)/*:void*/{G.FU.lst(this.#_PREPARED,'remove');}
	/*private function*/ #B(cb/*:Function/callback*/)/*:Function*/ {return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(this);}
}
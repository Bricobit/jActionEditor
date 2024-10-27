/*
MainMenu: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

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
  
Package:      jActionEditor/app/forms/menu/MainMenu
Class:        public class MainMenu
Inheritance:  MainMenu > Form > BaseForm > Sprite > DisplayObjectContainer > InteractiveObject > DisplayObject > EventDispatcher >  _Object
Version:
0.0.3 - Last update 2024-10-27 -> Add contextMenu
0.0.2 - Last update 2024-10-17 -> Change path Property.js with PropertyInspector.js
0.0.1 - Last update 2024-05-06 -> First version

This class is responsible for creating the menu and loading the different windows by default. At the moment everything is sample, some 
things work, others don't. There are still many things to implement and determine menu actions.
*/

class MainMenu extends Form {
	
	/*private var*/ #_BINDINGS     /*:Array*/         = [];
	/*private var*/ #_MMU          /*:MenuBar*/       = new MenuBar("MASTER","MainMenu");
	/*private var*/ #_FIL          /*:MenuBar*/       = new MenuBar("SLAVE" ,"File");
	/*private var*/ #_VIE          /*:MenuBar*/       = new MenuBar("SLAVE" ,"View");
	/*private var*/ #_WIN          /*:MenuBar*/       = new MenuBar("SLAVE" ,"Windows");
	/*private var*/ #_leftBox_frm  /*:Form*/          = new Form('BoxSide1');
	/*private var*/ #_CTX_MENU     /*:String*/        = 'ContextMenu';
	/*private var*/ #_windowRefs   /*:Object<Forms>*/ = {};
	/*private var*/ #_windowIndex  /*:int*/           = 0;
	/*private var*/ #_defWorkSpace /*:Array<Object>*/ = [
		{path:"app/forms/windows/StageEditor.js"       , target:this.controls              , f:'StageEditor',x:-1  , y:10 },
		{path:"app/forms/windows/Elements.js"          , target:this.#_leftBox_frm.controls, f:'Elements'   ,x:0   , y:0  },
		{path:"app/forms/windows/Tools.js"             , target:this.#_leftBox_frm.controls, f:'Tools'      ,x:175 , y:0  },
		{path:"app/forms/windows/SetLayout.js"         , target:this.controls              , f:'SetLayout'  ,x:300 , y:10 },
		{path:"app/forms/windows/GetLayout.js"         , target:this.controls              , f:'GetLayout'  ,x:300 , y:400},
		{path:"app/forms/windows/Actions.js"           , target:this.controls              , f:'Actions'    ,x:350 , y:450},
		{path:"app/forms/windows/PropertyInspector.js" , target:this.controls              , f:'Properties' ,x:1750, y:10 }
	];

	/*public function*/ constructor(){
		super();
		/*inherit prop*/ this.text         = '';
		/*inherit prop*/ this.dock         = 'fill';
		/*inherit prop*/ this.icon         = library.ja2_svg;
		/*inherit prop*/ this.headerHeight = 36;
		/*inherit prop*/ this.tabOnlyFront = true;
		/*inherit prop*/ this.closeBox     = false; 
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* @param {Array<Any>} params
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ MainMenu(params/*:Array*/=null)/*:void*/{
	
		this.#_WIN.setConfig("V","L",true,false,"L",false,10,3,0,false);
		this.#_WIN.setButton("Editor"    , "edi", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[0]);
		this.#_WIN.setButton("Components", "com", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[1]);
		this.#_WIN.setButton("Tools"     , "too", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[2]);
		this.#_WIN.setButton("SetLayout" , "stl", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[3]);
		this.#_WIN.setButton("GetLayout" , "gtl", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[4]);
		this.#_WIN.setButton("Actions"   , "act", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[5]);
		this.#_WIN.setButton("Properties", "pro", this.#B(this.#OnEvt) , '', null, this.#_defWorkSpace[6]);
		
		this.#_FIL.setConfig("V","L",true,false,"L",false,10,3,0,false);
		this.#_FIL.setButton("New"    , "new", this.#B(this.#OnEvt), '', null, {path:''});
		this.#_FIL.setButton("Open"   , "ope", this.#B(this.#OnEvt), '', null, {path:''});
		this.#_FIL.setButton("Save"   , "sav", this.#B(this.#OnEvt), '', null, {path:''});

		this.#_VIE.setConfig("V","L",true,false,"L",false,10,3,0,false);
		this.#_VIE.setButton("Rules"    , "rul", this.#B(this.#OnEvt) , '', null, {path:''});

		this.#_MMU.setConfig("H","L",false,false,"L",false,10,3,0,false);
		this.#_MMU.setButton("File"   , "fil", null           , '', this.#_FIL, {path:''});
		this.#_MMU.setButton("Edit"   , "edi", null           , '', null      , {path:''});
		this.#_MMU.setButton("View"   , "vie", null           , '', this.#_VIE, {path:''});
		this.#_MMU.setButton("Insert" , "ins", null           , '', null      , {path:''});
		this.#_MMU.setButton("Modify" , "mod", null           , '', null      , {path:''});
		this.#_MMU.setButton("Text"   , "tex", null           , '', null      , {path:''});
		this.#_MMU.setButton("Window" , "win", null           , '', this.#_WIN, {path:''});
	
		this.controls.multiForm = true;
		this.#_leftBox_frm.controls.multiForm = true;
		this.#_MMU.startMenu(this.#OnMenuComplete.bind(this));
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ get stageEditor()/*:void*/ {return this.#_windowRefs.StageEditor;}
	/*public function*/ get tools()/*:void*/ {return this.#_windowRefs.Tools;}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

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
		this.addControl(this.#_MMU    ,'headerLeft');
		//this.#LoadDefWorkSpace();
		G.FLoader.loadInline(this.controls,this.#_leftBox_frm,this.#LoadDefWorkSpace.bind(this),null,[this],0,0);
		this.#_leftBox_frm.height = 600;
		this.#_leftBox_frm.width = 238;
		this.#_leftBox_frm.draggableBox = true;
		this.#_leftBox_frm.headerHeight = 22;
		this.#_leftBox_frm.text = '';
		this.#_leftBox_frm.closeBox = false;
		this.#_leftBox_frm.anchorsMargins = {bottom:-30};
		this.#_leftBox_frm.anchor = 'top | bottom';
		stage.addEventListener('contextmenu', this.#OnContextMenu.bind(this));//This event is not intercepted by the EventDispatcher class
		stage.addEventListener(MouseEvent.MOUSE_DOWN, this.#OnStageMouseDown.bind(this));
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* @param {Event} e 
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnContextMenu(e/*:Event*/)/*:void*/{
		e.preventDefault();
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 *
	 * @param {Event} e 
	 *
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnStageMouseDown(e/*:Event*/)/*:void*/{
		if(e.nativeEvent.button==2){
			if(!this.#_windowRefs[this.#_CTX_MENU]){	
				G.FLoader.load(this.controls,'app/forms/windows/ContextMenu.js',this.#OnLoadCtxMenu.bind(this),
				this.#OnCloseCtxMenu.bind(this),[this]);
			}else{
				this.#_windowRefs[this.#_CTX_MENU].moveToMousePointer();
			}
		}else{
			if(this.#_windowRefs[this.#_CTX_MENU]){
				this.#_windowRefs[this.#_CTX_MENU].checkClickOut();
			}
		}
	}	

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* #OnLoadCtxMenu()
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnLoadCtxMenu()/*:void*/ {
		this.#_windowRefs[this.#_CTX_MENU] = G.FLoader.content;
	}
	
	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* #OnCloseCtxMenu()
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnCloseCtxMenu()/*:void*/ {
		delete this.#_windowRefs[this.#_CTX_MENU];
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* @param {Event} e
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnEvt(e/*:Event*/)/*:void*/ {
		const data   /*:String*/ = e.currentTarget.path;
		const name   /*:String*/ = e.currentTarget.name;
		const label  /*:String*/ = e.currentTarget.label
		const params /*:Array*/  = [this,1000, 900,label,true];
		if(data.path!=""){
			G.FLoader.load(data.target,data.path,null,null,params,data.x,data.y);
		}else{
			if(e.currentTarget.name=='rul'){
				this.stageEditor.rules = !this.stageEditor.rules;
			}
		}
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* #LoadDefWorkSpace()
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #LoadDefWorkSpace()/*:void*/ {
		const item /*:Object*/ = this.#_defWorkSpace[this.#_windowIndex];
		G.FLoader.load(item.target,item.path,this.#OnLoadForm.bind(this),null,[this],item.x,item.y);
	}


	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* #OnLoadForm()
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #OnLoadForm()/*:void*/ {
		const item /*:Object*/ = this.#_defWorkSpace[this.#_windowIndex];
		this.#_windowRefs[item.f] = G.FLoader.content;
		if(this.#_windowIndex <this.#_defWorkSpace.length-1){
			this.#_windowIndex++;
			this.#LoadDefWorkSpace();
		}
	}
	
	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* @param {Function} cb 
	* @returns Function
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #B(cb/*:Function/callback*/)/*:Function*/ {
		return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(this);
	}
}
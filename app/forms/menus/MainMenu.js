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
0.0.2 - Last update 2024-10-17 -> Change path Property.js with PropertyInspector.js
0.0.1 - Last update 2024-05-06 -> First version

This class is responsible for creating the menu and loading the different windows by default. At the moment everything is sample, some 
things work, others don't. There are still many things to implement and determine menu actions.
*/
class MainMenu extends Form {
	
	/*private var*/ #_MMU          /*:MenuBar*/       = new MenuBar("MASTER","MainMenu");
	/*private var*/ #_FIL          /*:MenuBar*/       = new MenuBar("SLAVE" ,"File");
	/*private var*/ #_VIE          /*:MenuBar*/       = new MenuBar("SLAVE" ,"View");
	/*private var*/ #_WIN          /*:MenuBar*/       = new MenuBar("SLAVE" ,"Windows");
	/*private var*/ #_evtBind      /*:Function*/      = this.#OnEvt.bind(this);
	/*private var*/ #_button1      /*:Button*/        = new Button();
	/*private var*/ #_leftBox_frm  /*:Form*/          = new Form('BoxSide1');
	/*private var*/ #_button2      /*:Button*/        = new Button();
   //*private var*/ #_ovrBind      /*:Function*/      = this.#OnOver.bind(this);
   //*private var*/ #_outBind      /*:Function*/      = this.#OnOut.bind(this);
	/*private var*/ #_windowRefs   /*:Object<Forms>*/ = {};
	/*private var*/ #_windowIndex  /*:int*/           = 0;
	/*private var*/ #_defWorkSpace /*:Array<Object>*/ = [{path:"app/forms/windows/StageEditor.js"       , target:this.controls              , f:'StageEditor',x:-1  , y:10 },
														 {path:"app/forms/windows/Elements.js"          , target:this.#_leftBox_frm.controls, f:'Elements'   ,x:0   , y:0  },
														 {path:"app/forms/windows/Tools.js"             , target:this.#_leftBox_frm.controls, f:'Tools'      ,x:175 , y:0  },
														 {path:"app/forms/windows/SetLayout.js"         , target:this.controls              , f:'SetLayout'  ,x:300 , y:10 },
														 {path:"app/forms/windows/GetLayout.js"         , target:this.controls              , f:'GetLayout'  ,x:300 , y:400},
														 {path:"app/forms/windows/Actions.js"           , target:this.controls              , f:'Actions'    ,x:350 , y:450},
														 {path:"app/forms/windows/PropertyInspector.js" , target:this.controls              , f:'Properties' ,x:1750, y:10 }];

	/*public function*/ constructor(){
		super();
		/*inherit prop*/ this.text         = '';
		/*inherit prop*/ this.dock         = 'fill';
		/*inherit prop*/ this.icon         = library.ja2_svg;
		/*inherit prop*/ this.headerHeight = 36;
		/*inherit prop*/ this.tabOnlyFront = true;
		/*inherit prop*/ this.closeBox     = false; 
		this.#_button1.label               = '1 userRight';
		this.#_button2.label               = '2 userCenter';
	}

	/*public function*/ MainMenu(params/*:Array*/=null)/*:void*/{
	
		this.#_WIN.setConfig("V","L",true,false,"L",false,10,3,0,false);
		this.#_WIN.setButton("Editor"    , "edi", this.#_evtBind , '', null, this.#_defWorkSpace[0]);
		this.#_WIN.setButton("Components", "com", this.#_evtBind , '', null, this.#_defWorkSpace[1]);
		this.#_WIN.setButton("Tools"     , "too", this.#_evtBind , '', null, this.#_defWorkSpace[2]);
		this.#_WIN.setButton("SetLayout" , "stl", this.#_evtBind , '', null, this.#_defWorkSpace[3]);
		this.#_WIN.setButton("GetLayout" , "gtl", this.#_evtBind , '', null, this.#_defWorkSpace[4]);
		this.#_WIN.setButton("Actions"   , "act", this.#_evtBind , '', null, this.#_defWorkSpace[5]);
		this.#_WIN.setButton("Properties", "pro", this.#_evtBind , '', null, this.#_defWorkSpace[6]);
		

		this.#_FIL.setConfig("V","L",true,false,"L",false,10,3,0,false);
		this.#_FIL.setButton("New"    , "new", this.#_evtBind , '', null, {path:''});
		this.#_FIL.setButton("Open"   , "ope", this.#_evtBind , '', null, {path:''});
		this.#_FIL.setButton("Save"   , "sav", this.#_evtBind , '', null, {path:''});

		this.#_VIE.setConfig("V","L",true,false,"L",false,10,3,0,false);
		this.#_VIE.setButton("Rules"    , "rul", this.#_evtBind , '', null, {path:''});

		this.#_MMU.setConfig("H","L",false,false,"L",false,10,3,0,false);
		this.#_MMU.setButton("File"   , "fil", null           , '', this.#_FIL, {path:''});
		this.#_MMU.setButton("Edit"   , "edi", null           , '', null      , {path:''});
		this.#_MMU.setButton("View"   , "vie", null           , '', this.#_VIE, {path:''});
		this.#_MMU.setButton("Insert" , "ins", null           , '', null      , {path:''});
		this.#_MMU.setButton("Modify" , "mod", null           , '', null      , {path:''});
		this.#_MMU.setButton("Text"   , "tex", null           , '', null      , {path:''});
		this.#_MMU.setButton("Window" , "win", null           , '', this.#_WIN, {path:''});
		//this.#_MMU.addEventListener(MouseEvent.ROLL_OVER, this.#_ovrBind);
		//this.#_MMU.addEventListener(MouseEvent.ROLL_OUT, this.#_outBind);
		this.controls.multiForm = true;
		this.#_leftBox_frm.controls.multiForm = true;
		this.#_MMU.startMenu(this.#OnMenuComplete.bind(this));
	}

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
	}

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

	/*private function*/ #LoadDefWorkSpace()/*:void*/ {
		let item = this.#_defWorkSpace[this.#_windowIndex];
		G.FLoader.load(item.target,item.path,this.#OnLoadForm.bind(this),null,[this],item.x,item.y);
	}

	/*private function*/ #OnLoadForm()/*:void*/ {
		let item = this.#_defWorkSpace[this.#_windowIndex];
		this.#_windowRefs[item.f] = G.FLoader.content;
		if(this.#_windowIndex <this.#_defWorkSpace.length-1){
			this.#_windowIndex++;
			this.#LoadDefWorkSpace();
		}
	}


	/*public function*/ get stageEditor()/*:void*/ {return this.#_windowRefs.StageEditor;}
	/*public function*/ get tools()/*:void*/ {return this.#_windowRefs.Tools;}

	//*private function*/ #OnOver(e/*:Event*/)/*:void*/{this.controls.bringToFront(this.#_MMU);}
	//*private function*/ #OnOut(e/*:Event*/ )/*:void*/{this.controls.sendToBack(this.#_MMU);  }


	/*

let baseNameMatch = G.FLoader.content.name.match(/(\w+)_instance_\d+/);
  if (baseNameMatch) {
    let baseName = baseNameMatch[1];
    // Crea una copia del array original para la comprobación
    let originalDefWorkSpace = [...this.#_defWorkSpace];
    // Comprueba si el nombre base está en la copia del array original
    if (originalDefWorkSpace.includes(baseName)) {
      // Actualiza el objeto #_windowRefs solo si el formulario está definido
      this.#_windowRefs[baseName] = {
        instance: G.FLoader.content,
        uniqueId: G.FLoader.content.name
      };
    }
  }
	*/
}
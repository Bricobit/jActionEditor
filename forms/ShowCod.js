/*
ShowCod   Copyright © [2020] - Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com

@license
jActionLib and jActionFramework is subject to the terms of the Mozilla private
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

You can freely use jActionLib and jActionFramework within MPL limitations.

The default images that are used by the library and the framework have been created completely
from scratch and we have the source files to demonstrate it, therefore they are copyrighted but
can be used freely and even commercially, as long as they are used together to the library and
the framework. You cannot take the images from the library and the framework and use them 
separately elsewhere.

The images and example codes that are not part of the library or the framework are copyrighted
and their use is not allowed outside the learning objective and visual sample for their own use,
you can upload the examples to your server with the intention of use private to see how it works,
but it is not allowed to publish these examples publicly permanently, through fixed links or 
indentations in search engines, for more information read the section about copyright at www.jaction.org

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

ShowCod
*/
class ShowCod extends Form {

	
	/*private var*/ #_syntaxCode_txf  /*:TextField*/  = new TextField();
	/*private var*/ #_urlLoader       /*:URLLoader*/  = new URLLoader();
	/*private var*/ #_tf1             /*:TextFormat*/ = new TextFormat();
	/*private var*/ #_liveExample_btn /*:Button*/     = new Button();
	/*private var*/ #_onClickBind     /*:Function*/   = this.#OnClick.bind(this);
	/*private var*/ #_cleanBind       /*:Function*/   = this.#Clean.bind(this);
	/*private var*/ #_onCompleteBind  /*:Function*/   = this.#OnComplete.bind(this);
	/*private var*/ #_target          /*:String*/     = '';
	/*private var*/ #_live            /*:Boolean*/    = false;

	/*private function*/ constructor()/*:void*/{
		super();
		/*inherit prop*/ this.formStartPosition                   = "CenterWidth";
		/*inherit prop*/ this.icon                                = library.jsc_svg.path;
		/*inherit prop*/ this.background                          = "#212c3d";
		/*inherit prop*/ this.tabOnlyFront                        = true;
		/*inherit meth*/ this.getFromForm('headerBar').background = "#1b2432";
	}

	/*private function*/ ShowCod(params/*:Array*/=null)/*:void*/{
		this.#_target                           = params[0];
		/*inherit prop*/ this.width             = params[1];
		/*inherit prop*/ this.height            = params[2];
		/*inherit prop*/ this.text              = params[3];
		this.#_live                             = params[4];
		this.#_tf1.size                         = 13;
		this.#_tf1.leading                      = 18;
		this.#_tf1.color                        = '#dbe1ec';
		this.#_syntaxCode_txf.scrollsHidden     = false;
		this.#_syntaxCode_txf.defaultTextFormat = this.#_tf1;
		this.#_syntaxCode_txf.move(5,0);
		
		if(this.#_live){
			this.#_liveExample_btn.label = 'Run Example';
			this.#_liveExample_btn.addEventListener(MouseEvent.CLICK, this.#_onClickBind);
			this.addControlBox(this.#_liveExample_btn);
		}
		this.#_syntaxCode_txf.setSize(this.width-10,this.controls.height-5);
		this.addControl(this.#_syntaxCode_txf);
		this.addEventListener(FormEvent.FORM_CLOSE, this.#_cleanBind);
		this.#_urlLoader.addEventListener(Event.COMPLETE, this.#_onCompleteBind);
		this.#_urlLoader.load(new URLRequest(this.#_target));
	}

	/*public function*/ #OnComplete(e/*:Event*/)/*:void*/ {
		let data     /*:String*/ = this.#_urlLoader.data;
		let start    /*:int*/    = data.indexOf('@lcc') ; 
		let end      /*:int*/    = data.indexOf('@/lcc')+5 ;
		let subtract /*:String*/ = data.slice (start,end) ;
		let empty    /*:String*/ = '';
		if(start==-1){
			start                = data.indexOf('/*') ; 
			end                  = data.indexOf('*/')+2 ;
			subtract             = data.slice (start,end);
			data                 = data.replace(subtract, '');
		}else{
			data                 = data.replace(subtract, '');
			start                = data.indexOf('/*') ; 
			end                  = data.indexOf('*/')+2 ;
			subtract             = data.slice (start,end);
			empty                = subtract.replace(/\r?\n|\r/g, "").replace(/ /g,'');
			if(empty =='/**/'){
				data = data.replace(subtract, '');
			}
		}
		this.#_syntaxCode_txf.htmlText = G.SyntaxColor.highlight(data,"js");
	}

	/*private function*/ #OnClick(e/*:Event*/=null)/*:void*/{G.FLoader.load(this.controls,this.#_target);}

	/*private function*/ #Clean(e/*:Event*/)/*:void*/{
		this.#_urlLoader.removeEventListener(Event.COMPLETE, this.#_onCompleteBind);
		if(this.#_live){
			this.#_liveExample_btn.removeEventListener(MouseEvent.CLICK, this.#_onClickBind);
		}
		this.removeEventListener(FormEvent.FORM_CLOSE, this.#_cleanBind);
	}
}
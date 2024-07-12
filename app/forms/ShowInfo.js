/*
ShowInfo - Copyright © [2020] - Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
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

ShowInfo
*/
	class ShowInfo extends Form {
		constructor(){
		super();
		/*inherit prop*/ this.formStartPosition                 = "CenterWidth";
		/*inherit prop*/ this.icon                              = library.jsc_svg.path;
		/*inherit prop*/ this.background                        = "#212c3d";
		/*inherit prop*/ this.tabOnlyFront                      = true;
		/*private var*/  this._syntaxCode_txf   /*:TextField*/  = new TextField();
		/*private var*/  this._urlLoader        /*:URLLoader*/  = new URLLoader();
		/*private var*/  this._tf1              /*:TextFormat*/ = new TextFormat();
		/*private var*/  this._destroyBind      /*:Function*/   = this.destroy.bind(this);
		/*private var*/  this._onCompleteBind   /*:Function*/   = this.onComplete.bind(this);
	}

	/*private function*/ ShowInfo(params/*:Array*/=null)/*:void*/{
		this.width  = params[1];
		this.height = params[2];
		this.text   = params[3];
		this.addEventListener(FormEvent.FORM_CLOSE, this._destroyBind);
		this._urlLoader.addEventListener(Event.COMPLETE, this._onCompleteBind);
		this._urlLoader.load(new URLRequest(params[0]));
	}

	/*public function*/ onComplete(e/*:Event*/)/*:void*/ {
		this._tf1.size                          = 13;
		this._tf1.leading                       = 18;
		this._tf1.color                         = '#dbe1ec';
		this._syntaxCode_txf.defaultTextFormat  = this._tf1;
		this._syntaxCode_txf.move(5,0);
		this._syntaxCode_txf.setSize(this.width-10,this.height-40);
		this._syntaxCode_txf.htmlText           = G.SyntaxColor.highlight(this._urlLoader.data,"js");
		this.addControl(this._syntaxCode_txf);
	}

	/*private function*/ destroy(e/*:Event*/)/*:void*/{
		this.removeEventListener(FormEvent.FORM_CLOSE, this._destroyBind);
		this._urlLoader.removeEventListener(Event.COMPLETE, this._onCompleteBind);
	}
}
jActionGlobalClass = new ShowInfo();
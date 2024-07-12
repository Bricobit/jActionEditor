/* 
jActionEditor: Based on Free (MPL) {jAction Lib} && {jAction FrameWork} - www.jaction.org -
Author: Javier Vicente Medina - giskard2010@hotmail.com - http://jvm.bricobit.com - 

@license
This Source Code is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-License-Identifier: MPL-2.0 - Copyright (c) [Javier Vicente Medina]. Images or icons, except possible 
emojis, are part of the [jActionEditor] project and are licensed under the Mozilla Public License 2.0. 
They are copyrighted and may only be used within the editor itself or in projects directly derived from it. 
Their use in other projects or contexts is not permitted without the explicit permission of the author. 
Contributions of images or icons by third parties must include a copyright notice indicating the original author. 
Contributors must ensure they have the necessary rights to any images or icons they upload. Contributions of code 
by third parties must include a copyright notice indicating the original author. Contributors must ensure they 
have the necessary rights to any code they upload. By contributing code to this project, Contributors agree to 
license their contributions of images or code under the same terms as the main project license 
(Mozilla Public License 2.0).
*/

class Index {
 		
	/*private var*/ #_BINDS     /*:Object*/ = {};
	/*private var*/ #_urlParams /*:Object*/ = {};
	/*private var*/ #_version   /*:String*/ = '';
	  
	/*public function*/ constructor(urlParams /*:Object*/,version /*:String*/){

		this.#_urlParams = urlParams;
		this.#_version   = version;

		//Global Access Properties for the Entire Program
		/*public var*/ this.AppStart        /*:String*/          = null;
		/*public var*/ this.Framework       /*:Framework*/       = null;
		/*public var*/ this.LdrAnim         /*:LoaderAnimation*/ = null;
		/*public var*/ this.FLoader         /*:FormLoader*/      = null;
		/*public var*/ this.InitForm        /*:InitForm*/        = null;
		/*public var*/ this.Server          /*:ServerRPC*/       = null;
		/*public var*/ this.MsgBox          /*:MsgBox*/          = null;
		/*public var*/ this.CheckInactivity /*:CheckInactivity*/ = null; 
		/*public var*/ this.DatePicker      /*:DatePicker*/      = null;
		/*public var*/ this.TextFader       /*:TextFader*/       = null;
		/*public var*/ this.SessionClose    /*:Function*/        = null;
		/*public var*/ this.FU              /*:FormUtils*/       = null; 
		/*public var*/ this.domain          /*:String*/          = '';
		/*public var*/ this.rootPath        /*:String*/          = '';
		/*public var*/ this.absRootPath     /*:String*/          = '';
		/*public var*/ this.SyntaxColor     /*:SyntaxColor*/     = null;

		//We listen when the jAction library is ready
		stage.addEventListener(Event.ADDED,this.#B(this.#OnInit));
	}
 
	/*public function*/ #OnInit(e/*:Event*/)/*:void*/{
		stage.removeEventListener(Event.ADDED,this.#B(this.#OnInit));
		stage.focusManager.tabOnlyFromFront = true;
		//We retrieve the routes from config.json
		this.domain      = config.domain;
		this.rootPath    = config.rootPath;
		this.absRootPath = config.absRootPath;

		//We initialize the jAction-based framework and listen when it is ready
		this.Framework = new Framework();
		this.Framework.addEventListener(FrameworkEvent.INITIALIZED,this.#B(this.#OnFWInitialized));
		this.Framework.initialize();	
	}

	/*private function*/ #OnFWInitialized(e/*:Event*/)/*:void*/{
		this.Framework.removeEventListener(FrameworkEvent.INITIALIZED,this.#B(this.#OnFWInitialized,true));
		this.LdrAnim                   = jAction.framework.loaderAnimation; //We create a short alias in a property of the global object of the LoaderAnimation class      	 
		this.FLoader                   = jAction.framework.formLoader;      //The same
		this.MsgBox                    = jAction.framework.msgBox;          //The same
		this.Server                    = new ServerRPC(config.gatewayPath); //A single reusable instance of global access
		this.DatePicker                = new DatePicker(); //A single reusable instance of global access
		this.TextFader                 = new TextFader();  //A single reusable instance of global access
		this.FU                        = FormUtils; //FU is a shorthand alias of static FormUtils class
		this.FLoader.evalMode          = 'eval'; //type 'import' for production, type 'eval' for debug(develop) 
		this.FLoader.preserveModules   = true;   //When the module is closed it is not deleted and when it is called again it is not necessary to load it because it resides in memory.
		this.Server.onSessionCloseGoTo = this.rootPath+"index.php";
		this.SessionClose              = function ConfirmClose()/*:void*/{this.MsgBox.msg(this.Server.close.bind(this.Server),null,null,null,MsgBoxType.YES_NO,"Se dispone a cerrar sesión<br>¿Está seguro?","Aviso",500);};
		//this.DatePicker.language     = this.MsgBox.language = 'es';

		//Once the library and the framework are initialized, we initialize the application
		this.AppStart = new AppStart(this.#_urlParams,this.#_version);
	}

	/*private function*/ #B(cb/*:Function/callback*/, del/*:Boolean*/=false)/*:Function*/ {
		if(this.#_BINDS[cb.name]){
			const bind /*:Function*/ = this.#_BINDS[cb.name];
			if(del){
				delete this.#_BINDS[cb.name];
			}
			return bind;
		}else{
			return this.#_BINDS[cb.name] = cb.bind(this);
		}
	}
}
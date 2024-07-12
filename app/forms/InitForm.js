/*
Samples Copyright © [2020] - Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com

@license
jActionLib and jActionFramework is subject to the terms of the Mozilla private
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

You can freely use jActionLib and jActionFramework within MPL limitations.

The default images that are used by the library and the framework, are copyrighted but
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
*/
class InitForm extends BaseForm {

	/*private var*/ #_footHeight    /*:int*/    = 22;
	/*private var*/ #_foot_spt      /*:Sprite*/ = new Sprite();
	/*private var*/ #_container_spt /*:Sprite*/ = new Sprite();
	/*private var*/  #_ver_lbl /*:Label*/  = new Label();

	/*public function*/ constructor(){
		super();
		/*inherit prop*/ this.tabOnlyFront = true;
		/*inherit prop*/ this.cssWidth     = "100%";
		/*inherit prop*/ this.cssHeight    = "100%";
	}

	/*public function*/ InitForm(params/*:Array*/=null)/*:void*/{
        //footer
		this.#_foot_spt.height              = this.#_footHeight;
		this.#_foot_spt.backgroundColor     = "#1B2433";
        this.#_foot_spt.border              = "1px solid black";
        //container
		this.#_container_spt.cssWidth       = "100%"; 
		this.#_container_spt.horizontalScrollPolicy = this.#_container_spt.verticalScrollPolicy = 'auto'; 
		this.#_container_spt.scrollbarWidth = "thin";
		this.#_container_spt.scrollbarColor = '#4D5664 #212C3D';

		stage.addEventListener(Event.RESIZE,this.#OnStageResize.bind(this));
		this.addChild(this.#_container_spt);
		this.addChild(this.#_foot_spt);
		this.#OnStageResize();
		G.FLoader.load(this.#_container_spt,'app/forms/menus/MainMenu.js',null,null,params);
		this.#_foot_spt.addChild(this.#_ver_lbl);

		this.#_ver_lbl.htmlText        = ' 🇻. 0.0.0 - Experimental beta';
		this.#_ver_lbl.y               = this.#_foot_spt.height/2 - this.#_ver_lbl.height/2;
		
	}

	/*private function*/ #OnStageResize(e/*:Event*/=null)/*:void*/{
		this.#_foot_spt.width       = stage.stageWidth;
		this.#_foot_spt.y           = stage.stageHeight-this.#_footHeight;
		this.#_container_spt.height = stage.stageHeight-this.#_footHeight;
	}
}
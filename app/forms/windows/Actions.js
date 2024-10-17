/*
Sample: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com

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
*/

class Actions extends Form {

    /*private var*/ #_box_spt /*:Sprite*/    = new Sprite();
    /*private var*/ #_owner    /*:Form*/     = null;
	/*private var*/ #_editor   /*:Object*/   = null;

	/*public function*/ constructor(){
        super();     
        /*inherit prop*/ this.width        = 450;
        /*inherit prop*/ this.height       = 400;
        /*inherit prop*/ this.text         = 'Actions'; 
        /*inherit prop*/ this.draggableBox = true;
        /*inherit prop*/ this.headerHeight = 22;
	}

	/*public function*/ Actions(params/*:Array*/=null)/*:void*/{
		this.#_owner = params[0];
		this.addControl(this.#_box_spt);
		this.#_box_spt.setSize(this.controls.width,this.controls.height);

		require.config({paths:{'vs': 'dependencies/third-parties/monaco-editor/min/vs'}});
		require(['vs/editor/editor.main'], this.#OnLoadEditor.bind(this));
    }

	/*private function*/ #OnLoadEditor(e/*:Event*/)/*:void*/{
		const code /*:String*/ = `\nfunction x() {\n\tconsole.log("Hello world!");\n}`;
		this.#_editor = monaco.editor.create(this.#_box_spt.node, {value:code,language:'javascript',automaticLayout:true});
		this.#_editor.automaticLayout = true;
		
		/*
		jAction.js has a code that blocks the space if you click on a component that is not of the type accepted
		as text, for that reason the attribute type='text' is added to the textarea of ​​monaco-editor to avoid 
		blocking the space key.
		*/
		this.#_box_spt.node.querySelector('.inputarea').setAttribute('type', 'text');
		//this.#_box_spt.addEventListener('resize', this.#OnResize.bind(this)); resize solo funciona con el stage es decir con document
		//this.#_box_spt.node.addEventListener(Event.RESIZE,this.#OnResize.bind(this));
		this.#_box_spt.node.style.resize =  'both';
		this.#_box_spt.node.style.overflow =  'auto';

		//Pendiente abstraer esto en un addEventListener(Event.OBSERVER)
		//const ro = new ResizeObserver(this.#OnResize.bind(this));
		//ro.observe(this.#_box_spt.node);
	}

	
	/*private function*/ #OnResize(e/*:Event*/)/*:void*/ {
    	//this.#_editor.layout();
  	}
}
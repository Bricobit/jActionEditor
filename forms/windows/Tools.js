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
class Tools extends Form {

    /*private var*/ #_toolHand_btn /*:Button*/ = new Button(undefined,22,22);
    /*private var*/ #_owner        /*:Form*/   = null;

	/*public function*/ constructor(name='Tools'){
		super(name);
        /*inherit prop*/ this.width        = 63;
        /*inherit prop*/ this.height       = 300;
        /*inherit prop*/ this.text         = 'Tools'; 
        ///*inherit prop*/ this.draggableBox = true;
        this.closeBox = false;
        /*inherit prop*/ this.headerHeight = 22;
        this.#_toolHand_btn.label = '✋🏻';
	}

	/*public function*/ Tools(params/*:Array*/=null)/*:void*/{
        this.#_owner = params[0];
        this.addControl(this.#_toolHand_btn);
        this.#_toolHand_btn.addEventListener(MouseEvent.CLICK,this.#OnHandClick.bind(this));
    }

    /*private function*/ #OnHandClick(e/*:Event*/)/*:void*/{
       this.#_owner.stageEditor.toolHand = !this.#_owner.stageEditor.toolHand;
    }
}
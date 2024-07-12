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
class StageEditorTest extends Form {

   
    /*private var*/  #_stageEditor      /*:Rules*/     = new StageEditor(1100,768);

	/*public function*/ constructor(){
        super();     
        /*inherit prop*/ this.width                = 800;
        /*inherit prop*/ this.height               = 800;
        /*inherit prop*/ this.formStartPosition    = 'CenterWidth';
        /*inherit prop*/ this.positionFrom         = 'parent';
        /*inherit prop*/ this.text                 = 'StageEditorTest';//1 drag 2 minimi 3 button 
        /*inherit prop*/ this.icon                 = library.fol_svg;
        /*inherit prop*/ this.draggableBox = true;
		/*inherit prop*/ this.minimizeBox = true;
        /*inherit prop*/ this.tabOnlyFront         = true;
        /*inherit prop*/ this.protector.back = true;
        /*inherit prop*/ this.headerHeight = 64;
	}

	/*public function*/ StageEditorTest(params/*:Array*/=null)/*:void*/{
        this.addControl(this.#_stageEditor);
    }
}
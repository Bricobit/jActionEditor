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
class StageEditor extends Form {

    /*private var*/ #_stageEditor /*:StageEditor*/ = null;

	/*public function*/ constructor(){
        super();     
        /*inherit prop*/ this.width             = 1024;
        /*inherit prop*/ this.height            = 768;
        /*inherit prop*/ this.formStartPosition = 'CenterWidth';
        /*inherit prop*/ this.positionFrom      = 'parent';
        /*inherit prop*/ this.text              = 'Sin titulo'; 
        /*inherit prop*/ this.draggableBox      = true;
		/*inherit prop*/ this.minimizeBox       = true;
        /*inherit prop*/ this.headerHeight      = 22;
        this.#_stageEditor  = new StageEditorSPT(1024,768);
	}

	/*public function*/ StageEditor(params/*:Array*/=null)/*:void*/{
        this.addControl(this.#_stageEditor);
    }

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set onSelectedItems(callback/*:Function*/)/*:Number*/{
        this.#_stageEditor.onSelectedItems = callback;
    }
    /*public function*/ get onSelectedItems()/*:Function*/{
        return this.#_stageEditor.onSelectedItems;
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * selectedItems
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ get selectedItems()/*:Number*/{
        return this.#_stageEditor.selectedItems;
    }

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * add
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ add(value)/*:Number*/{return this.#_stageEditor.add(value);}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * stageCanvas
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ get stageCanvas()/*:Number*/{return this.#_stageEditor.stageCanvas;}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * toolHand
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set toolHand(value/*:Number*/)/*:void*/{
        this.#_stageEditor.toolHand = value; 
    }
    /*public function*/ get toolHand()/*:Number*/{return this.#_stageEditor.toolHand;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * rules
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set rules(value/*:Number*/)/*:void*/{
        this.#_stageEditor.rules = value; 
    }
    /*public function*/ get rules()/*:Number*/{return this.#_stageEditor.rules;}
}
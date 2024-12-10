/*
SimpleLayout: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 

Package:      jActionEditor/app/forms/windows/SimpleLayout.js
Class:        public class SimpleLayout
Inheritance:  SimpleLayout > Form > BaseForm > Sprite > DisplayObjectContainer > InteractiveObject > DisplayObject > EventDispatcher >  _Object
Version:
0.0.2 - Last update 2024-11-06 -> 
0.0.1 - Last update xxxx-xx-xx -> First version
*/
class SimpleLayout extends Form {

    /*private var*/ #_stageWrap /*:SimpleLayout*/ = null;

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
        this.#_stageWrap  = new StageWrap(1024,768);
        this.addTypeEvent(EditorEvent.EDITOR_ITEMS_CHANGE);
		this.addTypeEvent(EditorEvent.EDITOR_ITEMS_SELECT);
	}

	/*public function*/ SimpleLayout(params/*:Array*/=null)/*:void*/{
        this.addControl(this.#_stageWrap);
    }


    /*public function*/ get stageWrap()/*:Function*/{
        return this.#_stageWrap;
    }

    /*public function*/ set selectedItems(item/*:DisplayObject*/)/*:void*/{
		this.#_stageWrap.selectedItems = item;
	}
	/*public function*/ get selectedItems()/*:DisplayObject*/{return this.#_stageWrap.selectedItems;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * 
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set onSelectedItems(callback/*:Function*/)/*:Number*/{
        this.#_stageWrap.onSelectedItems = callback;
    }
    /*public function*/ get onSelectedItems()/*:Function*/{
        return this.#_stageWrap.onSelectedItems;
    }

    /*public function*/ set onMoveSelectedItems(callback/*:Function*/)/*:Number*/{
        this.#_stageWrap.onMoveSelectedItems = callback;

    }
    /*public function*/ get onMoveSelectedItems()/*:Function*/{
        return this.#_stageWrap.onMoveSelectedItems;
    }
    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * selectedItems
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ get selectedItems()/*:Number*/{
        return this.#_stageWrap.selectedItems;
    }

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * add(value:DisplayObject):void
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ add(value/*:DisplayObject*/)/*:void*/{return this.#_stageWrap.add(value);}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * remove(value:DisplayObject):void
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ remove(value/*:DisplayObject*/)/*:void*/{return this.#_stageWrap.remove(value);}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * virtualStage
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ get virtualStage()/*:Number*/{return this.#_stageWrap.virtualStage;}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * toolHand
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set toolHand(value/*:Number*/)/*:void*/{
        this.#_stageWrap.toolHand = value; 
    }
    /*public function*/ get toolHand()/*:Number*/{return this.#_stageWrap.toolHand;}

     /**-----------------------------------------------------------------------------------------------------------------------------------
     * 
     * rules : Boolean
     * 
     *----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ set rules(value/*:Boolean*/)/*:void*/{this.#_stageWrap.rules = value;}
    /*public function*/ get rules()/*:Boolean*/{return this.#_stageWrap.rules;}
}
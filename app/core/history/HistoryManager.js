/* 
HistoryManager: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry. 
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 

Package:      jActionEditor/app/core/history/HistoryManager
Class:        public class HistoryManager
Inheritance:  De momento no hereda, pero quizás pueda heredar de EventDispatcher a medida que avance la clase si se ve necesario
Version:

0.0.1 - Last update 2024-10-28 -> First version
*/


class HistoryManager {

    /*private var*/ #_UNDO_STACK    /*:Array*/            = [];
	/*private var*/ #_REDO_STACK    /*:Array*/            = [];
    /*private var*/ #_emulatedStage /*:Sprite*/           = [];
    /*private var*/ #_observer_cfg  /*:Object*/           = {childList:  true,   // Solo observar cambios en los nodos hijos
                                                             attributes: true,   // Observar cambios en nodos hijos y atributos
                                                             subtree:    true }; // Observar cambios en nodos hijos, atributos y descendientes
    /*private var*/ #_observer      /*:MutationObserver*/ = null
		
	/*public function*/ constructor(emulatedStage /*:Sprite*/){
		this.#_emulatedStage = emulatedStage;
        this.#_observer = new MutationObserver(this.#ObserverChange.bind(this));
        this.#_observer.observe(this.#_emulatedStage.virtualStage.node, this.#_observer_cfg);
	}
	
	
	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	//...

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	 *
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ saveState()/*:void*/ {
		
            const state = Array.from(this.stage.children).map(child => ({
                id: child.id,
                html: child.outerHTML,
                position: {
                    top: child.style.top,
                    left: child.style.left
                }
            }));
            this.undoStack.push(state);
            this.redoStack.length = 0; 
	}

    /**-----------------------------------------------------------------------------------------------------------------------------------
	 *
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ undo()/*:void*/ {
		
	}

    /**-----------------------------------------------------------------------------------------------------------------------------------
     *
     *-----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ redo()/*:void*/ {

    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
     *
     *-----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ currentState()/*:void*/ {

    }
	

     /**-----------------------------------------------------------------------------------------------------------------------------------
     *
     *-----------------------------------------------------------------------------------------------------------------------------------*/

    /*public function*/ restoreState()/*:void*/ {

    }
	

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PRIVATE METHODS  * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   Pascal Case     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

    /**-----------------------------------------------------------------------------------------------------------------------------------
	 *
	 *-----------------------------------------------------------------------------------------------------------------------------------*/

	/*private function*/ #ObserverChange(mutationsList/*:Array<MutationRecord>*/, observer/*:MutationObserver*/)/*:void*/ {
		// for (let mutation of mutationsList) {
        //     if (mutation.type === 'childList') {
        //         trace('Se ha añadido o eliminado un nodo hijo.');
        //     } else if (mutation.type === 'attributes') {
        //         trace('Se ha cambiado un atributo.');
        //     }
        // }
        this.saveState();
	}

}
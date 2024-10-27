/*
EditorEvent: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
Author: Javier Vicente Medina - giskard2010@hotmail.com
May contain mixed comments in English and Spanish, sorry.
For production minify this class to remove comments with the jActionMinifyAndMergeManual.bat script.

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License

Package:		jActionEditorDev/app/core/events/EditorEvent.js
Class:			Public class EditorEvent
Inheritance:	EditorEvent -> Event -> _Object
Version:		0.0.1 - Last Update 2024-10-21 -> First Version
*/

class EditorEvent extends Event{

	/*private var*/ #_itemsSelect /*:Array<DisplayObject>*/ = null;
	/*private var*/ #_itemsChange /*:Array<DisplayObject>*/ = null;

	/*public function*/ constructor(type        /*:String*/, 
									bubbles     /*:Boolean*/ = true ,
									cancelable  /*:Boolean*/ = false,
									itemsSelect /*:Array*/   = null ,
									itemsChange /*:Array*/   = null ){
		super(type, bubbles, cancelable);
		this.#_itemsSelect = itemsSelect;
		this.#_itemsChange = itemsChange;
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * PUBLIC PROPERTIES * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* itemsSelect : Array
	*
	* The itemsSelect value that is associated with the event.
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ get itemsSelect()/*:Array*/{return this.#_itemsSelect;}
	/*public function*/ set itemsSelect(value/*:Array*/)/*:void*/{this.#_itemsSelect = value;}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* itemsChange : Array
	*
	* The itemsChange value that is associated with the event.
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ get itemsChange()/*:Array*/{return this.#_itemsChange;}
	/*public function*/ set itemsChange(value/*:Array*/)/*:void*/{this.#_itemsChange = value;}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC METHODS   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*----------------------------------------------------------------------------------------------------------------------------------*/

	//...

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * *                    * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PUBLIC CONSTANTS  * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * *                    * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*----------------------------------------------------------------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* EDITOR_ITEMS_SELECT:String
	*
	* [static] Defines the value of the type property of an editorItemsSelect.
	*
	* It is launched every time one or more components of the stage are selected.
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public*/ static /*function*/ EDITOR_ITEMS_SELECT()/*:String*/{
		return 'editorItemsSelect';
	}

	/**-----------------------------------------------------------------------------------------------------------------------------------
	*
	* EDITOR_ITEMS_CHANGE:String
	*
	* [static] Defines the value of the type property of an editorItemsChange.
	*
	* It is constantly launched whenever one or more components of the stage are selected and they change position while being dragged
	* or if they are resized using drag selectors.
	*
	*-----------------------------------------------------------------------------------------------------------------------------------*/

	/*public*/ static /*function*/ EDITOR_ITEMS_CHANGE()/*:String*/{
		return 'editorItemsChange';
	}
}
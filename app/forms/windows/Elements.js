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
class Elements /*Alias of Components*/ extends Form {

    /*private var*/ #_BINDINGS /*:Array*/ = [];
	/*private var*/ #_PREPARED /*:Array*/ = [];
    /*private var*/ #_com_lst  /*:List*/  = new List();
    /*private var*/ #_owner    /*:Form*/  = null;

	/*public function*/ constructor(name='Elements'){
		super(name);
        /*inherit prop*/ this.width        = 175;
        /*inherit prop*/ this.height       = 500;
        /*inherit prop*/ this.text         = 'Components'; 
        /*inherit prop*/ this.headerHeight = 22;
        /*inherit prop*/ this.anchor       = 'top | bottom';
	}

	/*public function*/ Elements(params/*:Array*/=null)/*:void*/{
        this.#_owner = params[0];
        this.addControl(this.#_com_lst);
        this.#_com_lst.dataProvider = new DataProvider([
            ['Button'        ,Button        ],
            ['CheckBox'      ,CheckBox      ],
            ['ColorPicker'   ,ColorPicker   ],
            ['ComboBox'      ,ComboBox      ],
            ['DataGrid'      ,DataGrid      ],
            ['Label'         ,Label         ],
            ['List'          ,List          ],
            ['NumericStepper',NumericStepper],
            ['ProgressBar'   ,ProgressBar   ],
            ['RadioButton'   ,RadioButton   ],
            ['Slider'        ,Slider        ],
            ['TextArea'      ,TextArea      ],
            ['TextInput'     ,TextInput     ]]);
        this.#_com_lst.height = this.controls.height;
        this.#_com_lst.width  = this.width;
        this.#_PREPARED       = G.FU.lst([[this          , FormEvent.FORM_CLOSE        , this.#B(this.#Clean)             ],
									      [this.#_com_lst, MouseEvent.CLICK            , this.#B(this.#OnHandClick)       ],
                                          [this          , FormEvent.FORM_HEIGHT_CHANGE, this.#B(this.#HeightChange)]]);		
    }

    /*private function*/ #HeightChange(e/*:Event*/)/*:void*/{
        this.#_com_lst.height = this.controls.height;
    }

    /*private function*/ #OnHandClick(e/*:Event*/)/*:void*/{
        const component /*:UIComponent*/ = new this.#_com_lst.selectedItem.data();
        component.editorModeEnabled = true;
        component.mouseEnabled = false;
        component.mouseChildren = false;
       this.#_owner.stageEditor.add(component);
    }

    /*private function*/ #Clean(e/*:Event*/)/*:void*/{
        G.FU.lst(this.#_PREPARED,'remove');}
	/*private function*/ #B(cb/*:Function/callback*/)/*:Function*/ {return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(this);}
}
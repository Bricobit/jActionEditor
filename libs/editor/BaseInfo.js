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
class BaseInfo extends Form {

    /*private var*/ #_description_txf /*:TextField*/ = new TextField();

	/*public function*/ constructor(){
        super();
        /*inherit prop*/ this.text                    = this.className;
        /*inherit prop*/ this.width                   = 1280;
        /*inherit prop*/ this.height                  = 1024;
        /*inherit prop*/ this.formStartPosition       = "CenterWidth";
        /*inherit prop*/ this.icon                    = library.jsc_svg.path;
        /*inherit prop*/ this.background              = "#1b2432";//"#212c3d";Marron
		/*inherit meth*/ this.getFromForm('headerBar').background = "#1b2432";
        this.#_description_txf.defaultTextFormat      = new TextFormat('Arial', 13, '#aebad0');
        this.#_description_txf.wordWrap               = true;
		this.#_description_txf.multiline              = true;
		this.#_description_txf.scrollsHidden          = false;              
		this.#_description_txf.horizontalScrollPolicy = 'off';                
		this.#_description_txf.verticalScrollPolicy   = 'auto';
        this.#_description_txf.move(5,5);
        this.#_description_txf.setSize(this.width-10, this.height-50);
        this.addControl(this.#_description_txf); 
	}

    /*public function*/ set buffer(buffer/*:Array*/)/*:void*/{
        this.#_description_txf.htmlText = SamplesUtils.iterateBuffer(buffer);
    }
}
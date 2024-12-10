/*
GetLayout: Based on Free (MPL) {jAction Lib} && {jAction FrameWork}
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

GetLayout port from FormDesigner.as

Package:      jActionEditor/app/forms/windows/GetLayout 
Class:	      public class GetLayout
Inheritance:  GetLayout > Form > BaseForm > Sprite > DisplayObjectContainer > InteractiveObject > DisplayObject > EventDispatcher >  _Object
Version:
0.0.2 - Last update 2024-10-14 -> Revision
0.0.1 - Last update 2024-05-06 -> First version

This class allows you to not depend on the FormDesigner.as class or the Flash Animate CC editor to design the layouts of the forms

Therefore the objective of this class is to go through all the objects of the pseudo scenario in javascript and collect the 
properties of each object and store everything in a text buffer.

The resulting text can then be used to pass it to the formCreate property of the FormUtils class and this will be responsible 
for recreating the same layout again in any desired container.
*/
class GetLayout extends Form {

    /*private var*/ #_toolHand_btn /*:Button*/   = new Button(undefined,22,22);
    /*private var*/ #_text_txa     /*:TextArea*/ = new TextArea();
    /*private var*/ #_owner        /*:Form*/     = null;
    /*private var*/ #_nullList     /*:Boolean*/  = false;

	/*public function*/ constructor(name=undefined){
		super(name);
        /*inherit prop*/ this.width        = 350;
        /*inherit prop*/ this.height       = 300;
        /*inherit prop*/ this.text         = 'GetLayout'; 
        /*inherit prop*/ this.draggableBox = true;
        /*inherit prop*/ this.headerHeight = 22;
        this.#_toolHand_btn.label          = 'Get';
        this.#_text_txa.textField.preventPaste = false;
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
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   PUBLIC METHODS  * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ GetLayout(params/*:Array*/=null)/*:void*/{
        this.#_owner           = params[0];
        this.addControl(this.#_text_txa);
        this.addControl(this.#_toolHand_btn);
        this.#_text_txa.width  = this.controls.width;
        this.#_text_txa.height = this.controls.height - this.#_toolHand_btn.height;
        this.#_toolHand_btn.y  = this.#_text_txa.height;
        this.#_toolHand_btn.addEventListener(MouseEvent.CLICK,this.#OnHandClick.bind(this));
        this.addEventListener(Event.ADDED_TO_STAGE, this.#OnAdded.bind(this));
    }

     /*
    *
    */
    /*public function*/ generateAuto(objectContainer/*:Object*/,nullList/*:Boolean*/=false,stageW/*:Number*/=-1,stageH/*:Number*/=-1)/*:String*/{
        this.#_nullList = nullList;
        return this.#Generate(null,objectContainer,stageW,stageH);
    }

    /*
    *
    */
    /*public function*/ generateMan(childrens/*:Array*/,nullList/*:Boolean*/=false)/*:String*/{
        this.#_nullList = nullList;
        return this.#Generate(childrens);
    }

    /**-----------------------------------------------------------------------------------------------------------------------------------
	 *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  PRIVATE METHODS  * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                   * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *
	 *----------------------------------------------------------------------------------------------------------------------------------*/
    /*
    *
    */
    /*private function*/ #OnHandClick(e/*:Event*/)/*:void*/{
       this.generateAuto(this.#_owner.simpleLayout.virtualStage);
    }
    
    /*
    *
    */
     /*private function*/ #OnResize(e/*:Event*/=null)/*:void*/   {
        this.#_text_txa.width = stage.stageWidth;
        this.#_text_txa.height =stage.stageHeight;
     }

    /*
    *
    */
     /*public function*/ #OnAdded(e/*:Event*/)/*:void*/{
        stage.scaleMode = StageScaleMode.NO_SCALE;
        stage.align     = StageAlign.TOP_LEFT;
        stage.removeEventListener(Event.ADDED_TO_STAGE, this.#OnAdded);
        stage.addEventListener(Event.RESIZE, this.#OnResize);
        this.#OnResize();
    }

   

    /*
    * Need backtick if have new lines?
    */
    /*private function*/ #BackTick(str/*:String*/)/*:String*/ {
        str = this.#Trim(str);
        const matches /*:Array|null*/ = str.match(/\r/g);//No match returns null, otherwise returns an array
        return matches ? '"'+str.replace(/\r/g, '\\n')+'"' : '"'+str+'"';
    }

    
    
    /*private function*/ #Trim(str/*:String*/)/*:String*/ {
        return str.replace(/^\s+|\s+$/g, "");
    }

    /*private function*/ #IsHtmlText(str/*:String*/)/*:String*/ {
        const tempTextField/*:TextField*/ = new TextField();
        tempTextField.htmlText = str;
        return tempTextField.text == str ? '"'+str+'"' : "'"+str+"'";
    }
    

    /*private function*/ #Generate(childrens/*:Array<DisplayObject>*/=null,objectContainer/*:Object*/=null)/*:String*/{
        if(this.#_text_txa.text==''){
            this.#_text_txa.text = G.FU.getLayout(objectContainer,childrens);
        }else{
            this.#_text_txa.text = this.#_text_txa.text +'],['+ G_FU.getLayout(objectContainer,childrens);
        }
    }
}
/*
				[["stage_stg","",0,0,594,353,-1],["_apa_lbl","Apariencia: ( Formatos admitidos .jpg, .png )",11,11,244,22,-1,{"f":"Arial","s":11,"c":"#009900"},0,1,0,1,0]]
				tf puede contener una cadena en blanco "" cuando las propiedades de font, size, bold y color son por defecto
				tf puede contener una cadena de objeto, {"f":"Arial","s":11,"c":"#009900"}
				tfm.color = tf.c === 'string' && color.startsWith('#') ? tf.c : '#'+Color.uintToHex(tf.c);


                [["stage_stg","",0,0,594,353,-1],["_apa_lbl","Apariencia: ( Formatos admitidos .jpg, .png )",11,11,244,22,-1,{"f":"Arial","s":11,"c":"#009900"},0,1,0,1,0],["_avt_mvc","",11,55,66,66,-1,"",,0,0,1,0],["_lbl2_lbl","Avatar",11,33,100,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hed_mvc","",283,55,301,32,-1,"",,0,0,1,0],["_bdy_mvc","",11,165,331,177,-1,"",,0,0,1,0],["_lbl5_lbl","Imagen de cabecera",283,33,130,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_lbl6_lbl","Imagen central",11,143,125,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hedUpl_btn","Subir",283,99,80,22,3,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hedDel_btn","Borrar",385,99,78,22,4,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_bdyUpl_btn","Subir",352,165,66,22,6,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_avtUpl_btn","Subir",88,66,99,22,1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_avtDef_btn","Por defecto",88,99,100,22,2,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hedDef_btn","Por defecto",484,99,100,22,5,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_bdyDef_btn","Por defecto",489,165,95,22,11,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_lbl14_lbl","Color solido",377,231,72,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_colDes_txf","Si ha subido una imagen sin transparencias que ocupa todo el fondo, este color quedara oculto.",452,225,131,44,-1,{"f":"Arial","s":8,"c":"#666666"},0,1,0,1,0],["_bdyDel_btn","Borrar",421,165,66,22,7,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_txf17_txf","Imagenes a 3840x2160 (Puede relentizar la carga)",457,275,126,25,-1,{"f":"Arial","s":8,"c":"#666666"},0,1,0,1,0],["_tem_cmb",null,352,319,100,22,10,"",0,1,0,1,0],["_bdyPla_cmb",null,352,275,100,22,9,"",0,1,0,1,0],["_col_clp",null,352,231,22,22,10,"",0,1,0,1,0]]
				*/


//["stage_stg","",0,0,594,353,-1],["_apa_lbl","Apariencia: ( Formatos admitidos .jpg, .png )",11,11,244,22,-1,"",39168,1,0,1,0],["_avt_mvc","",11,55,66,66,-1,"",0,1,0,1,0],["_lbl2_lbl","Avatar",11,33,100,22,-1,"",0,1,0,1,0],["_hed_mvc","",283,55,301,32,-1,"",0,1,0,1,0],["_bdy_mvc","",11,165,331,177,-1,"",0,1,0,1,0],["_lbl5_lbl","Imagen de cabecera",283,33,130,22,-1,"",0,1,0,1,0],["_lbl6_lbl","Imagen central",11,143,125,22,-1,"",0,1,0,1,0],["_hedUpl_btn","Subir",283,99,80,22,3,"",0,1,0,1,0],["_hedDel_btn","Borrar",385,99,78,22,4,"",0,1,0,1,0],["_bdyUpl_btn","Subir",352,165,66,22,6,"",0,1,0,1,0],["_avtUpl_btn","Subir",88,66,99,22,1,"",0,1,0,1,0],["_avtDef_btn","Por defecto",88,99,100,22,2,"",0,1,0,1,0],["_hedDef_btn","Por defecto",484,99,100,22,5,"",0,1,0,1,0],["_bdyDef_btn","Por defecto",489,165,95,22,11,"",0,1,0,1,0],["_lbl14_lbl","Color solido",377,231,72,22,-1,"",0,1,0,1,0],["_colDes_txf","Si ha subido una imagen sin transparencias que ocupa todo el fondo, este color quedara oculto.",452,225,131,44,-1,{"s":8,"f":"Arial","c":6710886},0,1,0,1,0],["_bdyDel_btn","Borrar",421,165,66,22,7,"",0,1,0,1,0],["_txf17_txf","Imagenes a 3840x2160 (Puede relentizar la carga)",457,275,126,25,-1,{"s":8,"f":"Arial","c":6710886},0,1,0,1,0],["_tem_cmb",null,352,319,100,22,10,"",0,1,0,1,0],["_bdyPla_cmb",null,352,275,100,22,9,"",0,1,0,1,0],["_col_clp",null,352,231,22,22,10,"",0,1,0,1,0]]
//["stage_stg","",0,0,594,353,-1],["_apa_lbl","Apariencia: ( Formatos admitidos .jpg, .png )",11,11,244,22,-1,{"f":"Arial","s":11,"c":"#009900"},0,1,0,1,0],["_avt_mvc","",11,55,66,66,-1,"",,0,0,1,0],["_lbl2_lbl","Avatar",11,33,100,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hed_mvc","",283,55,301,32,-1,"",,0,0,1,0],["_bdy_mvc","",11,165,331,177,-1,"",,0,0,1,0],["_lbl5_lbl","Imagen de cabecera",283,33,130,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_lbl6_lbl","Imagen central",11,143,125,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hedUpl_btn","Subir",283,99,80,22,3,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hedDel_btn","Borrar",385,99,78,22,4,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_bdyUpl_btn","Subir",352,165,66,22,6,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_avtUpl_btn","Subir",88,66,99,22,1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_avtDef_btn","Por defecto",88,99,100,22,2,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_hedDef_btn","Por defecto",484,99,100,22,5,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_bdyDef_btn","Por defecto",489,165,95,22,11,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_lbl14_lbl","Color solido",377,231,72,22,-1,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_colDes_txf","Si ha subido una imagen sin transparencias que ocupa todo el fondo, este color quedara oculto.",452,225,131,44,-1,{"f":"Arial","s":8,"c":"#666666"},0,1,0,1,0],["_bdyDel_btn","Borrar",421,165,66,22,7,{"f":"Arial","s":11,"c":"#ffffff"},0,1,0,1,0],["_txf17_txf","Imagenes a 3840x2160 (Puede relentizar la carga)",457,275,126,25,-1,{"f":"Arial","s":8,"c":"#666666"},0,1,0,1,0],["_tem_cmb",null,352,319,100,22,10,"",0,1,0,1,0],["_bdyPla_cmb",null,352,275,100,22,9,"",0,1,0,1,0],["_col_clp",null,352,231,22,22,10,"",0,1,0,1,0]
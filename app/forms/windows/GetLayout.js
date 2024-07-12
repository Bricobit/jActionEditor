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
	}

	/*public function*/ GetLayout(params/*:Array*/=null)/*:void*/{
        this.#_owner           = params[0];
        this.addControl(this.#_text_txa);
        this.addControl(this.#_toolHand_btn);
        this.#_text_txa.width  = this.controls.width;
        this.#_text_txa.height = this.controls.height - this.#_toolHand_btn.height;
        this.#_toolHand_btn.y  = this.#_text_txa.height;
        this.#_toolHand_btn.addEventListener(MouseEvent.CLICK,this.#OnHandClick.bind(this));
        this.addEventListener(Event.ADDED_TO_STAGE, this.ON_ADDED.bind(this));
    }

    /*private function*/ #OnHandClick(e/*:Event*/)/*:void*/{
       this.generateAuto(this.#_owner.stageEditor.stageCanvas);
    }
    

    /*
    *
    */
     /*private function*/ onResize(e/*:Event*/=null)/*:void*/   {
        this.#_text_txa.width = stage.stageWidth;
        this.#_text_txa.height =stage.stageHeight;
     }
    /*
    *
    */
     /*public function*/ ON_ADDED(e/*:Event*/)/*:void*/{
        stage.scaleMode = StageScaleMode.NO_SCALE;
        stage.align     = StageAlign.TOP_LEFT;
        stage.removeEventListener(Event.ADDED_TO_STAGE, this.ON_ADDED);
        stage.addEventListener(Event.RESIZE, this.onResize);
        this.onResize();
    }
    /*
    *
    */
    /*public function*/ generateAuto(objectContainer/*:Object*/,nullList/*:Boolean*/=false,stageW/*:Number*/=-1,stageH/*:Number*/=-1)/*:String*/{
        this.#_nullList = nullList;
        return this.generate(null,objectContainer,stageW,stageH);
    }
    /*
    *
    */
    /*public function*/ generateMan(c/*:Array*/,nullList/*:Boolean*/=false)/*:String*/{
        this.#_nullList = nullList;
        return this.generate(c);
    }
    /*
    * Need backtick if have new lines?
    */
    /*private function*/ backTick(str/*:String*/)/*:String*/ {
        str = this.trim(str);
        if((str.match(/\r/g).length)>0){
            //return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
            return '"'+str.replace(/\r/g, '\\n')+'"';
            //return "`"+str+"`";
        }else{
            return '"'+str+'"';
        }
    }

/*public function*/ isHtmlText(str/*:String*/)/*:String*/ {
    let tempTextField/*:TextField*/ = new TextField();
    tempTextField.htmlText = str;
    if(tempTextField.text == str){
        return '"'+str+'"';
    }else{
        return "'"+str+"'";
    }
}
    
    /*private function*/ trim(str/*:String*/)/*:String*/ {
        return str.replace(/^\s+|\s+$/g, "");
    }

    /*private function*/ generate(c/*:Array*/=null,objectContainer/*:Object*/=null,stageW/*:Number*/=-1,stageH/*:Number*/=-1)/*:String*/{
        //Si el array llega bacio recorremos todos los objetos DisplayObject del objeto objectContainer pasado por parametro
        if(c==null){
            c = new Array();
            for( var i/*:int*/ = objectContainer.numChildren - 1; i>=0; i-- ) {
                
                //trace('getQualifiedClassName: '+getQualifiedClassName(c[n])+' getQualifiedSuperclassName: '+ getQualifiedSuperclassName(c[n]) +' typeof: '+typeof(c[n]));

                
                var obj/*:Object*/      = objectContainer.getChildAt(i);
                var instance/*:String*/ = obj.name.substr(0,8); //Cuando un componente no tiene nombre se asigna como nombre "instance_1"
                var __id/*:String*/     = instance.substr(0,4);
                //var qscn:String     =    getQualifiedSuperclassName(obj);
                //trace(getQualifiedSuperclassName(obj));
                //trace(obj);
                if(instance =="instance" || __id =="__id"){
                    if(obj=="[object NumericStepper]" ||
                    obj=="[object Image]" ||
                    obj=="[object Sprite]" ||
                    obj=="[object TextInput]" ||
                    obj=="[object TextField]"||
                    obj=="[object TextArea"||
                    obj=="[object TextAreaHtml"||
                    obj=="[object Label]"||
                    obj=="[object Button]"||
                    obj=="[object RadioButton]"||
                    obj=="[object CheckBox]"||
                    obj=="[object SimpleButton]"||
                    obj=="[object MovieClip]"||
                    obj=="[object List]"||
                    obj=="[object Slider]"||
                    obj=="[object DataGrid]"||
                    obj=="[object ColorPicker]"||
                    obj=="[object DatePicker]"||
                    obj=="[object TimePicker]"||
                    obj=="[object ProgressBar]"||
                     getQualifiedSuperclassName(obj)=="flash.display::MovieClip"
                    ){
                    instance=''; //dejamos pasar el componente con nombre instanciaxx
                    __id='';
                    }
                    
                }
                    
                if( obj instanceof DisplayObject && obj.name !="" && instance !="instance" && __id !="__id") {
                
                    c.push(obj);
                }
                
                
            }
        }
        
        
        
        c.reverse();//Invertimos el array para que al ser añadidos desde javascript se añadan en orden de apilamiento, el ultimo es el primero.
        //Manual, Need c array objects
        var release/*:Array*/ = new Array(); 
        var f/*:Array*/ = new Array();
        /*
        It doesn't return the correct size in certain situations (I don't know why but it seems to happen when the stage has specific lower dimensions)
        Added as parameters stageW and stageH to assign the stage size manually and fixed to avoid the issue when it arises
        */
        if(objectContainer=="[object MainTimeline]"){
            f.push('["stage_stg","",0,0,'+(stageW == -1 ? stage.stageWidth:stageW)+','+(stageH == -1 ? stage.stageHeight:stageH)+',-1]');		
        }else{
            f.push('["stage_stg","",0,0,'+(stageW == -1 ? objectContainer.width:stageW)+','+(stageH == -1 ? objectContainer.height:stageH)+',-1]');		
        }
            
        for(var n/*:int*/=0; n<c.length;n++){
            var nom/*:String*/ = c[n].name;
            var instance2/*:String*/ = nom.substr(0,8);
            var __id2/*:String*/     = instance2.substr(0,4);
            
            var value/*:**/;
            var ext/*:String*/ = '';
            
                  if(c[n]=="[object NumericStepper]"){value = c[n].value;            ext = '_nms';
            }else if(c[n]=="[object Image]"         ){value = "null";                ext = '_img'; 
            }else if(c[n]=="[object Sprite]"        ){value = '""';                  ext = '_spt';
            }else if(c[n]=="[object TextInput]"     ){value = this.isHtmlText(c[n].text);     ext = '_txi';  
            }else if(c[n]=="[object TextField]"     ){value = this.backTick(c[n].text);   ext = '_txf';
            }else if(c[n]=="[object TextArea]"      ){value = this.backTick(c[n].text);   ext = '_txa';
            }else if(c[n]=="[object TextAreaHtml]"  ){value = this.backTick(c[n].t.text); ext = '_txh';
            }else if(c[n]=="[object HtmlEditor]"    ){value = "null";                ext = '_hed';
            }else if(c[n]=="[object Label]"         ){value = '"'+c[n].text+'"';     ext = '_lbl';
            }else if(c[n]=="[object Button]"        ){value = '"'+c[n].label+'"';    ext = '_btn';
            }else if(c[n]=="[object RadioButton]"   ){value = '"'+c[n].label+'"';    ext = '_rdb';
            }else if(c[n]=="[object CheckBox]"      ){value = '"'+c[n].label+'"';    ext = '_chk';
            }else if(c[n]=="[object SimpleButton]"  ){value = '""';                  ext = '_sbt';            
            }else if(c[n]=="[object MovieClip]"     ){value = '""';                  ext = '_mvc';      
            }else if(c[n]=="[object List]"          ){value = '""';                  ext = '_lst'; 
            }else if(c[n]=="[object Slider]"        ){value = '""';                  ext = '_sld';    
            }else if(c[n]=="[object DataGrid]"      ){value = "null";                ext = '_dtg'; 
            }else if(c[n]=="[object ColorPicker]"   ){value = "null";                ext = '_clp'; 
            }else if(c[n]=="[object DatePicker]"    ){value = "null";                ext = '_dtp'; 
            }else if(c[n]=="[object TimePicker]"    ){value = "null";                ext = '_tmp'; 
            }else if(c[n]=="[object ProgressBar]"   ){value = '""';                  ext = '_pgb';       
            }else if(c[n]=="[object ComboBox]"      ){value = "null";                ext = '_cmb';
            }else{
                value = '""';
                ext = '_mvc'; 
            }   
            
            if(instance2=='instance' || __id2=='__id'){
                
                nom = ext+n+ext;
                
            }else{
                    var haveExt/*:String*/  = nom.slice(nom.lastIndexOf("_"));
                    if(ext!==haveExt){
                        if(nom =='_new'){
                            nom = nom+ext;
                        }else{
                            nom = '_'+nom+ext;
                        }
                        
                    }else{
                        if(nom !=='_new'){
                            nom = '_'+nom;
                        }
                    }
            }
            //redondeamos al numero mas cercano y aseguramos que sea divisble entre 2 para evitar problemas de borrosidad con translate3d en EDGE y CHROME
            //Se ha arreglado directamente en el metodo trans de DisplayObject
            // var _x:Number = Math.round(c[n].x/2)*2;
            // var _y:Number = Math.round(c[n].y/2)*2;
            // var _w:Number = Math.round(c[n].width/2)*2;
            // var _h:Number = Math.round(c[n].height/2)*2;

            //CAMBIO DE IDE APLICAR SOLO A LSO CAMPOS DE TEXTO EN LA PROPIEDAD X DE LA CLASE tEXTFIELD RECUERDALO

            var _x/*:Number*/ = Math.floor(c[n].x);
            var _y/*:Number*/ = Math.floor(c[n].y);
            var _w/*:Number*/ = Math.floor(c[n].width);
            var _h/*:Number*/ = Math.floor(c[n].height);
            var _t/*:Number*/ = c[n].tabIndex;//tabIndex
            var _e/*:int*/    = 1;
            var _s/*:int*/    = 0;
            var _v/*:int*/    = int(c[n].visible);
            var _r/*:Number*/    = c[n].rotation;
                        
            if(c[n] != "[object TextField]"){
                //trace('c[n]: '+c[n]+' getQualifiedClassName: '+getQualifiedClassName(c[n])+' getQualifiedSuperclassName: '+ getQualifiedSuperclassName(c[n]) +' typeof: '+typeof(c[n]));
                _e = int(c[n].enabled);//enabled
            }
            if(c[n] == "[object CheckBox]"){
                _s = int(c[n].selected);//selected
            }
            var  myTextFormat/*:TextFormat*/;
            var tfo/*:Object*/ = new Object();
            var _c/*:uint*/ = 0;
            //SimpleButton y MovieClip no tienen el metodo getStyle y intentamos acceder dara error
            //trace('Class(getDefinitionByName(getQualifiedClassName(c[n]))): '+Class(getDefinitionByName(getQualifiedClassName(c[n]))));
            //trace('getQualifiedClassName(c[n]): '+getQualifiedClassName(c[n]));
            //trace(c[n] is MovieClip);
            
            if(c[n] == "[object SimpleButton]" || c[n] == "[object MovieClip]" || c[n] instanceof MovieClip || c[n] == "[object Sprite]" || c[n] instanceof Sprite){
                tfo = null;
                //_c =c[n].transform.colorTransform.color;
                _c =c[n].backgroundColor;						
            }else{
                //El acceso al formato de TextField es diferente
                if(c[n] instanceof TextField){
                //if(c[n] == "[object TextField]"){
                    //tfo.f = c[n].defaultTextFormat.font.split("_")[0];
                    tfo.f = c[n].defaultTextFormat.font;
                    tfo.s = c[n].defaultTextFormat.size;
                    tfo.c = c[n].defaultTextFormat.color;
                    if(c[n].defaultTextFormat.bold){tfo.b = c[n].defaultTextFormat.bold;}
                }else{
                    trace(c[n].name);
                    //Para el resto de objetos recuperamos el textFormat con getStyle, si el resultado es null aplicamos null
                    if(c[n].getStyle("textFormat") !== null ){
                        myTextFormat = c[n].getStyle("textFormat");
                        tfo.f = myTextFormat.font;
                        tfo.s = myTextFormat.size;
                        tfo.c = myTextFormat.color;
                        if(myTextFormat.bold){tfo.b = myTextFormat.bold;}
                        
                    }else if(c[n] == "[object Label]"){
                        // tfo.f = "Arial";
                        // tfo.s = 11;
                        if(c[n] == "[object Label]" && c[n].transform.colorTransform.color !==0){
                            tfo.c =c[n].transform.colorTransform.color;
                        }else{
                            tfo = null;	
                        }
                    }else{
                        tfo = null;
                    }
                }
            }				
            /*
            Otros posibles formatos que podemos implementar autoamticamente al crear el formulario en javascript
            myTextFormat.bold = true;
            myTextFormat.italic = true;
            myTextFormat.underline = true;
            */
            var _f/*:String*/ = "";
            if(tfo==null){
                _f = JSON.stringify('');//textFormat
            }else{
                    if(tfo.f =='Arial' && tfo.s == 11 && tfo.c == undefined && tfo.b == undefined){
                    _f = JSON.stringify('');
                    //_f = "''";
                }else{
                    //_f = "'"+JSON.stringify(tfo)+"'";//textFormat
                    _f = JSON.stringify(tfo);//textFormat
                }
            }
            
            f.push('["'+nom+'",'+value+','+_x+','+_y+','+_w+','+_h+','+_t+','+_f+','+_c+','+_e+','+_s+','+_v+','+_r+']');
            release.push('this.'+nom+'=null;');
        }
        if(this.#_nullList){
            this.#_text_txa.text = f.join(",") +" "+release.join(" ");
        }else{
            if(this.#_text_txa.text==''){
                this.#_text_txa.text = f.join(",");
            }else{
                this.#_text_txa.text = this.#_text_txa.text +'],['+ f.join(",");
            }
            
        }
        //return f.join(",");
        return '';
    }





}
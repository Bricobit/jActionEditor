/*			      
{jAction} Library - http://www.jaction.org - Copyright © 2018/20.. Javier Vicente Medina All Rights Reserved.
Based on ActionScript® 3.0 Reference for the Adobe® Flash® Platform && (ECMAScript)
ecma-international.org - W3Schools.com - developer.mozilla.org

Author: Javier Vicente Medina - giskard2010@hotmail.com - http://jvm.bricobit.com
May contain mixed comments in English and Spanish, sorry.

@license
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

For production it is recommended to compress and minify this class to remove all comments with uglify-en       
                                                        
Package:	 jaction.skins
Class:	     public class JActionChrome
Inheritance: None
LocalVarId:  ?	 
Version:     0.1.6 - Last Update 11/02/2021
*/
class JActionChrome {

	constructor(){

	}

	/*private*/ static /*function*/ #Object(alpha,border,borderRadius,boxShadow,backgroundImage,backgroundColor,backgroundPosition=null,backgroundSize=null,backgroundRepeat=null)/*:Object*/{
			return {
				alpha,
				border,
				borderRadius,
				boxShadow,
				backgroundImage,  
				backgroundColor,
				backgroundPosition,
				backgroundSize,
				backgroundRepeat
			};
	}

	/**
	 * variantColor="blue", "green", "red", "orange", "gray"
	 */
	static getStyleDefinition(jaction_path/*:String*/,variantColor="")/*:Object*/{
		//Slider
		const sldThumbUp       /*:String*/ = jaction_path+"/ja-lib-resource/Slider/thumb_up.svg";
		const sldThumbOver     /*:String*/ = jaction_path+"/ja-lib-resource/Slider/thumb_over.svg";
		const sldThumbDown     /*:String*/ = jaction_path+"/ja-lib-resource/Slider/thumb_down.svg";
		const sldThumbDisabled /*:String*/ = jaction_path+"/ja-lib-resource/Slider/thumb_disabled.svg";
		//Fonts
		const ffDescriptors    /*:Object*/ = { style: 'normal', weight:'normal', unicodeRange: 'U+000-5FF'};
		const fntUrl           /*:String*/ = "url('"+jaction_path+"/ja-lib-resource/fonts/";


		let eP  /*:int*/    = 1; //EmphasisRectPadding   - Grosor del relleno que separa los límites externos del componente de los bordes externos del indicador de emphasis, expresado en píxeles.
		let eS  /*:int*/    = 1; //EmphasisRectSize      - Grosor del borde externo indicador de emphasis, expresado en píxeles.
		let fP  /*:int*/    = 1; //FocusRectPadding      - Grosor del relleno que separa los límites externos del componente de los bordes externos del indicador de foco/seleccion, expresado en píxeles.
		let fS  /*:int*/    = 1; //FocusRectSize         - Grosor del borde externo indicador de foco/seleccion, expresado en píxeles.
		let csi /*:String*/ = "/ja-lib-resource/checkBoxSelected.svg";
	    let rsi /*:String*/ = "/ja-lib-resource/radioButtonSelected.svg";

		//variantColor "blue" default
		let a  /*:Array*/ = ['#0d92f2',//0   backgroundImage: linear-gradient color Start for BBL_UP State  
							 '#0086e5',//1   backgroundImage: linear-gradient color Stop  for BBL_UP State   
							 '#0086E5',//2   backgroundColor       for BBL_UP State                                                                  - Substitute color if gradient color does not work
							 '#1298f8',//3   GradientColorStart    for OVER && UP_TOGGLE_UNSELECTED && OVER_TOGGLE_UNSELECTED   
							 '#0086e5',//4   GradientColorStop     for OVER && UP_TOGGLE_UNSELECTED && OVER_TOGGLE_UNSELECTED 
							 '#008af0',//5   SubColor              for OVER && UP_TOGGLE_UNSELECTED && OVER_TOGGLE_UNSELECTED && OVER_FLAT  - Substitute color if gradient color does not work
							 '#82c8fb',//6   GradientColorStart    for DOWN_TOGGLE
							 '#2fa7ff',//7   GradientColorStop     for DOWN_TOGGLE
							 '#82c8fb',//8   SubColor              for DOWN_TOGGLE && DOWN_FLAT                                             - Substitute color if gradient color does not work
							 '#0080dd',//9   DisabledSubColor      foR DISABLED && DISABLED_FLAT                                            - Not use gradient for disabled state
							 '#1270B2',//10  BorderColor           for all states excepts for OVER_UNSELECTED && OVER_SELECTED
							 '#FFFFFF',//11  FontBaseColor
							 '#00ADF3',//12  EmphasisColor
							 '#00ADF3',//13  FocusColor
							 '#0975bd',//14  GradientColorStart for DOWN && UP_TOGGLE_SELECTED && OVER_TOGGLE_SELECTED
							 '#005097',//15  GradientColorStop  for DOWN && UP_TOGGLE_SELECTED && OVER_TOGGLE_SELECTED
							 '#005097' //16  SubColor           for DOWN && UP_TOGGLE_SELECTED && OVER_TOGGLE_SELECTED            -  Substitute color if gradient color does not work
									];                                                                                                                                                                                  //blue   => sailboat default
									       //   0         1         2         3          4         5         6         7         8         9        10        11        12        13       14         15        16       Add more colors if you want     
		      if(variantColor=="red"   ){a=['#da2525','#c72222','#c72222','#de3d3d','#c82222','#cf2323','#cf2323','#c72222','#be2020','#cc2323','#9c1b1b','#FFFFFF','#00ADF3','#00ADF3','#cf2323','#c72222','#be2020'];  //red    => candy
		}else if(variantColor=="green" ){a=['#5aa264','#52945b','#52945b','#60a769','#53955c','#569a5f','#569a5f','#569a5f','#4f8e57','#55985e','#488150','#FFFFFF','#00ADF3','#00ADF3','#569a5f','#569a5f','#4f8e57'];  //green  => kelly
		}else if(variantColor=="orange"){a=['#d37934','#c56d2b','#c56d2b','#d78548','#c76f2c','#cd722d','#cd722d','#bd692a','#bd692a','#ca712d','#ac6026','#FFFFFF','#00ADF3','#00ADF3','#cd722d','#bd692a','#bd692a'];  //orange => terra cotta
		}else if(variantColor=="gray"  ){a=['#ececec','#d7d7d7','#d7d7d7','#f7f7f7','#d7d7d7','#dedede','#e2e2e2','#cdcdcd','#cdcdcd','#e2e2e2','#c0c0c0','#000000','#00ADF3','#00ADF3','#e2e2e2','#cdcdcd','#cdcdcd'];  //gray   => mist
		                                 csi = "/resource/checkBoxSelectedB.svg";rsi = "/resource/radioButtonSelectedB.svg";}   
										 
										 let uppeBackgroundImage   = 'linear-gradient(rgb(41, 56, 77) 15%, rgb(25, 34, 48) 76%)';
										 let overBackgroundImage = 'linear-gradient(rgb(55, 75, 103) 15%, rgb(36, 49, 69) 76%)';
										 let downBackgroundImage = 'linear-gradient(rgb(28, 38, 54) 15%, rgb(29, 40, 56) 76%)';

										 let boxShadowAll   = 'rgba(255, 255, 255, 0.3) 0px 0.4px 0.7px 0px, rgba(218, 224, 233, 0.3) 0.1px 0.1px 0.7px 0px inset';
										 let borderAll = '1.4px solid #000';
										 let borderRadiusAll = '0px';
		                                   
		return {
			// //Styles for normal mode
			// UP                     : {alpha:1,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:"inset 0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[0]+','+a[1]+')',  backgroundColor:a[2],background:null},			
			// OVER                   : {alpha:1,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:"inset 0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[3]+','+a[4]+')',  backgroundColor:a[5],background:null},
			// DOWN                   : {alpha:1,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:      "0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[15]+','+a[14]+')',backgroundColor:a[16],background:null},
			// //Styles for toggle mode
			// UP_TOGGLE_SELECTED     : {alpha:1,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:      "0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[15]+','+a[14]+')',backgroundColor:a[16],background:null},
			// UP_TOGGLE_UNSELECTED   : {alpha:1,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:"inset 0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[3]+','+a[4]+')',  backgroundColor:a[5], background:null},
			// OVER_TOGGLE_UNSELECTED : {alpha:1,border:'solid 1px '+a[8], borderRadius:"3px",boxShadow:"inset 0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[3]+','+a[4]+')',  backgroundColor:a[5],background:null},
			// OVER_TOGGLE_SELECTED   : {alpha:1,border:'solid 1px '+a[8], borderRadius:"3px",boxShadow:      "0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[15]+','+a[14]+')',backgroundColor:a[16],background:null},
			// DOWN_TOGGLE            : {alpha:1,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:"inset 0px 1px 0px rgba(255,255,255,0.15)",backgroundImage:'linear-gradient('+a[6]+','+a[7]+')',  backgroundColor:a[8],background:null},
			// //Common look style disabled for components
			// DISABLED               : {alpha:0.7,border:'solid 1px '+a[10],borderRadius:"3px",boxShadow:"none",backgroundImage:"none",backgroundColor:a[9],background:null},
		    // //Styles for flat mode	
			// UP_FLAT                : {alpha:1,border:'none',borderRadius:"3px",boxShadow:"none",backgroundImage:'none',backgroundColor:'none',background:'none'},
			// OVER_FLAT              : {alpha:1,border:'none',borderRadius:"3px",boxShadow:"none",backgroundImage:'none',backgroundColor:a[5],background:null},
			// DOWN_FLAT              : {alpha:1,border:'none',borderRadius:"3px",boxShadow:"none",backgroundImage:'none',backgroundColor:a[8],background:null},
			// DISABLED_FLAT          : {alpha:0.7,border:'none',borderRadius:"3px",boxShadow:"none",backgroundImage:"none",backgroundColor:a[9],background:null},
			//  //Common styles for components text  
			// TEXTFORMAT                : new TextFormat("Arial", 14, a[11], false, false, false, '', '', 'left', 0, 0, 0, null),
			// DISABLED_TEXTFORMAT       : new TextFormat("Arial", 14, a[11], false, false, false, '', '', 'left', 0, 0, 0, null),
			
			// EMPHASIS                  : { boxShadow: '0px 0px 0px '+eP+'px rgba(255,255,255,0.8) , 0px 0px 0px '+(eP+eS)+'px '+a[12]},
			// FOCUS                     : { boxShadow: '0px 0px 0px '+fP+'px rgba(255,255,255,0.8) , 0px 0px 0px '+(fP+fS)+'px '+a[13]},
			// //this is the style for when both emphasis and focus properties match as active at the same time
			// EMPHASISFOCUS             : { boxShadow: '0px 0px 0px '+eP+'px rgba(255,255,255,0.8) , 0px 0px 0px '+(eP+eS)+'px '+a[12]+', 0px 0px 0px '+(eP+eS+fP)+'px rgba(255,255,255,0.8), 0px 0px 0px '+(eP+eS+fP+fS)+'px '+a[13]},
			// CHECKBOX_SELECTED_ICON    : csi,
			// RADIOBUTTON_SELECTED_ICON : rsi,

               //up box-shadow for edge/chrome rgba(255, 255, 255, 0.4) 0px 1px 1px 0px, rgba(0, 0, 0, 0.3) 1px 1px 0px 1px inset

				//Load default fontFaces
				FONT_DEFAULT          : { fontFamily: 'Arial', size: '11px'},
				FONT_FACES_LOAD       : [{fontFamily: 'Arial'            , src:"local(Arial), "            +fntUrl+"arial-woff2/arial.woff2') format('woff2')"       , descriptors: ffDescriptors},
										 {fontFamily: 'Arial Bold'       , src:"local(Arial Bold), "       +fntUrl+"arial-woff2/arialbd.woff2') format('woff2')"     , descriptors: ffDescriptors},
										 {fontFamily: 'Arial Bold Italic', src:"local(Arial Bold Italic), "+fntUrl+"arial-woff2/arialbi.woff2') format('woff2')"     , descriptors: ffDescriptors},
										 {fontFamily: 'Arial Italic'     , src:"local(Arial Italic), "     +fntUrl+"arial-woff2/ariali.woff2') format('woff2')"      , descriptors: ffDescriptors},
										 {fontFamily: 'Password'         , src:                             fntUrl+"password-woff2/password.woff2') format('woff2')" , descriptors: {style:'normal',weight:'normal'}}
										 ],
				//LBL_UP                : {alpha:1,border:'none',borderRadius:'0px',boxShadow:'none',backgroundImage:'red',backgroundColor:'transparent',backgroundPosition:null,backgroundSize:null,backgroundRepeat:null},
				//Common BaseButton && LabelButton Styles https://front-end-tools.com/en/generatebutton/
				BBL_UP                : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,uppeBackgroundImage,'#273549'        ),
				BBL_OVER              : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,overBackgroundImage,'#2c3c54'        ),
				BBL_DOWN              : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,downBackgroundImage,'#cdcdcd'        ),
				BBL_DISABLED          : this.#Object(0.7,borderAll,borderRadiusAll,boxShadowAll,'none'             ,'rgb(28, 38, 54)'),		
				BBL_UP_SELECTED       : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,uppeBackgroundImage,'#273549'        ),
				BBL_OVER_SELECTED     : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,overBackgroundImage,'#2c3c54'        ),
				BBL_DOWN_SELECTED     : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,downBackgroundImage,'#cdcdcd'        ),
				BBL_DISABLED_SELECTED : this.#Object(0.7,borderAll,borderRadiusAll,boxShadowAll,'none'             ,'rgb(28, 38, 54)'),														

				//LabelButton flat mode Styles
				LBT_UP_FLAT           : this.#Object(1,  'none',"3px","none",'none','transparent'),
				LBT_OVER_FLAT         : this.#Object(1,  'none',"3px","none",'none','#dedede'    ),
				LBT_DOWN_FLAT         : this.#Object(1,  'none',"3px","none",'none','#cdcdcd'    ),
				LBT_DISABLED_FLAT     : this.#Object(0.7,'none',"3px","none","none",'#e2e2e2'    ),
				LBT_TEXT_PADDING      : 2, //Text padding the same for up, bottom, left and right. Button -> [icon+[padding + text + padding]]
				LBT_ICON_TEXT_SPACING : 0, //Button -> [spacing + icon + spacing + [padding + text + padding] + spacing]
				//UIComponent Styles
				//When UIComponent starts, the TEXT_FORMAT and DISABLED_TEXT_FORMAT objects are replaced by a real TextFormat class with the properties of said objects, that is, now they contain an object as
				//a value but later they will contain a class, this could be avoided by converting systemChrome into class and including it after the TextFormat class, or include the TextFormat class before it.
				//if changes properties of the textFormat you check and update UIComponent->f0ObjToTextFormat, TextFormat, TextField->#e1ObjToTextFormat->defaultTextFormat->
				TEXT_FORMAT           : {font:'Arial',size:11,color:'#e9eaed',bold:false,italic:false,underline:false,lineType:'underline',url:'',target:'_self',align:'left',leftMargin:5,rightMargin:0,indent:0,leading:'1.5'},
				DISABLED_TEXT_FORMAT  : {font:'Arial',size:11,color:'#bfbfbf',bold:false,italic:false,underline:false,lineType:'underline',url:'',target:'_self',align:'left',leftMargin:5,rightMargin:0,indent:0,leading:'1.5'},
				TEXT_PASSWORD         : 'Password',

				
				//Rectangles (remember rectangles are css shadows) More arg. for DropShadowFilter(distance:0, angle:0, color:'#000', alpha:.7, size:0,blur:0,inner:false,hideObject:false)
				//Not accept literal colors, only hex colors
				UIC_RECT             : {padding:{color:'#000000', alpha:0.7, size:2},rect:{color:'#00ADF3', alpha:0.7, size:2}}, //Blue   -> Rectangle displayed when an object that inherits from UIComponent gets focus via the tab key or when manually assigning focus to an object
				INT_RECT             : {padding:{color:'#000000', alpha:0.7, size:2},rect:{color:'#ff1a1a', alpha:0.7, size:2}}, //Red    -> Rectangle displayed when an object that inherits from InteractiveObject gets focus manually (mainly for debugging purposes) 
				BTN_RECT             : {padding:{color:'#000000', alpha:0.7, size:1},rect:{color:'#ffa805', alpha:0.7, size:1}}, //Orange -> Rectangle emphasizing/highlighting the object and appearing exclusively on Button objects or inheriting it when the emphasized property is true.
				//Button Style
				DISABLED_ALPHA        : 0.5,
				
				//CheckBox Style Image
				CHECKBOX_SELECTED_ICON    : "/ja-lib-resource/skins/JActionChromeAssets/checkBoxSelected.svg",
				CHK_UP                : this.#Object(1  ,borderAll, borderRadiusAll,boxShadowAll,uppeBackgroundImage,'#d7d7d7'),
				CHK_OVER              : this.#Object(1  ,borderAll, borderRadiusAll,boxShadowAll,overBackgroundImage,'#dedede'),
				CHK_DOWN              : this.#Object(1  ,borderAll, borderRadiusAll,boxShadowAll,'none'             ,'#1c2635'),
				CHK_DISABLED          : this.#Object(0.7,borderAll, borderRadiusAll,boxShadowAll,"none"             ,'#e2e2e2'),																																								    
				CHK_UP_SELECTED       : this.#Object(1  ,borderAll, borderRadiusAll,boxShadowAll,uppeBackgroundImage,'#dbdbdb'),
				CHK_OVER_SELECTED     : this.#Object(1  ,borderAll, borderRadiusAll,boxShadowAll,overBackgroundImage,'#dedede'),
				CHK_DOWN_SELECTED     : this.#Object(1  ,borderAll, borderRadiusAll,boxShadowAll,'none'             ,'#1c2635'),
				CHK_DISABLED_SELECTED : this.#Object(0.7,borderAll, borderRadiusAll,boxShadowAll,"none"             ,'#e2e2e2'),
				
				//RadioButton Style Image
				RDB_SELECTED_ICON : "/ja-lib-resource/skins/JActionChromeAssets/radioButtonSelected.svg",
				RDB_UP                : this.#Object(1  ,borderAll ,"50%",boxShadowAll,uppeBackgroundImage,'#d7d7d7'),
				RDB_OVER              : this.#Object(1  ,borderAll ,"50%",boxShadowAll,overBackgroundImage,'#dedede'),
				RDB_DOWN              : this.#Object(1  ,borderAll ,"50%",boxShadowAll,'none'             ,'#1c2635'),
				RDB_DISABLED          : this.#Object(0.7,borderAll ,"50%","none"      ,"none"             ,'#e2e2e2'),
				RDB_UP_SELECTED       : this.#Object(1  ,borderAll ,"50%",boxShadowAll,uppeBackgroundImage,'#cdcdcd'),
				RDB_OVER_SELECTED     : this.#Object(1  ,borderAll ,"50%",boxShadowAll,overBackgroundImage,'#cdcdcd'),
				RDB_DOWN_SELECTED     : this.#Object(1  ,borderAll ,"50%",boxShadowAll,'none'             ,'#1c2635'),
				RDB_DISABLED_SELECTED : this.#Object(0.7,borderAll ,"50%","none"      ,"none"             ,'#e2e2e2'),
				//ProgressBar Styles
				PGB_INDETERMINATE_IMAGE : "/ja-lib-resource/indeterminateTrack.svg",
				PGB_BAR                 : this.#Object(0.8,'1px solid #9c9fa0',borderRadiusAll,'0px 0px 0px 0px #9c9fa0','linear-gradient(#fdfdfd,#f9f9f9)', '#fbfbfb'),
				PGB_TRACK               : this.#Object(1  ,'1px solid #009cfe',borderRadiusAll,'0px 0px 0px 0px #009cfe','linear-gradient(#d5eefe,#ccebfe)', '#d1edfe'),
				PGB_INDETERMINATE       : this.#Object(1  ,'1px solid #009cfe',borderRadiusAll,'0px 0px 0px 0px #009cfe','none'                            , '#d1edfe'),
				PGB_PADDING             : 0,
				//TextArea Styles
				//Attention!! Do not use border for this component, it causes inconsistencies in the scroll values, use boxShadow as border instead
				//reset {alpha:1,outline:'none',border:'none',borderRadius:borderRadiusAll,boxShadow:'none',backgroundImage:'none',backgroundColor:'transparent',backgroundPosition:null,backgroundSize:null,backgroundRepeat:null});
				TXA_UP                  : this.#Object(1  ,'none',borderRadiusAll,'rgba(255, 255, 255, 0.5) 0px 0.1px 1px 0px, rgb(0, 0, 0) 0px 0px 0px 1px inset','none', '#32425c'),
				TXA_DISABLED            : this.#Object(0.7,'none',borderRadiusAll,'rgba(255, 255, 255, 0.5) 0px 0.1px 1px 0px, rgb(0, 0, 0) 0px 0px 0px 1px inset',"none", '#e2e2e2'),
				TXA_PADDING             : 3,
				TXA_EMBED_FONTS         : "Not yet implemented",
				//TextInput Styles
				TXI_UP                  : this.#Object(1  ,'none',borderRadiusAll,'rgba(255, 255, 255, 0.5) 0px 0.1px 1px 0px, rgb(0, 0, 0) 0px 0px 0px 1px inset','none' ,'#32425c'),
				TXI_DISABLED            : this.#Object(0.7,'none',borderRadiusAll,'rgba(255, 255, 255, 0.5) 0px 0.1px 1px 0px, rgb(0, 0, 0) 0px 0px 0px 1px inset',"none" ,'#e2e2e2'),
				TXI_PADDING             : 3,
				TXI_EMBED_FONTS         : "Not yet implemented",
				//Scrollbar Style
				SCROLL_BAR_STYLE        : {scrollbarWidth:'auto'  ,scrollbarColor:'#cdcdcd #f0f0f0'},//scrollbarColor:'#4D5664 #212C3D' button track
				//Slider Styles
				SLD_THUMB_UP            : this.#Object(1  ,'none'             ,borderRadiusAll,"none",'url("'+sldThumbUp+'")'      ,'transparent',null,null, 'no-repeat'),
				SLD_THUMB_OVER          : this.#Object(1  ,'none'             ,borderRadiusAll,"none",'url("'+sldThumbOver+'")'    ,'transparent',null,null, 'no-repeat'),
				SLD_THUMB_DOWN          : this.#Object(1  ,'none'             ,borderRadiusAll,"none",'url("'+sldThumbDown+'")'    ,'transparent',null,null, 'no-repeat'),
				SLD_THUMB_DISABLED      : this.#Object(1  ,'none'             ,borderRadiusAll,"none",'url("'+sldThumbDisabled+'")','transparent',null,null, 'no-repeat'),
				SLD_TRACK               : this.#Object(1  ,'solid 1px #575E62',"2px"          ,"none",'none'                       ,'#EBEBEB'    ,null,null, null       ),
				SLD_TRACK_DISABLED      : this.#Object(0.8,'solid 1px #999999',"2px"          ,"none",'none'                       ,'#EBEBEB'    ,null,null, null       ),
				SLD_TICK                : {color:'#919999',size:1},
				//List Styles
				LST_CONTENT_PADDING           : 0,
				LST_UP                        : {outline:'solid 1px #5B5D5E',backgroundColor:'white'},
				/*
				CellRenderer styles
				CellRenderer is used in the List component, it extends from the LabelButton and has the states up, over, down, disabled, and the equivalents selected, allows adding icons.
				*/ 
				LST_CELL_UP                   : this.#Object(1  ,'solid 1px #5B5D5E',borderRadiusAll,"none",'none','#FFFFFF'),
				LST_CELL_OVER                 : this.#Object(1  ,'solid 1px #0075BF',borderRadiusAll,"none",'none','#DAF1FF'),
				LST_CELL_DOWN                 : this.#Object(1  ,'solid 1px #0075BF',borderRadiusAll,"none",'none','#9AD8FF'),
				LST_CELL_DISABLED             : this.#Object(0.7,'solid 1px #CECECF',borderRadiusAll,"none","none",'#FFFFFF'),
				LST_CELL_UP_SELECTED          : this.#Object(1  ,'solid 1px #B7BABC',borderRadiusAll,"none",'none','#9AD8FF'),
				LST_CELL_OVER_SELECTED        : this.#Object(1  ,'solid 1px #009DFF',borderRadiusAll,"none",'none','#EBF3F7'),
				LST_CELL_DOWN_SELECTED        : this.#Object(1  ,'solid 1px #009DFF',borderRadiusAll,"none",'none','#9AD8FF'),
				LST_CELL_DISABLED_SELECTED    : this.#Object(0.7,'solid 1px #EAEAEB',borderRadiusAll,"none","none",'#F9F9F9'),
				LST_CELL_TEXT_FORMAT          : {font:'Arial',size:'11',color:'#000000',bold:false,italic:false,underline:false,url:'',target:'',align:'left',leftMargin:0,rightMargin:0,indent:0,leading:null},
				LST_CELL_DISABLED_TEXT_FORMAT : {font:'Arial',size:'11',color:'#000000',bold:false,italic:false,underline:false,url:'',target:'',align:'left',leftMargin:0,rightMargin:0,indent:0,leading:null},
				LST_CELL_PADDING              : 3,
				
				//DataGrid Styles
				DTG_CONTENT_PADDING          : 0,
				DTG_UP                       : {outline:'solid 1.4px #000000',boxShadow:'rgba(255, 255, 255, 0.5) 0px 0.2px 2px 0.5px, rgba(255, 255, 255, 0.3) 0px 0px 1px 0px inset',backgroundColor:'#29374c'},
				//RowRenderer Styles
				//RowRenderer is used in the DataGrid component, it extends from the BaseButton and has the states up, over, down, disabled, and the equivalents selected, but without the possibility of adding an icon 
				DTG_ROW_UP                   : this.#Object(1  ,borderAll ,borderRadiusAll,"none",'none','#32425c'),
				DTG_ROW_OVER                 : this.#Object(1  ,borderAll ,borderRadiusAll,"none",'none','#506c95'),
				DTG_ROW_DOWN                 : this.#Object(1  ,borderAll ,borderRadiusAll,"none",'none','#1a222e'),
				DTG_ROW_DISABLED             : this.#Object(0.7,borderAll ,borderRadiusAll,"none","none",'#32425c'),
				DTG_ROW_UP_SELECTED          : this.#Object(1  ,borderAll ,borderRadiusAll,"none",'none','#232e3e'),
				DTG_ROW_OVER_SELECTED        : this.#Object(1  ,borderAll ,borderRadiusAll,"none",'none','#232e3e'),
				DTG_ROW_DOWN_SELECTED        : this.#Object(1  ,borderAll ,borderRadiusAll,"none",'none','#1a222e'),
				DTG_ROW_DISABLED_SELECTED    : this.#Object(0.7,borderAll ,borderRadiusAll,"none","none",'#F9F9F9'),
				DTG_ROW_TEXT_FORMAT          : {font:'Arial',size:'11',color:'#000000',bold:false,italic:false,underline:false,url:'',target:'',align:'left',leftMargin:0,rightMargin:0,indent:0,leading:null},
				DTG_ROW_DISABLED_TEXT_FORMAT : {font:'Arial',size:'11',color:'#000000',bold:false,italic:false,underline:false,url:'',target:'',align:'left',leftMargin:0,rightMargin:0,indent:0,leading:null},
				DTG_ROW_PADDING              : "3px",
				//DataGridCellEditor Styles
				/*DataGridCellEditor extends from TextInput and is added inside RowRenderer, note that styles for DataGridCellEditor have a transparent background to allow display of selected RowRenderer styles.
				This must be the case because when adding DataGridCellEditor instances inside RowRenderer instances, the DataGridCellEditor instances are above the RowRenderer background and if we add a background to the
				DataGridCellEditor instances then they would hide the RowRenderer background styles up, over, etc.*/
				DTG_CELL_UP                    : this.#Object(1  ,'none'  ,borderRadiusAll,'0px 0px 0px 1px black','none' ,'transparent'),
				DTG_CELL_DISABLED              : this.#Object(0.7,'none'  ,borderRadiusAll,"none"                 ,"none" ,'#e2e2e2'    ),
				DTG_CELL_PADDING               : 3,
				DTG_CELL_EMBED_FONTS           : "Not yet implemented",
				//DataGrid header sort icons 
				DTG_HEAD_SORT_ASC_ICON         : jaction_path+"/ja-lib-resource/DataGrid/headerSortArrowAscIcon.svg",
				DTG_HEAD_SORT_DESC_ICON        : jaction_path+"/ja-lib-resource/DataGrid/headerSortArrowDescIcon.svg",
				//HeaderRenderer buttons styles		
				DTG_HEAD_BTN_UP                : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,uppeBackgroundImage,'#d7d7d7'),
				DTG_HEAD_BTN_OVER              : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,overBackgroundImage,'#dedede'),
				DTG_HEAD_BTN_DOWN              : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,downBackgroundImage,'#cdcdcd'),
				DTG_HEAD_BTN_DISABLED          : this.#Object(0.7,borderAll,borderRadiusAll,boxShadowAll,"none"             ,'#e2e2e2'),																																								    
				DTG_HEAD_BTN_UP_SELECTED       : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,uppeBackgroundImage,'#cdcdcd'),
				DTG_HEAD_BTN_OVER_SELECTED     : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,overBackgroundImage,'#cdcdcd'),
				DTG_HEAD_BTN_DOWN_SELECTED     : this.#Object(1  ,borderAll,borderRadiusAll,boxShadowAll,downBackgroundImage,'#cdcdcd'),
				DTG_HEAD_BTN_DISABLED_SELECTED : this.#Object(0.7,borderAll,borderRadiusAll,"none"      ,"none"             ,'#e2e2e2'),
				//Columns line stretch style
				DTG_HEAD_LINE_STRETCH          : {style:'dotted',direction:'vertical',width:100,thickness:2,color:'#009DFF',blur:1,spacing:2,alpha:.8},
				/*
				SLD_TRACK_DISABLED Tipo: Class El aspecto de la pista en un componente Slider que está desactivado. El valor predeterminado es SliderTrack_disabledSkin.
				SLD_TRACK          Tipo: Class El aspecto de la pista en un componente Slider. El valor predeterminado es SliderTrack_skin.
				SLD_THUMB_DISABLED Tipo: Class El aspecto que se utiliza para indicar el estado desactivado del deslizador. El valor predeterminado es SliderThumb_disabledSkin.
				SLD_THUMB_DOWN	   Tipo: Class Nombre de la clase que se utiliza cómo aspecto para el deslizador de la barra de desplazamiento cuando se hace clic en el deslizador. El valor predeterminado es SliderThumb_downSkin.
				SLD_THUMB_OVER	   Tipo: Class Nombre de la clase que se utiliza cómo aspecto para el deslizador de la barra de desplazamiento cuando el puntero del ratón está sobre el deslizador. El valor predeterminado es SliderThumb_overSkin.
				SLD_THUMB_UP       Tipo: Class Nombre de la clase que se utiliza cómo aspecto para el deslizador de la barra de desplazamiento. El valor predeterminado es SliderThumb_upSkin.
				SLD_TICK	       Tipo: Class El aspecto de las marcas en un componente Slider. El valor predeterminado es SliderTick_skin.
				*/
				CMB_TXI_UP                    : this.#Object(1  ,'none',borderRadiusAll,'none','none', 'transparent'),
				CMB_TXI_DISABLED              : this.#Object(0.7,'none',borderRadiusAll,"none","none", '#e2e2e2'    ),
				
				//ColorPicker swatch button Styles (only the style is used for the up and disabled states, the same up style is used for up, over and down, styles for selected states are not used)
				CLP_UP                : this.#Object(1  ,'solid 2px #ffffff','1px',"inset 0px 1px 0px rgba(255,255,255,0.15)",'none','#000000'),
				CLP_DISABLED          : this.#Object(0.7,'solid 2px #a6a6a6','1px',"none"                                    ,"none",'#d6d6d6'),
				CLP_SWATCHES_UP       : this.#Object(1  ,'solid 1px #000000','0px',"none"                                    ,'none','#000000'),
				CLP_SWATCHES_OVER     : this.#Object(1  ,'solid 1px #ffffff','0px',"none"                                    ,'none','#000000'),
				CLP_SWATCHES_SELECTED : this.#Object(1  ,'solid 2px #ffffff','0px',"none"                                    ,'none','#000000'),

				//BigCalendar
				BGC_MORE_IMAGE : jaction_path+"/ja-lib-resource/BigCalendar/more.svg"
				// BGC_MORE_IMAGE :jaction_path+"/ja-lib-resource/DataGrid/headerSortArrowAscIcon.svg",
				//Pending add styles for BigCalendar
		}

		
	}
}
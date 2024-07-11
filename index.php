<?php
    session_set_cookie_params(['samesite' => 'None']);
    session_set_cookie_params(['secure' => true]);
    session_start();
    date_default_timezone_set('Europe/Madrid');
    session_start();
    $_permit = "false";
    $_usr = $_pwd = $_a  = $_g = $_e = $_v = $_c = $_act = $_p1 = $_timeRest = $_loginWait="";
    if(isset($_SESSION['permit']) && $_SESSION['permit']){
        //AutoLogin
        $_permit = "true";
        $_usr = $_SESSION['user'];
        $_pwd = $_SESSION['pass'];	
    }
	
	function getUrlParams(){
		global $_a, $_g, $_e, $_c, $_v, $_act, $_p1, $_permit, $_timeRest, $_loginWait, $_usr, $_pwd;
		return json_encode([
			'adm'         => $_a       , 'com'      => $_g,
			'sup'         => $_e       , 'scale'    => $_c,
			'formVerify'  => $_v       , 'action'   => $_act,
			'actionParams'=> $_p1      , 'session'  => $_permit,
			'timeRest'    => $_timeRest, 'loginWait'=> $_loginWait,
			'usr'         => $_usr    , 'pwd'      => $_pwd
		]);
	}
?>
<!-- 
Main11: Based on Free (MPL) {jAction Lib} && {jAction FrameWork} - www.jaction.org - Copyright © [2020]
Author: Javier Vicente Medina - giskard2010@hotmail.com

@license
jActionLib and jActionFramework is subject to the terms of the Mozilla private
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

You can freely use jActionLib and jActionFramework within MPL limitations.

Despite the examples and graphics on this site are under copyright, for more
information read the section about copyright at www.jaction.org

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<!DOCTYPE html><html><head>
<meta charset = "utf-8">
<link href    = "data:," rel = "icon"/>
<script src   = "libs/editor/ImportScripts.js"></script>
<script type  = "text/javascript">

	// /*global var*/ let G_ldrAnim             /*:LoaderAnimation*/ = null;
    // /*global var*/ let G_fLoader             /*:FormLoader*/      = null;
    // /*global var*/ let G_msgBox              /*:MsgBox*/          = null;
	// /*global var*/ let G_server              /*:ServerRPC*/       = null;
	// /*global var*/ let G_DatePicker          /*:DatePicker*/      = null;
	// /*global var*/ let G_TextFader           /*:TextFader*/       = null;
	// /*global var*/ let G_session             /*:String*/          = '';
	// /*global var*/ let G_SyntaxColor         /*:SyntaxColor*/     = null;
	// /*global var*/ let G_onStageAddedBind    /*:Function*/        = this.OnStageAdded.bind(this);
    // /*global var*/ let G_onFWInitializedBind /*:Function*/        = this.OnFrameworkInitialized.bind(this); 
	// /*global var*/ let G_Framework           /*:Framework*/       = new Framework();

	// stage.addEventListener(Event.ADDED,G_onStageAddedBind);

    // /*private*/ function OnStageAdded(e/*:Event*/)/*:void*/{
    //     stage.removeEventListener(Event.ADDED,G_onStageAddedBind);
    //     G_onStageAddedBind                     = null;
	// 	stage.backgroundColor                  = '#212c3d';
    //     //stage.scrollbarWidth                 = 'thin';
	// 	stage.scrollbarColor                   = '#4d5664 #212c3d';
	// 	stage.focusManager.tabOnlyFromFront    = true;
	// 	stage.focusManager.onFocusBringToFront = true;
    //     G_Framework.addEventListener(FrameworkEvent.INITIALIZED,G_onFWInitializedBind);
    //     G_Framework.initialize();
    // }

	// /*private*/ function OnFrameworkInitialized(e/*:Event*/)/*:void*/{
	// 	G_Framework.removeEventListener(FrameworkEvent.INITIALIZED,G_onFWInitializedBind);
    //     G_onFWInitializedBind     = null;    	 
	// 	G_fLoader                 = new FormLoader();
    //     G_ldrAnim                 = new LoaderAnimation();
	// 	G_msgBox                  = new MsgBox();
	// 	G_SyntaxColor             = new SyntaxColor();
	// 	G_DatePicker              = new DatePicker();
	// 	G_TextFader               = new TextFader();
	// 	G_FU                      = FormUtils; //Alias
	// 	G_msgBox.language         = 'en';
	// 	G_DatePicker.language     = 'en';
    //     G_fLoader.evalMode        = 'eval';
	// 	G_RootPath            	  = config.rootPath; //We get the path of the rootPath variable from the global config object.	The config object is fed with the data loaded from the config.json file
	// 	G_server              	  = new ServerRPC(G_RootPath+"jActionRPC/");//Then initialize the Server class by passing the server folder path as a parameter. Server class does not need to be added to DisplayList
	// 	G_checkInactivity     	  = new CheckInactivity(60000*15,10);//60000 = 1 MINUTO
	// 	G_checkInactivity.configAlert("Seguir","Salir","Por seguridad su sesión se cerrara en:","Alerta, cierre de sesión por inactividad");
	// 	G_checkInactivity.start();
		
	// 	library.addItem("jac_svg" , G_RootPath+"docs/resource/icons/jaction_logo.svg");
	// 	library.addItem("ja2_svg" , G_RootPath+"docs/resource/icons/jaction_head.svg",'',true,false,22,22);
	// 	library.addItem("sam_svg",  G_RootPath+"docs/resource/icons/samples.svg");
	// 	library.addItem("bep_wav",  G_RootPath+"docs/resource/sound/beep.wav");
	// 	library.addItem("edi_ico",  G_RootPath+"docs/resource/icons/edi.png");

	// 	const td34 /*:Array*/ = ["btn_svg", "pas_png", "chk_svg"    , "cof_svg", "clp_svg", "cmb_svg",
	// 						     "dtg_svg", "dtp_svg", "d26_svg"    , "don_svg", "eyd_svg", "eye_svg",
	// 						     "fol_svg", "jah_svg", ["jsc_svg",1], "lst_svg", "usr_png", "mor_svg",
	// 						     "nms_svg", "pgb_svg", "rdb_svg"    , "sld_svg", "txa_svg", "txi_svg",
	// 						     "tmp_svg", "wrp_svg", null         , null     , null     , null     ];
	// 	library.addTileSet( G_RootPath+"docs/resource/icons/TileSet34.png"   ,td34   ,34);
	// 	// library.addEventListener(LibraryEvent.LIBRARY_ITEMS_PROGRESS, onLibProgress.bind(this));
	// 	// library.addEventListener(LibraryEvent.LIBRARY_ITEMS_LOAD    , onLibLoad.bind(this));
	// 	library.addEventListener(LibraryEvent.LIBRARY_ITEMS_COMPLETE, onLibComplete.bind(this));
	// }

	// /*private*/ function onLibProgress(e/*:Event*/)/*:void*/{
	// 	trace('Loading item nº:'+e.itemsLoaded+' from a total of: '+e.itemsTotal);
	// }
	// /*private*/ function onLibLoad(e/*:Event*/)/*:void*/{
	// 	trace(e.itemInstance);
	// 	trace(e.itemFormat);
	// 	trace(e.itemExtension);
	// }
	// /*private*/ function onLibComplete(e/*:Event*/)/*:void*/{
    //     G_session              = "<?php echo $_permit;?>";
	// 	const user /*:String*/ = "<?php echo $_usr;?>";
	// 	const pass /*:String*/ = "<?php echo $_pwd;?>";

	// 	if(G_session=='true'){//AutoLogin If you are logged in and refresh the page then we log in again to recover the user data firstName and lastName
	// 		G_fLoader.load(stage, "forms/Login.js",onLoadForm.bind(this) ,onCloseForm.bind(this)   ,[user,pass]);
	// 	}else{//If you are not logged in then log in
	// 		G_fLoader.load(stage, "forms/Login.js",onLoadForm.bind(this) ,onCloseForm.bind(this));
	// 	}
	// }
    
    // /*private*/ function onLoadForm()/*:void*/{
	// 	/*
	// 	When loading the form we add LoaderAnimation and MsgBox again to place them
	// 	in the last stacking position, that is, above the form
	// 	*/ 
	// 	stage.addChild(G_ldrAnim);
	// 	stage.addChild(G_msgBox);
	// 	stage.addChild(G_DatePicker);
	// 	stage.addChild(G_TextFader);
	// }

	// /**
	//  * When closing the login form we open the example form to upload files
	//  */
	// /*private*/ function onCloseForm(params/*:Array*/=null)/*:void*/{
	// 	if(params[0]){//login true                                                      
	// 		G_fLoader.load(stage,"forms/InitForm.js",onLoadForm.bind(this),null,[params[1],params[2],params[3]]); //[id, username, surname]
	// 	}
	// }

	class Index {
 		
		 /*private var*/ #_BINDS /*:Object*/ = {};
	  
		 /*public function*/ constructor(urlParams /*:Object*/,version /*:String*/){
			 //Global Access Properties for the Entire Program
			 this.AppStart        /*:String*/          = null;
			 this.Framework       /*:Framework*/       = null;
			 this.LdrAnim         /*:LoaderAnimation*/ = null;
			 this.FLoader         /*:FormLoader*/      = null;
			 this.InitForm        /*:InitForm*/        = null;
			 this.Server          /*:ServerRPC*/       = null;
			 this.MsgBox          /*:MsgBox*/          = null;
			 this.CheckInactivity /*:CheckInactivity*/ = null; 
			 this.DatePicker      /*:DatePicker*/      = null;
			 this.TextFader       /*:TextFader*/       = null;
			 this.SessionClose    /*:Function*/        = null;
			 this.FU              /*:FormUtils*/       = null; 
			 this.domain          /*:String*/          = '';
			 this.rootPath        /*:String*/          = '';
			 this.absRootPath     /*:String*/          = '';
			 this.SyntaxColor     /*:SyntaxColor*/     = null;
 
			 //We listen when the jAction library is ready
			 stage.addEventListener(Event.ADDED,this.#B(this.#OnInit));
		 }
 
		 /*public function*/ #OnInit(e/*:Event*/)/*:void*/{
			 stage.removeEventListener(Event.ADDED,this.#B(this.#OnInit));
			 stage.focusManager.tabOnlyFromFront = true;
			 this.domain          = config.domain;
			 this.rootPath        = config.rootPath;
			 this.absRootPath     = config.absRootPath;
 
			 //We initialize the jAction-based framework and listen when it is ready
			 this.Framework = new Framework();
			 this.Framework.addEventListener(FrameworkEvent.INITIALIZED,this.#B(this.#OnFWInitialized));
			 this.Framework.initialize();	
		 }
 
		 /*private function*/ #OnFWInitialized(e/*:Event*/)/*:void*/{
			 this.Framework.removeEventListener(FrameworkEvent.INITIALIZED,this.#B(this.#OnFWInitialized,true));
			 this.LdrAnim                   = jAction.framework.loaderAnimation; //We create a short alias in a property of the global object of the LoaderAnimation class      	 
			 this.FLoader                   = jAction.framework.formLoader;      //The same
			 this.MsgBox                    = jAction.framework.msgBox;          //The same
			 this.Server                    = new ServerRPC(this.rootPath+"jActionRPC/"); //A single reusable instance of global access
			 this.DatePicker                = new DatePicker(); //A single reusable instance of global access
			 this.TextFader                 = new TextFader();  //A single reusable instance of global access
			 this.FU                        = FormUtils; //FU is a shorthand alias of static FormUtils class
			 this.FLoader.evalMode          = 'eval'; //type 'import' for production, type 'eval' for debug(develop) 
			 this.FLoader.preserveModules   = true;   //When the module is closed it is not deleted and when it is called again it is not necessary to load it because it resides in memory.
			 this.Server.onSessionCloseGoTo = this.rootPath+"index.php";
			 this.DatePicker.language       = 'es';
			 this.MsgBox.language           = 'es';
			 this.SessionClose              = function ConfirmClose()/*:void*/{this.MsgBox.msg(this.Server.close.bind(this.Server),null,null,null,MsgBoxType.YES_NO,"Se dispone a cerrar sesión<br>¿Está seguro?","Aviso",500);};
 
			 //Once the library and the framework are initialized, we initialize the application
			 this.AppStart = new AppStart(<?php echo getUrlParams(); ?>,'1.0.3');
		 }
 
		 /*private function*/ #B(cb/*:Function/callback*/, del/*:Boolean*/=false)/*:Function*/ {
			 if(this.#_BINDS[cb.name]){
				 const bind /*:Function*/ = this.#_BINDS[cb.name];
				 if(del){
					 delete this.#_BINDS[cb.name];
				 }
				 return bind;
			 }else{
				 return this.#_BINDS[cb.name] = cb.bind(this);
			 }
		 }
	 }
 
	 /*
	 In order not to dirty the dom with many variables we create a single global object with 
	 properties that will contain values ​​or objects that will be accessible to the entire program.
	 Additionally, to avoid losing control, we sealed the class so that properties cannot be 
	 added on the fly from another part of the application.
	 */
	 /*global var*/ let G /*:Object*/ = new ProxySeal(new Index());
</script></head></html>
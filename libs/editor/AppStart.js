class AppStart {
 		
	/*private var*/ #_BINDS        /*:Object*/  = {};
	/*private var*/ #_urlParams    /*:Object*/  = {};
	/*private var*/ #_cacheVersion /*:String*/  = '';
	/*private var*/ #_firstInit    /*:Boolean*/ = false;
	/*private var*/ #_libLoaded    /*:Boolean*/ = false;
	/*private var*/ #_reloadSkin   /*:Boolean*/ = false;

    /*public function*/ constructor(urlParams /*:Object*/,version /*:String*/){
        this.#_urlParams    = urlParams;
        this.#_cacheVersion = version;
		this.#OnSkinChange();
    }

    /*private function*/ #OnSkinChange(e = null)/*void*/ {
		G.LdrAnim.start();
        if(this.#_firstInit || this.#_reloadSkin){
            library.addEventListener(LibraryEvent.LIBRARY_ITEMS_COMPLETE, this.#B(this.#OnLibReloaded));
        }else{//No aseguramos que onLibComplete solo se ejecutara en la primera carga
            library.addEventListener(LibraryEvent.LIBRARY_ITEMS_COMPLETE, this.#B(this.#OnLibComplete));
        }
       
		const iPath /*:String*/ = G.rootPath+"docs/resource/icons/";
		library.addItem("jac_svg" , iPath+"jaction_logo.svg");
		library.addItem("ja2_svg" , iPath+"jaction_head.svg",'',true,false,22,22);
		library.addItem("sam_svg",  iPath+"samples.svg");
		library.addItem("bep_wav",  G.rootPath+"docs/resource/sound/beep.wav");
		library.addItem("edi_ico",  iPath+"edi.png");

		const td34 /*:Array*/ = ["btn_svg", "pas_png", "chk_svg"    , "cof_svg", "clp_svg", "cmb_svg",
							     "dtg_svg", "dtp_svg", "d26_svg"    , "don_svg", "eyd_svg", "eye_svg",
							     "fol_svg", "jah_svg", ["jsc_svg",1], "lst_svg", "usr_png", "mor_svg",
							     "nms_svg", "pgb_svg", "rdb_svg"    , "sld_svg", "txa_svg", "txi_svg",
							     "tmp_svg", "wrp_svg", null         , null     , null     , null     ];
		library.addTileSet(iPath+"TileSet34.png"   ,td34   ,34);
          
		// 	  if(G.Framework.skinStyle.NAME=='FlashFrameworkSkin'  ){library.addItem("tnub_svg" , iPath+"logo/toctime_g2.png"); library.addTileSet(iPath+"TileSet32.png",td32,32);
		// }else if(G.Framework.skinStyle.NAME=='JActionFrameworkSkin'){library.addItem("tnub_svg" , iPath+"logo/toctime_w.png");  library.addTileSet(iPath+"TileSet32b.png",td32,32);
		// }else if(G.Framework.skinStyle.NAME=='DarkFrameworkSkin'   ){library.addItem("tnub_svg" , iPath+"logo/toctime_w.png");  library.addTileSet(iPath+"TileSet32w.png",td32,32);}    
    }

    /*
	Si al hacer login se detecta que el skin guardado en thm(Claro/Oscuro) de la tabla config no coincide con el cargado en config.frameworkSkin
	Entonces es necesario recargar el source de TocTime porque desde login se manda recargar el skin y los items de la librería se borran
	*/

	/*private function*/ #OnLibReloaded(e)/*:void*/{
		library.reloadDomImages();
		G.LdrAnim.stop();
		this.#_reloadSkin = false
		library.removeEventListener(LibraryEvent.LIBRARY_ITEMS_COMPLETE, this.#B(this.#OnLibReloaded));
		this.#LoadInitFrame('Init');
	}

	/*private function*/ #LoadInitFrame(formOpen/*:String*/="")/*:void*/{
	
		if(formOpen=="Init"){
			/*
			Para evitar que se reinicie la web cuando se cambia de tema desde el apartado de configuración.
			La propiedad Init_form se crea al vuelo y esta disponible cuando el formulario InitForm se añade al DisplayList
			Init_form es el nombre de instancia asignado manualmente por la clase InitForm.js
			*/
			if(stage.Init_form==undefined){
				G.CheckInactivity.start();
				//this.#LoadForm('InitForm.js',[G.Prof[G.Prof.firstClass].id,G.Prof.firstClass]);
				this.#LoadForm('InitForm.js',['','','']);
			}
		}else if(formOpen=="ReloadedSkin"){
			//Como el skin a cambiado esperamos al evento skinChange para abrir InitForm
			this.#_reloadSkin = true;
		}
	}

    /*private function*/ #OnLibComplete(e/*:Event*/)/*:void*/{ 
		this.#_libLoaded = true;
		this.#_firstInit = true;
		stage.addEventListener('frameworkSkinChange',this.#B(this.#OnSkinChange));
		library.removeEventListener(LibraryEvent.LIBRARY_ITEMS_COMPLETE, this.#B(this.#OnLibComplete));
		G.LdrAnim.stop();
		if(this.#_cacheVersion == config.version){
			G.CheckInactivity = new CheckInactivity(60000*10,15);//60000 = 1 MINUTO
			G.CheckInactivity.configAlert("Seguir","Salir","Por seguridad su sesión se cerrara en:","Alerta, cierre de sesión por inactividad");
			//  if(this.#_urlParams.adm!="" || this.#_urlParams.ges!="" || this.#_urlParams.emp!=""){ 
			// 		if(this.#_urlParams.emp !==""){ 
			// 			this.#OpenExternalForm("re", [this.#_urlParams.emp]); 
			// 		}else{
			// 			this.#OpenExternalForm("rg",[this.#_urlParams.adm,this.#_urlParams.ges,this.#_urlParams.emp,int(this.#_urlParams.scale=="c")]);
			// 		}	 
			// }else if(this.#_urlParams.formVerify!=""){                              this.#OpenExternalForm("v"                     , [this.#_urlParams.formVerify]);
			// }else if(this.#_urlParams.action!=""){                    				this.#OpenExternalForm(this.#_urlParams.action , [this.#_urlParams.actionParams]); 
			 if(this.#_urlParams.session=="true"){this.#LoadDynScripts();		this.#OpenExternalForm("l"                     , [this.#_urlParams.usr,this.#_urlParams.pwd,this.#_urlParams.loginWait,this.#_urlParams.timeRest]);												
			}else{				                       this.#LoadDynScripts();		this.#OpenExternalForm("l"                     , ["","",this.#_urlParams.loginWait,this.#_urlParams.timeRest]);}	
			// if(this.#_urlParams.action=="sw"             ){stage.backgroundColor = "#97c6fc";
			// } else if(this.#_urlParams.action=="s" || this.#_urlParams.action=="m"){stage.backgroundColor = "#ffffff";
			// } else{	            
			 	if(this.#_urlParams.scale!==''){
			 		stage.backgroundColor = "#ffffff";
			 	}
		}else{
			//stage.addChild(G.MsgBox);
			G.MsgBox.msg(null,null,null,null,MsgBoxType.ONLY_DIALOG,'<p style="font-size: 14px; text-align: justify;">Aplicación actualizada, su versión no coincide. Por favor, borre la caché de su navegador.</p><p>Si utiliza FireFox, abra el <strong>menú</strong> ☰ (Esquina superior derecha), vaya a <strong>Opciones/Privacidad &amp; Seguridad/Cookies</strong> y datos del sitio y haga clic en <strong>Limpiar</strong> datos.</p><p>En la pantalla que aparece, desmarque la casilla <strong>Cookies</strong> y <strong>datos del sitio</strong> y deje marcada la casilla <strong>Contenido web en caché</strong>. Luego, haga clic en el botón Limpiar y actualice la página.</p><p>(Para otros navegadores, la operación es similar).</p>',"Versión",500,0,MsgBoxStyle.HELP);
			stage.setFullBackGround(G.rootPath+'docs/source/default/@bg'+Math.floor(Math.random() * 13)+'.jpg');
		}
	}


    /*private function*/ #LoadDynScripts()/*:void*/{
		// this.#LoadSource('script', 'libs/thirdParties/jszip/jszip.min.js');
		// this.#LoadSource('script', 'libs/thirdParties/pdfmake/pdfmake.min.js', function() {
		// 	// Una vez que pdfmake.min.js se haya cargado correctamente, carga vfs_fonts.js
		// 	this.#LoadSource('script', 'libs/thirdParties/pdfmake/vfs_fonts.js'); //Necesita que pdfmake este cargado antes de lo contrario da error
		// }.bind(this));
		// this.#LoadSource('script', 'libs/thirdParties/html2canvas/html2canvas.min.js');
	}

	/*private function*/ #LoadSource(type, path, callback)/*:void*/ {
		if (type === 'script') {
			const script = document.createElement('script');
			script.src = path;
			if (callback) {
				script.onload = callback;
			}
			document.body.appendChild(script);
		} else {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = path;
			document.head.appendChild(link);
		}
	}

    /*private function*/ #OpenExternalForm(form/*:String*/,params/*:Array*/)/*:void*/{
		if (form=="c" || form=="ro" || (params.length==4 && params[3]==1)){
			stage.overflow = "hidden";
		}
		let p       /*:String*/   = '';
		let onClose /*:Function*/ = null;
		      if(form=='j' ){p='justify.js'                 ; params  = null;
		}else if(form=='c' ){p='Contact.js'                 ; params  = null;
		}else if(form=='l' ){p='Login.js'                   ; onClose = this.#LoadInitFrame.bind(this);
		}else if(form=='r' ){p='Recover.js'                 ; 
		}else if(form=='rg'){p='register/RegisterProfile.js'; 
		}else if(form=='re'){p='register/RegisterWorker.js' ; 
		}else if(form=='v' ){p='register/RegisterVerify.js' ;}
		this.#LoadForm(p,params,onClose);
	}

    /*public function*/ #LoadForm(path/*:String*/,params/*:Array*/,onClose/*:Function*/)/*:void*/{
		G.FLoader.load(stage, 'forms/'+path,this.#OnLoadInitForm.bind(this) ,onClose,params);
	}	

    /*private function*/ #OnLoadInitForm()/*:void*/{
		G.InitForm = G.FLoader.content;
		stage.addChild(G.DatePicker);
		stage.addChild(G.TextFader);
		G.MsgBox.bringMeToFront();
		G.LdrAnim.bringMeToFront();
		G.InitForm.sendMeToBack();
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
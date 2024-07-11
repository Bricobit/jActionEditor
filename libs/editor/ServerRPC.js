class ServerRPC extends Server {

	/*private var*/ #_urlRedirect   /*:String*/        = "";
	
	/*public function*/ constructor(gateway/*:String*/='',encoding/*:String*/=ObjectEncoding.JSON)/*:void*/{
		super(gateway,encoding);
	}

	/**------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * onSessionCloseGoTo:String (set only)
	 * 
	 * Defines an address that will be opened automatically when you have logged out,
	 * If no address has been specified, it will automatically redirect to the address indicated in the absRootPath variable of
	 * the config.json configuration file.
	 *
	 * Note: This and the rest of the answers from the server might need to be taken out of the server class to be controlled 
	 * by the end user instead of being managed by the class itself? 
	 * 
	 *-----------------------------------------------------------------------------------------------------------------------------*/
	
	/*public function*/ set onSessionCloseGoTo(urlRedirect/*:String*/)/*:void*/{this.#_urlRedirect = urlRedirect;}

	/**------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * close():void close session
	 * 
	 *-----------------------------------------------------------------------------------------------------------------------------*/

	/*public function*/ close()/*:void*/{
		this.call("sessionClose");
	}

	/**------------------------------------------------------------------------------------------------------------------------------
	 * 
	 * response(r:*):void [Override from Server.js Class -> jaction-framework/net/Server.js]
	 * 
	 *-----------------------------------------------------------------------------------------------------------------------------*/


	/*override function*/ response(xhr/*:XmlHttpRequest*/)/*:void*/{
		const responseType   /*:String*/              = xhr.responseType;
		const contentType    /*:String*/              = xhr.getResponseHeader("Content-Type");//.split(';')[0]; < "content/type; charset"
		const [content,type] /*:Destructure<String>*/ = contentType.split('/');
		let response       /*:**/      = null;
				if(content=='application'){
					if(type == "json"){ //Si el servidor respondió con un json
						if (responseType == 'json'){//Si la respuesta de la conexión se configuro para recibir un json
							response = xhr.response;
						}else if(responseType == '' || responseType == 'text'){//Si la respuesta de la conexión se configuro para recibir un string
							const txr        /*:String*/ = xhr.responseText.trim();
							const startIndex /*:int*/    = txr.search("{");
							if(startIndex >-1){                                                                    
								if(startIndex>0){                                                                 
									trace('in:'+this.className+'.response - Uncontrolled message concatenated before json object => '+
															txr.substring(0,startIndex)+ //Mostramos el contenido que se encuentra antes de la llave {
															' Unique expected response => '+ txr.substring(startIndex),'error');
									try {                        
										response = JSON.parse(txr.substring(startIndex));//Devolvemos de igual manera todo el contenido encerrado entre {}, es decir la respuesta JSON
									} catch(err) {
										trace('in:'+this.className+'.response - parse JSON error => '+err,'error');
									}
								}else{
									response = JSON.parse(txr);
								}
							}else{
								trace('in:'+this.className+'.response - response is not JSON','error');
							}
						}
					}else{//Si el servidor respondo con un pdf, doc, gzip etc
							const [fileName,extension]  /*:Destructure<String>*/ = this.#GetFileNameExtension();
							response                                             = xhr.response;
							// 	Preprocess if needed
							// 	  if(type == "pdf"){
							      	//if(responseType == '' || responseType == 'text'){
							      	//}else if(responseType == 'blob'){       //const blob        = xhr.response;
							      	//}else if(responseType == 'arraybuffer'){//const arraybuffer = xhr.response;
							      	//}else if(responseType == 'json'){ 	  //const json        = xhr.response; response = json;
							      	//}				
							      	//	   if(typeof response =='string'){
							      	//} else if (response instanceof Blob) {       
							      	//} else if (response instanceof ArrayBuffer) {
							      	//} else if (response instanceof Document) {}  
							// }else if(type == "gzip"){
							// }else if(type == "vnd.openxmlformats-officedocument.spreadsheetml.sheet"){//xlsx 
							// }else if(type == "msword"){//.doc
							// }else if(type == "vnd.openxmlformats-officedocument.wordprocessingml.document"){//word 
							// }
							response = {serverInfo : {contentType : contentType, fileName : fileName, ext : extension, initialData : response}};
						}
				//At the moment only the response in blob has been considered, be sure to indicate responseType blob for images
				}else if(content == 'image'){
					const [fileName,extension] /*:Destructure<String>*/ = this.#GetFileNameExtension();
					//Preprocess if needed
					//if(type == "jpeg"){
						      if(responseType == '' || responseType == 'text'){response = {serverInfo : {contentType : contentType, fileName : fileName, ext : extension, initialData : 'data:'+contentType+';base64,' +xhr.responseText}};
						}else if(responseType == 'blob'                      ){//const blob        = xhr.response;
						}else if(responseType == 'arraybuffer'               ){//const arraybuffer = xhr.response;
						}else if(responseType == 'json'                      ){//const json        = xhr.response; response = json;
						}					
					//}else if(type == "png"){
					//}else if(type == "bmp"){}

				}else if(content == 'text'){
					// 	  if(type == 'html'){
					// }else if(type == 'plain'){
					// }
				}
				this.#ResponseJson(response);
	}

	/*private function*/ #GetFileNameExtension()/*:Array<String>*/{
		const contentDisposition    /*:String*/ = this.connection.getResponseHeader('Content-Disposition');
		const matches               /*:Array*/  = contentDisposition.match(/filename="([^"]+\.\w+)"/);
		const fileNameWithExtension /*:String*/ = matches ? matches[1] : '.';
		return fileNameWithExtension.split('.');
	}

	/*private function*/ #ResponseJson(r/*:**/)/*:void*/{
		if(r=='CALL_ONLY'){return;}
		let msg /*:String*/   = '';
		let fun /*:Function*/ = null;
		if(r!==null){
			      if(r.serverInfo.initialData !== undefined){ this.callback(r);
			}else if(r.serverInfo.response    !== undefined){

						  if(r.serverInfo.response=='SESSION_CLOSE_DOWN_TIME'){ this.#Redirect();
					}else if(r.serverInfo.response=='NO_GET_RESULT'          ){ msg ="The server has not returned any results, was any result expected?, please try again.";
					}else if(r.serverInfo.response=='ERROR'                  ){
					
						if(r.serverInfo.error=='NOT_ALLOWED_WITHOUT_LOGIN'){
							msg ='La llamada a la clase '+r.serverInfo.data+' no se permite sin permisos de inicio de sesión';
							fun = this.#Redirect.bind(this);
						}else{
							msg = r.serverInfo.error;
						}
						
					}else if(r.serverInfo.response=='CUSTOM'                 ){ this.callback(r);
					}else if(r.serverInfo.response=='BANNED'                 ){ 
						msg =CoreMsg.get('BANNED');
						fun = this.#Redirect.bind(this);
					}

			}else{
				this.callback(r)
				//msg = "The server did not respond to any recognizable command or some error occurred, please try again."; 
			}
		}else{
			msg = "The server is active but does not respond with any message, it is possible that you have previously closed session from another window or there is an error, log in again or try the action again."; 
		}

		if(msg!=''){G.MsgBox.msg(fun,null,null,null,MsgBoxType.OK_ONLY,msg,'Server error!',600);}
	}

	/*private function*/ #Redirect()/*:void*/{navigateToURL(new URLRequest(this.#_urlRedirect=='' ? config.absRootPath: this.#_urlRedirect),"_self");}
}
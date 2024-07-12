/* 
Basic Login Sample
www.jaction.org - Copyright © [2020] - Author: Javier Vicente Medina - giskard2010@hotmail.com
jaction.org is based on Free (MPL) {jAction Lib} && {jAction FrameWork} 

@license
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License. 
*/
class Login extends Form {

	/*private var*/  #_BINDINGS /*:Array*/ = [];
	/*private var*/  #_PREPARED /*:Array*/ = [];
	/*private var*/  #_formH    /*:Array*/ = [["stage_stg","",0,0,500,283,-1],["_lgn_btn","Login",187,209,132,44,4,"",0,1,0,1,0],["_jac_img",null,113,22,273,73,-1,"",0,1,0,1,0],["_usr_txi","Isaac23",99,143,132,22,1,"",0,1,0,1,0],["_pwd_txi","1234",275,143,132,22,2,"",0,1,0,1,0],["_usr_img",null,66,143,22,22,-1,"",0,1,0,1,0],["_usr_lbl","User: Isaac23",99,121,77,22,-1,"",0,1,0,1,0],["_pwd_lbl","Pass:1234",274,121,77,22,-1,"",0,1,0,1,0],["_pwd_img",null,242,143,22,22,-1,"",0,1,0,1,0],["_eye_img",null,418,143,22,22,-1,"",0,1,0,1,0]];
	/*private var*/  #_formV    /*:Array*/ = [["stage_stg","",0,0,283,500,-1],["_lgn_btn","Login",77,352,132,44,4,"",0,1,0,1,0],["_jac_img",null,5,22,273,73,-1,"",0,1,0,1,0],["_usr_txi","Isaac23",88,176,132,22,1,"",0,1,0,1,0],["_usr_img",null,55,176,22,22,-1,"",0,1,0,1,0],["_usr_lbl","User: Isaac23",88,154,77,22,-1,"",0,1,0,1,0],["_pwd_txi","1234",88,231,132,22,2,"",0,1,0,1,0],["_pwd_lbl","Pass:1234",88,209,61,22,-1,"",0,1,0,1,0],["_pwd_img",null,55,231,22,22,-1,"",0,1,0,1,0],["_eye_img",null,231,231,22,22,-1,"",0,1,0,1,0]];
		 
	/*public function*/ constructor(){
		super() ;
		/*inherit prop*/ this.formBorderStyle   = "none";//Hide title bar
		/*inherit prop*/ this.formStartPosition = "CenterScreen";
		/*inherit prop*/ this.borderRadius      = "50px";
        /*inherit meth*/ this.setLayouts(this.#_formH,this.#_formV);
	}
	
	/*public function*/ Login(params/*:Array*/=null)/*:void*/{
		this.#_PREPARED = G.FU.lst([[this         , FormEvent.FORM_CLOSE   , this.#B(this.#Clean)      , ''                            , ''     ],
									[this._lgn_btn, MouseEvent.CLICK       , this.#B(this.#CheckUsrPwd), ['jah_svg',25,25,[],'#ffffff'], 'Login'],
									[this._eye_img, MouseEvent.CLICK       , this.#B(this.#OnEye)      , ''                            , ''     ],
									[stage        , KeyBoardEvent.KEY_PRESS, this.#B(this.#OnKeyPress) , ''                            , ''     ]]);					
		this._jac_img.source            = library.jac_svg;
		this._eye_img.source            = library.eye_svg;
		this._usr_img.source            = library.usr_png;
		this._pwd_img.source            = library.pas_png;
		this._pwd_txi.displayAsPassword = true;
		this._usr_txi.placeHolder       = "User";
		this._pwd_txi.placeHolder       = "Password";
		this._usr_txi.text              = "Isaac23";
		this._pwd_txi.text              = "1234";
		//AutoLogin
		if(params!==null){
			if(params[0]!=="" && params[1]!==""){
				this.#RingLogin(params[0],params[1]);
			}
		}
    }

	/*private function*/ #OnEye(e/*:Event*/)/*:void*/{
		this._pwd_txi.displayAsPassword = !this._pwd_txi.displayAsPassword;
		this._eye_img.source = this._pwd_txi.displayAsPassword ? library.eye_svg : library.eyd_svg;
	}

    /*private function*/ #CheckUsrPwd(e/*:Event*/=null)/*:void*/{
        const pwd/*:String*/ = this._pwd_txi.text;
        const user/*:String*/ = this._usr_txi.text;	
        if (pwd.length == null || pwd.length == 0 || /^\s*$/.test(pwd) || user == null || user.length == 0 || /^\s*$/.test(user)){
            G.MsgBox.show("The username and password fields must be completed.");
        }else{
			this.#RingLogin(user,md5(pwd));
        }				  			
    }

	/*private function*/ #OnKeyPress(e/*:Event*/)/*:void*/{
		let key /*:**/ =  e.key;
		if(!key){key = e.which || e.keyCode;}//Deprecated
		//Enter is -> KEY_NUM:13, KEY:'Enter', CODE:'Enter'
		if ((key === Keyboard.ENTER.KEY || key === Keyboard.ENTER.NUM) && stage.focus !==this._lgn_btn) {
			this.#CheckUsrPwd();
		}
    }

	/*private function*/ #RingLogin(user/*:String*/,pwd/*:String*/){G.Server.call("Login.login",this.#OnGetLogin.bind(this),[user,pwd]);}

	//Response server {"serverInfo":{"response":"SIMULATE_MYSQLI_RESULT","initialData":[[1,"Isaac","Asimov"]],"columnNames":["id","firstname","lastname"],"totalCount":1}}
	/*private function*/ #OnGetLogin(r/*:**/)/*:void*/{
		if(r.serverInfo.initialData !== undefined ){
			const data/*:Array*/ = r.serverInfo.initialData;	
			if (data.length!=0) {
				const id       = data[0][0];
				const username = data[0][1];
				const surname  = data[0][2];
				//this.close([true,id,username,surname]);
				this.close('Init');
			}else{
				G.MsgBox.show("Could not login");
			}
		}else{
			let sm/*:String*/ = "";
			if(r.serverInfo.response=='CUSTOM'){
				if(r.serverInfo.error =='user_error'){
					if(r.serverInfo.loginwait =='0'){
						G.MsgBox.show("Login failed, please check username and password",400,['okOnly','error']);
					}
				}else{
						  if(r.serverInfo.error =='pass_error'){sm = 'Message error ...';
					}else if(r.serverInfo.result=='BLOCK0'){    sm = '<p style="text-align: justify;">Message cause 1</p>';				
					}else if(r.serverInfo.result=='BLOCK1'){    sm = '<p style="text-align: justify;">Message cause 2</p>';
					}else if(r.serverInfo.result=='BLOCK2'){    sm = '<p style="text-align: justify;">...</p>';}
					G.MsgBox.show(sm,700);
				}
			}else if(r.serverInfo.response=='SESSION_CLOSE_DOWN_TIME'){
				G.MsgBox.show("The session has expired, log in again",400,['okOnly','error']);
			}
		}	
	}

	/*private function*/ #Clean(e/*:Event*/)/*:void*/{G.FU.lst(this.#_PREPARED,'remove');}
	/*private function*/ #B(cb/*:Function/callback*/)/*:Function*/ {return this.#_BINDINGS[cb.name] ? this.#_BINDINGS[cb.name]:this.#_BINDINGS[cb.name] = cb.bind(this);}
}
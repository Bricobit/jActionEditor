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
jActionEditor: Based on Free (MPL) {jAction Lib} && {jAction FrameWork} - www.jaction.org -
Author: Javier Vicente Medina - giskard2010@hotmail.com - http://jvm.bricobit.com - 

@license
This Source Code is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL 
was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-License-Identifier: MPL-2.0 - Copyright (c) [Javier Vicente Medina]. Images or icons, except possible 
emojis, are part of the [jActionEditor] project and are licensed under the Mozilla Public License 2.0. 
They are copyrighted and may only be used within the editor itself or in projects directly derived from it. 
Their use in other projects or contexts is not permitted without the explicit permission of the author. 
Contributions of images or icons by third parties must include a copyright notice indicating the original author. 
Contributors must ensure they have the necessary rights to any images or icons they upload. Contributions of code 
by third parties must include a copyright notice indicating the original author. Contributors must ensure they 
have the necessary rights to any code they upload. By contributing code to this project, Contributors agree to 
license their contributions of images or code under the same terms as the main project license 
(Mozilla Public License 2.0).
-->
<!DOCTYPE html><html><head>
<meta charset = "utf-8">
<link href    = "data:," rel = "icon"/>
<script src   = "app/start/AutoImport.js"></script>
<script type  = "text/javascript"> 

	/*
	In order not to dirty the dom with many variables we create a single global object with 
	properties that will contain values ​​or objects that will be accessible to the entire program.
	Additionally, to avoid losing control, we sealed the class so that properties cannot be 
	added on the fly from another part of the application.
	*/
	
	/*global var*/ const G /*:Object*/ = new ProxySeal(new Index(<?php echo getUrlParams(); ?>,'1.0.3'));

</script></head></html>
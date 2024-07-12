<?php
//include(dirname(__FILE__,2)."/utils/class.BanController.php");This file is not offered for download
/**
 * All the actual login and protection logic in this example has been removed to simplify it, therefore you should apply
 * all your own protection logic here through sessions, for example, control the total login attempts, if the attempts
 * are with a user that does not exist when exceeding the number of attempts put a delay between login and login, if the
 * user exists but the passwords are incorrect, after a stipulated number of attempts we block the account instead of 
 * banning the ip, since there could be more users connected from the same ip. If, on the contrary, what occurs are very
 * fast repetitive attempts in a short period of time, we can deduce that a robot is performing login processes, in this
 * situation if we proceed to ban the IP for a stipulated time
 * Another option before reaching the end of banning the ip is that after detecting the fast attempts, a captcha can be 
 * shown, if the problem continues to repeat itself then if we should ban
 */
class Login{
	public $_mysqli;
	//public $_countEnabled       = false;
	//public $_banController;
	//protected $maxTimeLoginWait = 20; //10 segundos
 	//public $pathLogIp           = 'logs/logIp.csv';
	public $_parent;
	function __construct($parent) {
		$this->_parent = $parent;
		//$this->_mysqli = $parent->sqlDBConnection;
		//$this->_banController = new BanController($this->_mysqli);
	}
	public function login($user,$pass){
	
		$_SESSION[CN_USER]           = $user;       
        $_SESSION[CN_PASS]           = $pass;
        
    
        //Basic query and response simulation
        // $stmt = $this->_mysqli->prepare('SELECT id,firstname,lastname FROM users WHERE user = ? && pass = ? LIMIT 1');
        // $stmt->bind_param('ss', $user,$pass);
        // $stmt->execute();
        // $result = $stmt->get_result();
        // $stmt->close();
        // if ($result->num_rows){
        //     $_numRows   =  $result->num_rows;
        //     $_fields    = array();
        //     $_resultset = array();

        //     while($field = $result->fetch_field()){
        //         $_fields[] = $field->name;
        //     }

        //     $_SESSION[CN_PERMIT]  = true;
        //     $resultset[] = $row;
        //     $info = "LOGIN_SUCCESS";
        //     return (object)['response' => $info,'_array'=>$resultset,'_fields'=>$_fields,'_rows'=>$_numRows];//return to client
     
        // }else{
        //    return message object
        // }

       
        //If you want you can return a result of a query directly, the responseManager method of the ServerAPI class is in charge of converting it into 
        //a json object and returning it to the client, in data retrieval queries it is useful since it does not require data management. before shipping to customer
        //Sample
        // $stmt = $this->_mysqli->prepare('SELECT color FROM colors WHERE id = ?');
        // $stmt->bind_param('i', $id);
        // $stmt->execute();
        // $result = $stmt->get_result();
        // return $result



       //Basic check to prevent unsupported symbols, you can escape strings or use sanitize
       if(! $this->check($user) || ! $this->check($pass)){
            return (object)['response' => 'CUSTOM', 'error' => 'CHARACTERS_NOT_ADMITTED'];
        }
        
        //FAKE RESULT
        //You can choose how you want to send the response and how you want to manage it from the client
        
        //pass 1234 == md5 81dc9bdb52d04dc20036dbd8313ed055 When registering you should save the password for example in md5
        if($user =='Isaac23' && $pass='81dc9bdb52d04dc20036dbd8313ed055'){
            $_SESSION[CN_PERMIT]  = true;
            $response  = "SIMULATE_MYSQLI_RESULT";
            $resultset = [[1,'Isaac','Asimov']]; //allrows
            $fields    = ['id','firstname','lastname'];//colNames
            $numRows   = 1;
            return (object) array('response' =>  $response , 'initialData' => $resultset,'columnNames' => $fields,'totalCount' => $numRows);    
            
            //Or..
            //return (object)['response' => 'CUSTOM','_array'=>$resultset,'_fields'=>$fields,'_rows'=>$numRows];//return to client

        }else{

            //Simulation of answer without result / rows
            $response  = "SIMULATE_MYSQLI_RESULT";
            $resultset = []; 
            $fields   = ['id','firstname','lastname'];
            $numRows  = 0;
            return (object) array('response' =>  $response , 'initialData' => $resultset,'columnNames' => $fields,'totalCount' => $numRows); 
            
            //Or..
            //return (object)['response' => 'CUSTOM', 'error' => 'USER_NOT_FOUND'];
        }



       /*Real code that maybe you can study take advantage of or delete

        $_SESSION[CN_USER]           = $user;       
        $_SESSION[CN_PASS]           = $pass;
		$_SESSION[CN_WAITBAN]        = 15;          
		$_SESSION[CN_MAXRETRY]       = 3;           
		$_SESSION[CN_USEREXIST]      = false;
		$_SESSION[CN_USERMAXRETRIES] = 3;  
		$_SESSION[CN_PASSMAXRETRIES] = 5;  
        if (!isset($_SESSION["LOGIN_START"])){                                      // GLOBAL VARS RUN ONLY IN THE FIRST CYCLE
            $_SESSION["LOGIN_START"]  = true;
            $_SESSION[CN_DEV]         = $this->_banController->getDevice();         // ($detect-> isMobile ()? ($Detect-> isTablet ()? 'Tablet': 'Mobile'): 'Pc') ; // Device with which you are accessing
            $_SESSION[CN_IP]          = $this->_banController->getRealIP();         // user ip
            $_SESSION[CN_PERMIT]      = false;                                      // If the value is true then the user has permission to make queries
            $_SESSION[CN_BANTIME]     = "";                                         // If it contains a time it means that the ip is banned
            $_SESSION[CN_RETRIES]     = 0;                                          // The current number of total failed login attempts
            $_SESSION[CN_USERRETRIES] = 0;                                          // The current number of failed user attempts
            $_SESSION[CN_PASSRETRIES] = 0;                                          // The current number of failed password attempts with the user being correct
            $_SESSION[CN_ID]          = "";                                         // Once successfully logged in, store the user id
            $_SESSION[CN_CLS]         = "";                                         // Once logged in, store the user class
            $_SESSION[CN_RETRIESFAST] = 0;                                          // VERY FAST LOGINS ISSUE
            $_SESSION[CN_LOGINWAIT]   = 'no';                                       // If yes, login is not allowed because you have to wait. Wait time between login and login, time increases for each failure if the username does not exist.
            $_SESSION[CN_OLDCALL]     = time ();                                    // The time of the last login request
            //$_SESSION['code']       = getCountryFromIP($_SESSION [CN_IP],"code"); // returns country code: ES
            //$_SESSION['country']    = getCountryFromIP($_SESSION [CN_IP],"Name"); // returns country name: Spain
            }

        
		if($_SESSION[CN_LOGINWAIT]=='yes'){
			$newLoginTime = time() - $_SESSION[CN_LOGINTIME];       
			if($newLoginTime > $this->maxTimeLoginWait){           
				$_SESSION[CN_LOGINWAIT] = 'no';                      
			}else{
				$o = $this->getObject($info,$user_error,'0','0',$this->maxTimeLoginWait);
			}
		}
		
		if($_SESSION[CN_LOGINWAIT]=='no'){
			$this->_banController->checkBanTime($_SESSION[CN_IP]); 
			$o;
			if($_SESSION[CN_BANTIME]==""){
				if($this->_banController->checkFastlogins()){
					$stmt = $this->_mysqli->prepare('SELECT id,cls,sub,pass,std,alert,pin,fic,pan FROM users WHERE user = ? LIMIT 1');
					$stmt->bind_param('s', $user);
					$stmt->execute();
					$result = $stmt->get_result();
					$stmt->close();
					$user_error = "";
					$pass_error = "";
					$info = "";  
					if ($result->num_rows){
						$row = $result->fetch_array();
						$_SESSION[CN_ID]              = $row[0];
						$_SESSION[CN_CLS]             = $row[1];
						$_SESSION['p']->firstClass    = $row[1];
						$_SESSION['p']->{$row[1]}->id = $row[0];
						$ale                          = $row[5];
						$pin                          = $row[6];
						$fic                          = $row[7];
						$pan                          = $row[8];
						$_SESSION[CN_USEREXIST]       = true;
						if($row[4] =="ACTIVATED"){
							if($pan==1){
									$this->countEnabled = true;
									if($row[3]==$pass){
										$_numRows =  $result->num_rows;
										$_fields = array();
										$_resultset = array();
										while($campos = $result->fetch_field()){
											$_fields[] = $campos->name;
										}
										$_SESSION[CN_PERMIT]  = true;
										$_SESSION[CN_RETRIES] = 0;
										$resultset[] = $row;
										$info = "LOGIN_SUCcESS";
										$o = (object)['response' => $info,'_array'=>$resultset,'_fields'=>$_fields,'_rows'=>$_numRows];
										$ldt = new DateTime(null,new DateTimeZone("Europe/Madrid")); 
										$ldt = $ldt->format('Y-m-d H:i:s');
										$this->_mysqli->query("UPDATE users SET ldt ='".$ldt."' WHERE id='".$row[0]."' LIMIT 1");
									}else{
										$pass_error = "pass_error";
										$info = "LOGIN_ERROR";
										$_SESSION[CN_PASSRETRIES]++;
										if($_SESSION[CN_PASSRETRIES] < $_SESSION[CN_PASSMAXRETRIES]){	
											$o = $this->getObject('CUSTOM',$pass_error,$_SESSION[CN_PASSMAXRETRIES]-$_SESSION[CN_PASSRETRIES],'0','0');						
										}else{
											$this->disableUserAcount();
											$o =  $this->_parent->getObject('CUSTOM','BLOCK6');
										}
									}
								}else{
										if($pin !==0 && $fic==1){$info = "BLOCK0";
									}else if($pin !==0 && $fic==0){$info = "BLOCK1";
									}else if($pin  ==0 && $fic==1){$info = "BLOCK2";
									}else if($pin  ==0 && $fic==0){$info = "BLOCK3";
									}
									$o =  $this->_parent->getObject('CUSTOM',$info);
								}
						}else{
							$this->countEnabled = false;
							if($ale=="PENDING_CONFIRM_LINK"){$info = "BLOCK4";
							}else{$info = "BLOCK5";
							}
							$o =  $this->_parent->getObject('CUSTOM',$info);
						}
					}else{
						$user_error = "user_error";
						$info = "LOGIN_ERROR";
						$_SESSION[CN_USERRETRIES]++;
						if($_SESSION[CN_USERRETRIES] < $_SESSION[CN_USERMAXRETRIES]){	
							$o = $this->getObject('CUSTOM',$user_error,'0','0','0');
						}else{                                      
							$_SESSION[CN_LOGINTIME] = time();
							$_SESSION[CN_LOGINWAIT] = 'yes';	
							$o = $this->getObject('CUSTOM',$user_error,'0','0',$this->maxTimeLoginWait);
						}
					}
				}else{
					$_SESSION[CN_PERMIT] = false;           
					if($_SESSION[CN_BANTIME] ==""){          
						$_SESSION[CN_BANTIME] = date('H:i'); 
					}                      
					$info = "BANNED";
					$o = $this->getObject($info,'','0','0','0');
				}
			}else{
				$info = "BANNED";
				$o = $this->getObject($info,'','0','0','0');
			}
			$this->_banController->saveToListIp($info);
			
		}

        return $o;
        */

    }//End login
    
    

    /*
    private function getObject($w,$e,$r,$t,$l){
		return (object)[
			'response'          => $w,
			'error'             => $e,
			'remaining_attempts'=> $r,
			'timewait'          => $t, 
			'loginwait'         => $l
			];
    } 
    */
	
    /*
	private function checkLoginWait() {
		$result = true;
	   if(isset($_SESSION[CN_PERMIT]) && $_SESSION[CN_PERMIT]){ 
		   if(isset($_SESSION[CN_OLDTIME])){                   
			   $newTime = time() - $_SESSION[CN_OLDTIME];      
			   if($newTime > $this->maxInactivity){                        
				   $result = false;                            
			   }
		   }
		   $_SESSION[CN_OLDTIME] = time();                       
		}
		return $result;	        
    } 
    */
    
    /*
	private function disableUserAcount(){
		$stmt = $this->_mysqli->prepare("UPDATE users SET std=? WHERE id=? LIMIT 1");
		if (!$stmt){ 
			die($funName.' prepare() failed: ' . htmlspecialchars($this->parent->sqlDBConnection->error));
		}
		$id = $_SESSION[CN_ID];
		$std ="DEACTIVATED"; 
		$bind = $stmt->bind_param("si",$std,$id);
		if (!$bind && $bind!==null){
			die($funName.' bind() failed: '    . htmlspecialchars($stmt->error));
		}else if (!$stmt->execute())     { 
			die($funName.' execute() failed: ' . htmlspecialchars($stmt->error));
		}
		$stmt->close();
    }
    */
    
	private function check($value_string){ 
		if (preg_match("/^[a-zñA-Z0-9Ñ\-_]{5,32}+$/", $value_string)) {
			return true;
		}else{ 
			return false;
		} 
	}
};//End class
?>
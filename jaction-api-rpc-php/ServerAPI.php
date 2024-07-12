
<?php
/*		      
{jAction} jActionServer -  http://www.jaction.org
Copyright © 2020 JVM - Author: Javier Vicente Medina - giskard2010@hotmail.com - http://jvm.bricobit.com 

@license
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

spl_autoload_register (function($class){
    $sources = array('/services/class.'.$class.'.php',
                     '/services/another_folder1/class.'.$class.'.php', 
                     '/services/another_folder2/class.'.$class.'.php',
                     '/services/another_folder3/sub_folder_sample/class.'.$class.'.php');
    foreach ($sources as $source) {
        $source = dirname(__FILE__).$source;
        if (file_exists($source)) {
            require_once $source;
        } 
    } 
});
//void session_set_cookie_params ( int $lifetime [, string $path [, string $domain [, bool $secure = false [, bool $httponly = false ]]]] )
//require_once dirname(__FILE__).'/DBConnection.php';

class ServerAPI {
    const JSON_PRETTY_PRINT  = 128;
    protected $maxInactivity = 600;//$maxInactivity in seconds 600/60 = 10 minutes // Set session lifetime in seconds
    public $sqlDB;
    public $sqlDBConnection;
	public function API(){
        $method                = $_SERVER['REQUEST_METHOD'];
        //$this->sqlDB           = new DBConnection();
        //$this->sqlDBConnection = $this->sqlDB->getConnection();
        /*
        * We check if the downtime has been exceeded since the last request
        * If it has been exceeded we close session, otherwise we allow to enter with the request
        */
        if($this->checkTimeOut()){
            //We make sure that the data is received by post
            if($method=='POST'){ 
                $error = "";
                $arguments = array();
                /*
                The name of the function must be received.
                If a single string is received, it is understood that you want to call a local method of this ServerAPI class
                If a string is received separated by a dot, it is understood that you want to call the method of an external class dynamically loaded by spl_autoload_register 
                */
                if( !isset($_POST['functionName'])) {$error = 'No function name!';}
                
                //We check if parameters have been received, they are not mandatory unless the destination function needs them
                if( !isset($_POST['arguments']))    {
                    $arguments = null;
                }else{ 
                    
                    $arguments = json_decode($_POST['arguments']);//Decode the arguments
                   // $this->responseManager((object)['response' => 'CUSTOM', 'ARGUMENTS' => $arguments]);
                }

                if($error=="") {                                             //If there is no error     
                    $arr       = explode(".", $_POST['functionName']);       //If there is a string separated by a point we separate it in an array
                    if(isset($_SESSION[CN_PERMIT]) && $_SESSION[CN_PERMIT]){ //If the session is established and its value is true we allow requests
                        if(count($arr)==2){                                  //If the array contains 2 elements then it is because a service class is called ClassName.MethodName
                            $class = new $arr[0]($this);    //Class
                            if($arguments==null){                            //If there are no arguments
                                $this->responseManager($class->{$arr[1]}()); //We execute the class function without sending arguments
                            }else{
                                $this->responseManager($class->{$arr[1]}(...$arguments));//If there are arguments we execute the class method sending them
                            }
                            }else{                                           //If it only contains one element, it is understood that you want to call a local function / method of the ServerAPI class itself
                                if($arguments==null){
                                    $this->{$_POST['functionName']}();      //If there are no arguments we call the function of this class without parameters
                                }else{
                                    $this->{$_POST['functionName']}(...$arguments); //If there are arguments we call the function of this class and pass the parameters
                                }
                            }
                    }else{       
                        /**
                          * Classes that can be called without having logged in
                          * If the session is not established or is false we only allow the requests of the following classes:
                          * */     
                              if($arr[0]=="Login"){        $class = new $arr[0]($this);$this->responseManager($class->{$arr[1]}(...$arguments));                                    
                        }else if($arr[0]=="Chat"){         $class = new $arr[0]($this);$this->responseManager($class->{$arr[1]}(...$arguments));
                        }else if($arr[0]=="UpLoadSample"){ $class = new $arr[0]($this);$this->responseManager($class->{$arr[1]}(...$arguments));
                        }else if($arr[0]=="sessionClose"){ $this->{'sessionClose'}();
                        }else if($arr[0]=="sessionActive"){ $this->sessionActive(); 
                        //}else if($arr[0]=="Another..."){ $class = new $arr[0]($this);$this->responseManager($class->{$arr[1]}(...$arguments));
                        }
                    } 
                }
                }else if($method=='GET'){   //Not used
                }else if($method=='PUT'){   //Not used
                }else if($method=='DELETE'){//Not used	
                }else{ $this->responseManager((object)['response' => 'INVALID_METHOD']);}
        }else{
            $this->sessionClose();
        }
    }

    /**
     * Response to client
     */
    private function responseManager($r){
            //if $r contains the direct result of a query, we pre format the data into an object and return it to the client
            if($r instanceof \mysqli_result){
                    $numRows =  $r->num_rows;
                    $allrows = array();
                    while($a =  $r->fetch_array(MYSQLI_NUM)){$allrows[] = $a;}
                    $colNames = array();
                    while($campos = $r->fetch_field()){$colNames[] = $campos->name;}
                    $r = (object) array('initialData' => $allrows,'columnNames' => $colNames,'totalCount' => $numRows); 
               
            //Fake result. remove later     
            }else if($r->response=="SIMULATE_MYSQLI_RESULT"){   
                
                $r = $r;


            //If the response property is equal to FILE_RESULT then we retrieve the image path, encode it in base64 and format it inside an object to send it in JSON format
            //This is necessary to recover the images that are in a directory protected by htaccess, only when a user has logged in
            }else if($r->response=="FILE_RESULT"){
                $path        = $r->filePath;
                if (file_exists($path)){ 
                    $data        = file_get_contents($path);
                    $contentType = mime_content_type($path);//devuelve por ejemplo application/pdf
                    $ext         = pathinfo($path, PATHINFO_EXTENSION);//devuelve la extension
                    $fileName    = pathinfo($path, PATHINFO_FILENAME);//devuelve el nombre sin extension
                    if($r->delete){unlink($r->filePath);}
                    $r           = (object) array('contentType' => $contentType,'fileName' => $fileName,'ext' => $ext,'initialData' => 'data:' . $contentType . ';base64,' . base64_encode($data));//echo $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);  
                }else{
                    $r           = (object) array('initialData' => 'FILE_NOT_EXIST');
                }
            //If the result property equals CUSTOM then we do nothing, just return $ r
            }else if($r->response=="CUSTOM"){
                $r = $r;
            }else if($r->response=="SESSION_CLOSE_DOWN_TIME"){$r = (object) array('response' => $r->response);
            //Other actions that you want to add
            }else if($r->response=="ANOTHER..."){
                 //Action
            }else{
                $r = (object) array('response' => 'NO_GET_RESULT');
            }
            echo json_encode((object) array('serverInfo' =>$r),self::JSON_PRETTY_PRINT); 
    }

    function sessionActive():void{
        $sa = false;
        if(session_status() == PHP_SESSION_ACTIVE){
            $result = $this->checkTimeOut();
            if($result){
                $sa = true;
            }else{
                session_destroy();
            }
        } 
        $this->responseManager((object)['response' => 'CUSTOM','session_active' => $sa]);
    }

    private function checkTimeOut() {
        $result = true;
        if(isset($_SESSION[CN_PERMIT]) && $_SESSION[CN_PERMIT]){ //if CN_PERMIT is set and its value is true
            if(isset($_SESSION[CN_OLDTIME])){                    //If CN_OLDTIME is set.
                $newTime = time() - $_SESSION[CN_OLDTIME];       //We subtract the time from when the last request was made to the current time
                if($newTime > $this->maxInactivity){             //If the result is greater than the maximum allowed downtime              
                    $result = false;                             //Then we return false and the session is closed
                }
            }
            $_SESSION[CN_OLDTIME] = time();                      //If the maximum time is not exceeded in this request, then we update the old time with the new one.
        }
        return $result;	        
    } 

    function sessionClose(){
        session_destroy();
        $this->responseManager((object)['response' => 'SESSION_CLOSE_DOWN_TIME']);
    }

    public function sanitize($var, $type){
        $flags = NULL;
        switch($type){
            case 'url'  : $filter = FILTER_SANITIZE_URL;	      break;
            case 'int'  : $filter = FILTER_SANITIZE_NUMBER_INT;   break;
            case 'float': $filter = FILTER_SANITIZE_NUMBER_FLOAT; $flags  = FILTER_FLAG_ALLOW_FRACTION | FILTER_FLAG_ALLOW_THOUSAND;	break;
            case 'email': $var    = substr($var, 0, 254);	      $filter = FILTER_SANITIZE_EMAIL; 										break;
            case 'string':
            default:
                $filter = FILTER_SANITIZE_STRING;
                $flags = FILTER_FLAG_NO_ENCODE_QUOTES;
            break;
        }
        //return($this->sqlDBConnection->real_escape_string(filter_var($var, $filter, $flags))); //Enable when you have a real connection
        return filter_var($var, $filter, $flags); //delete when you have a real connection
    }

    /*
    * exec function to simplify the use of prepared queries
    */
    private function exec($funName,$sql,$params,$get){
        /* (Rem) AFFECTED_ROWS: Returns the number of rows affected by an INSERT, UPDATE, or DELETE query.
        An integer greater than zero indicates the number of rows affected or retrieved. Zero indicates that there were no updated records
        For an UPDATE / DELETE statement, no row matched the WHERE clause in the query, or no query has been
        executed. -1 Indicates that the query returned an error. NULL indicates an invalid argument was sent to the function.*/
        $stmt = $this->sqlDBConnection->prepare($sql);
        if (!$stmt){ 
            die($funName.' prepare() failed: ' . htmlspecialchars($this->sqlDBConnection->error));
        }
        $bind  = null;
        $value = null;
        if($params !==null){
            $types = array_pop($params);//array_pop removes the last element, modifies the original array, and returns the deleted element - array_shift removes the first element, modifies the original array and returns the deleted element 
            $bind  = $stmt->bind_param($types, ...$params);
        }
              if (!$bind && $bind!==null)     { die($funName.' bind() failed: '    . htmlspecialchars($stmt->error));
        }else if (!$stmt->execute())          { die($funName.' execute() failed: ' . htmlspecialchars($stmt->error));
        }else if ($get=="NUM_ROWS")           { $value = $stmt->get_result()->num_rows; //ONLY FOR SELECTS
        }else if ($get=="GET_RESULT")         { $value = $stmt->get_result();           //ONLY FOR SELECTS
        }else if ($get=="INSERT_ID")          { $value = $stmt->insert_id;              //ONLY FOR INSERT
        }else if ($get=="AFFECTED_ROWS")      { $value = $stmt->affected_rows;          //FOR INSERT, UPDATE, or DELETE
        }else if ($get=="GET_FIRST_COL_VALUE"){ $value = $stmt->get_result();           //ONLY FOR SELECTS
                                                if ($value->num_rows){
                                                    $row = $value->fetch_array();
                                                    $value = $row[0];
                                                }
        }         
        $stmt->close();
        if($get!==null){return $value;}
    }

    public function getObject($w,$e){
        return (object)[
                        'response'           => $w,
                        'result'             => $e
                    ];
    }

    private function sendMail($sendTo,$remitente,$subject,$message){
        $headers   = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset=iso-8859-1";
        $headers[] = "From: Plataforma TocTime <".$remitente.">";             //Información de quien lo envía (Si el dominio no existe 1and1 da error)
        $headers[] = "Reply-To: Responder a <".$remitente.">"; //Dirección de respuesta si queremos que sea diferente que la del remitente
        $headers[] = "Return-Path: Devolver error a <".$remitente.">"; //Dirección donde notificar en caso de error
        //en axarnet solo funciona con \n
        if(!mail($sendTo, utf8_decode($subject), utf8_decode($message), implode("\n", $headers))){//en caso de no funciónar poner solo " \n" en 1and1 funcióna con \r\n? 
            return false;	
        }else{
            return true;
        }
    }
}//end class
?>
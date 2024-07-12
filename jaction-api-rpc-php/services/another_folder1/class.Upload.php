<?php

class Upload{

    public $_parent;
    public $_pathTemp;
   
	function __construct($parent) {
        $this->_parent   = $parent;
        $this->_pathTemp = dirname(__FILE__,4)."/docs/temp/";
	}
     
     public function file(...$arguments){
        //Example of additional parameters when uploading an image
        $arg1 = $this->_parent->sanitize($arguments[0],'string'); 
        $arg2 = $this->_parent->sanitize($arguments[1],'string');
        $more = $this->_parent->sanitize($arguments[2],'string');
        //return $this->getObject('error',$this->_pathTemp,'');
        // if(isset($_SESSION['permit'])){
        //     if(!$_SESSION['permit']){
        //         return $this->getObject('error','UPLOAD_ERROR_UNSESION ','');
        //     }
        // }

        if ($_FILES['Filedata']['error'] !== UPLOAD_ERR_OK) {
            return $this->getObject('error','Upload error, reason: ' . $_FILES['Filedata']['error'],'');
        }	

        $MAX_FILESIZE = 1024 * 3072; // 2 mb
        if ($_FILES['Filedata']['size'] <= $MAX_FILESIZE) { //We check that the file does not exceed the allowed size
            $fileName = utf8_decode($_FILES['Filedata']['name']);
            $ext      = strtolower($this->getExtension($fileName));
            $cod      = $this->getUniqueRandomCod($ext);
            $uniqueTempFileName = $cod.".".$ext;

            if($ext==false){
                return $this->getObject('error','Failed to retrieve extension','');
            }

            if( ! move_uploaded_file($_FILES['Filedata']['tmp_name'], $this->_pathTemp.$uniqueTempFileName)){//We send the file to the Temp temporary folder and rename it with another unique name in case several people upload at the same time that they don't crush each other
                return $this->getObject('error','Error moving file to temporary','');
            }else{
                $finfo    = finfo_open(FILEINFO_MIME_TYPE);
                $mimeType = finfo_file($finfo, $this->_pathTemp.$uniqueTempFileName);//We retrieve the mimetype of the file
                //Accepted files (Add or remove)
                $mimes = array(
                    'image/jpeg',
                    'image/pjpeg', //progressive jpeg 
                    'image/png',
                    'image/bmp',
                    'application/msword', //.doc, .dot
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //.docx
                    'application/vnd.ms-excel', //.xls, .xlt, .xla
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',//.xlsx
                    'application/pdf',
                    'text/plain',
                    'text/csv'
                );
               
               
                if(in_array($mimeType,$mimes)){
                    $pathProfile = dirname(__FILE__,4)."/docs/uploads";
                    $finalName = "file.".$ext;
                    if(rename($this->_pathTemp.$uniqueTempFileName, $pathProfile."/".$finalName)){//Rename the file name and at the same time move it
                        return $this->getObject('success','','',$finalName);    
                    }else{
                        $this->deleteFile($this->_pathTemp.$uniqueTempFileName);
                        return $this->getObject('error','Failed to rename the file','');
                    }
                    
                } else {
                    $this->deleteFile($this->_pathTemp.$uniqueTempFileName);
                    return $this->getObject('error','Unsupported format error','');
                }
                finfo_close($finfo);
            }//End if move temporal
        }else{//End else if FILESIZE
            return $this->getObject('error','Image size greater than 2Mb','');
        }
    }//End function image


    private function getObject($action,$error,$cod,$filename=""){
        return (object)['response'=> 'CUSTOM','action'=> $action,'error'=> $error,'cod'=> $cod,'filename'=> $filename];
    }

    private function deleteFile($fileName){
        if (file_exists($this->_pathTemp.$fileName )){ 
            unlink($this->_pathTemp.$fileName);
        }
    }

    /**
     * REM 
     * 86400 seconds equals 1 day 24Hours
     * if we divide 86400s by 24h we get that every hour is 3600s
     * 3600x4 = 14400 seconds which is equal to 4 hours
     * 3600 * 24 * 7 = 7 days
     * 3600 * 4 = at 4 hours
     * 900 = 15 minutes
     */

    private function deleteFilesOverTime(){
        $dir = opendir($this->_pathTemp);
        while($file = readdir($dir)){
            if(time()-filemtime($this->_pathTemp.$file) > 900 && !is_dir($this->_pathTemp.$file)){
               unlink($this->_pathTemp.$file);
            }
        }
        closedir($dir);
    }

    private function getUniqueRandomCod($ext){
        $cod = rand(1000,9999); 
        if( $this->checkIfCodExist($this->_pathTemp.$cod.".".$ext)){
            $this->getUniqueRandomCod($ext);// If they exist we return to call the function to generate another random number
        } else{// If it does not exist we will finally return it
            return $cod;
        }
    }

    private function checkIfCodExist($filepath){
        if (file_exists($filepath)){ 
            return true;
        }else{
            return false;
        }
    }

    private function getExtension($file) {
        $tmp = explode('.', $file);
        $extension = end($tmp);
        return $extension ? $extension : false;
    }


};//End class
?>
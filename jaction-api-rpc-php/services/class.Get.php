<?php
class Get{
    public $_parent;   	  
	function __construct($parent) {
        $this->_parent = $parent;
	}
   
    public function file(...$arguments){
        $file = $this->_parent->sanitize($arguments[0],'string'); //fileName + ext
        $arg2 = $this->_parent->sanitize($arguments[1],'string'); //additional argument sample
        //CHECK SESSION
        $filePath = dirname(__FILE__,3)."/docs/uploads/".$file;
        return (object)['response'=> 'FILE_RESULT','filePath'=> $filePath,'delete'=> false];
    }   
};
?>
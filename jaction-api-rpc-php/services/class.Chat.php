<?php
class Chat{
    
    public $_parent;

    function __construct($parent) {
        $this->_parent = $parent;
    }

    public function text(...$arguments){
        $str = $arguments[0];
        $str = $this->_parent->sanitize($str,'string'); //We clean the string if we had to send it to a database

        //Return response to client
        return $this->_parent->getObject('CUSTOM',$str);
        
        /* this does the same
        return return (object)[
            'response'           => 'CUSTOM',
            'result'             => $str
        ];
        */
    }
}
?>
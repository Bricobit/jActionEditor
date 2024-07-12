<?php
/** 
 * @web https://www.jaction.org
 * @author Javier Vicente Medina
 */
class SqlDB {
    protected $mysqli;
    
    const LOCALHOST         = '';
    const LOCALHOST_PORT    = 0;
    const DATABASE_USER     = '';
    const DATABASE_PASSWORD = ''; 
    const DATABASE_NAME     = '';
    
    public function __construct() {         
        try{
            $this->mysqli = new mysqli($LOCALHOST, $DATABASE_USER, $DATABASE_PASSWORD, $DATABASE_NAME, $LOCALHOST_PORT);
            if ( false=== $this->mysqli ) {
                die('connect() failed: ' . htmlspecialchars($this->mysqli->error));
            }
            $this->mysqli->query("SET NAMES 'utf8'");
        }catch (mysqli_sql_exception $e){
            http_response_code(500);
            exit;
        }     
    } 
    public function getConnection(){
        return $this->mysqli;
    }
}
?>
<?php 
function getRealIP(){
   $client_ip = "unknown";
         if(getenv('REMOTE_ADDR')){           $client_ip = getenv('REMOTE_ADDR');
   }else if(!empty($_SERVER['REMOTE_ADDR'])){ $client_ip = $_SERVER['REMOTE_ADDR'];
   }else if(!empty($_ENV['REMOTE_ADDR'])){    $client_ip = $_ENV['REMOTE_ADDR'];}	
   if(getenv('HTTP_X_FORWARDED_FOR')){
      $entries = split('[, ]', getenv('HTTP_X_FORWARDED_FOR'));
      reset($entries);
      while (list(, $entry) = each($entries)){
         $entry = trim($entry);
         if ( preg_match("/^([09]+\\.[09]+\\.[09]+\\.[09]+)/",$entry,$ip_list)){
            $private_ip = array('/^0\\./','/^127\\.0\\.0\\.1/','/^192\\.168\\..*/','/^172\\.((1[69])|(2[09])|(3[01]))\\..*/','/^10\\..*/');
            $found_ip = preg_replace($private_ip, $client_ip, $ip_list[1]);
            if ($client_ip != $found_ip){
               $client_ip = $found_ip;
               break;
            }
         }
      }
   }
   return $client_ip;
}
?>
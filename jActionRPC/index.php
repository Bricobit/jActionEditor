<?php
    header('Content-Type: application/json');
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    session_set_cookie_params(['samesite' => 'None']);
    session_set_cookie_params(['secure' => true]);
    session_start();

    /*Profiles: Example of persistent hierarchical data to avoid queries and add security
    $G_Prof = (object)[
        'firstClass'     =>  "", 
        'SubUser'        => (object)['login'   =>false,'id '=>"",'user '=> "",'priv '=>""],
        'Employees'      => (object)['populate'=>false,'cod'=>"",'raz'=>"",'nif'=>"",'mode'=>"",'mail'=>"",'fi'=>"",'ff'=>"",'id'=>"",'user'=>"",'nom'=>"",'cls'=>"",'std'=>"",'alert'=>"",'asoc'=>"",'priv'=>"",'lan'=>"",'imghead'=>"",'imgbody'=>"",'avatar'=>"",'closeredir'=>"",'loginurl'=>"",'showInfoMenu'=>null],
        'Business'       => (object)['populate'=>false,'cod'=>"",'raz'=>"",'nif'=>"",'mode'=>"",'mail'=>"",'fi'=>"",'ff'=>"",'id'=>"",'user'=>"",'nom'=>"",'cls'=>"",'std'=>"",'alert'=>"",'asoc'=>"",'priv'=>"",'lan'=>"",'imghead'=>"",'imgbody'=>"",'avatar'=>"",'closeredir'=>"",'loginurl'=>"",'showInfoMenu'=>null],
        'Managers'       => (object)['populate'=>false,'cod'=>"",'raz'=>"",'nif'=>"",'mode'=>"",'mail'=>"",'fi'=>"",'ff'=>"",'id'=>"",'user'=>"",'nom'=>"",'cls'=>"",'std'=>"",'alert'=>"",'asoc'=>"",'priv'=>"",'lan'=>"",'imghead'=>"",'imgbody'=>"",'avatar'=>"",'closeredir'=>"",'loginurl'=>"",'showInfoMenu'=>null],
        'Administrator'  => (object)['populate'=>false,'cod'=>"",'raz'=>"",'nif'=>"",'mode'=>"",'mail'=>"",'fi'=>"",'ff'=>"",'id'=>"",'user'=>"",'nom'=>"",'cls'=>"",'std'=>"",'alert'=>"",'asoc'=>"",'priv'=>"",'lan'=>"",'imghead'=>"",'imgbody'=>"",'avatar'=>"",'closeredir'=>"",'loginurl'=>"",'showInfoMenu'=>null]
    ];*/

    

    //session_start();

    //if(!isset($_SESSION['p'])){$_SESSION['p'] = $G_Prof;} 

    date_default_timezone_set('Europe/Madrid');

    define('CN_USER'          ,'user');
    define('CN_PASS'          ,'pass');
    define('CN_PERMIT'        ,'permit');

    define('CN_OLDTIME'       ,'oldtime');
    // define('CN_RETRIES'       ,'retries');
    // define('CN_BANTIME'       ,'bantime');
    // define('CN_WAITBAN'       ,'waitban');
    // define('CN_ID'            ,'id');
    // define('CN_CLS'           ,'cls');
    // define('CN_MAXRETRY'      ,'maxretry');
    // define('CN_USERRETRIES'   ,'userretries');
    // define('CN_PASSRETRIES'   ,'passretries');
    // define('CN_USERMAXRETRIES','usermaxretries');
    // define('CN_PASSMAXRETRIES','passmaxretries');
    // define('CN_OLDTIME'       ,'oldtime');
    // define('CN_USEREXIST'     ,'userexist');
    // define('CN_RETRIESFAST'   ,'retriesfast');
    // define('CN_OLDCALL'       ,'oldcall');
    // define('CN_LOGINWAIT'     ,'loginwait');
    // define('CN_LOGINTIME'     ,'logintime');
    // define('CN_CAPTCHA'       ,'captcha');
    // //Connection info
    // define('CN_IP'            ,'ip');
    // define('CN_DEV'           ,'dev');
    // define('CN_OS'            ,'os');
    // define('CN_NAV'           ,'nav');
    
    require dirname(__FILE__).'/ServerAPI.php'; 
    $SAPI = new ServerAPI(); 
    $SAPI->API();
?>
<?php
    if(isset($_POST['username']) && isset($_POST['password'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        
        if($username == 'mhamel' && $password == 'innocent'){
            session_start();
            $_SESSION['username']   = $username;            
        }else{
            http_response_code(401);
        }
    }
    else{
        http_response_code(400);
    }

?>

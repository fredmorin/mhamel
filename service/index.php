<?php

    session_start();
    if(!isset($_SESSION['username'])){
        http_response_code(401);
        die;
    }

    if(isset($_ENV['OPENSHIFT_DATA_DIR'])){
        $conn = new PDO('sqlite:' . $_ENV['OPENSHIFT_DATA_DIR'] . 'data.sqlite');
        
    }else{
        $conn = new PDO('sqlite:data5.sqlite');
    }    
    
    initializeDatabase($conn);
    
    if ($conn) {        
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            
            if(isset($_GET['request']) && $_GET['request'] == 'backup'){
                header('Content-disposition: attachment; filename=data.sqlite');
                header('Content-type: application/octet-stream');
                readfile($_ENV['OPENSHIFT_DATA_DIR'] . 'data.sqlite');
            }
            
            if(isset($_GET['id'])){
                $id = intval($_GET['id']);
                $sql = "SELECT * FROM resource WHERE id={$id}";
                //die($sql);
                $query = $conn->query($sql, PDO::FETCH_ASSOC);
            }else{
                $query = $conn->query("SELECT * FROM resource WHERE status='a' ORDER BY number", PDO::FETCH_ASSOC);
            }
            
            $results = $query->fetchAll();

            $featureCollection = new stdClass();
            $featureCollection->type = "FeatureCollection";
            $featureCollection->features = array();

            foreach($results as $result){
                $feature = new stdClass();
                $feature->type = "Resource";
                $feature->properties = new stdClass();
                $feature->properties->id = $result['id'];
                $feature->properties->number = $result['number'];
                $feature->properties->count = $result['count'];
                if(isset($_GET['id'])){                
                    $feature->properties->paidPrice = getNumericValue($result['paidprice']);
                    $feature->properties->retailPrice = getNumericValue($result['retailprice']);
                    $feature->properties->salePrice = getNumericValue($result['saleprice']);
                    $feature->properties->description = $result['description'];
                }
                $featureCollection->features[] = $feature;            
            }
            $json = json_encode($featureCollection);
            die($json);
        }else if($_SERVER['REQUEST_METHOD'] == 'PUT'){
            parse_str(file_get_contents("php://input"),$putvars);
            
            $request = $putvars['request'];
            if($request == 'update'){            
                $sql = "UPDATE resource SET paidprice=?, retailprice=?, saleprice=?, description=? WHERE id=?";;
                $query = $conn->prepare($sql);
                $success = $query->execute(array($putvars['paidPrice'],$putvars['retailPrice'],$putvars['salePrice'],$putvars['description'],$putvars['id']));
                if($success !== true){
                    http_response_code(400);
                }
            }else if($request == 'remove'){
                
                $sql = "UPDATE resource SET count=count-1 WHERE id=?";
                $query = $conn->prepare($sql);
                $success1 = $query->execute(array($putvars['id']));
                
                $id = intval($putvars['id']);
                $select = "SELECT number FROM resource WHERE id={$id}";
                $selectQuery = $conn->query($select, PDO::FETCH_ASSOC);
                $selectResult = $selectQuery->fetch();
                echo("number:" . $selectResult['number']);
                
                if($success1){
                    $sqlinsert = "INSERT INTO eventlog(number, eventtypeid, datetime, userid) values(?,1, strftime('%Y-%m-%dT%H:%M:%f','now'), 'userid')";
                    $queryinsert = $conn->prepare($sqlinsert);
                    $success2 = $queryinsert->execute(array($selectResult['number']));
                    if($success2 !== true){                        
                        http_response_code(400);
                    }                
                }  else {                    
                     http_response_code(400);
                }                 
            }else if($request == 'add'){
                $sql = "UPDATE resource SET count=count+1 WHERE id=?";
                $query = $conn->prepare($sql);
                $success = $query->execute(array($putvars['id']));
                if($success !== true){
                    http_response_code(400);
                }
            }
            
        }else if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $sql = "INSERT INTO resource(number, count, paidprice, retailprice, saleprice, description) values (?,?,?,?,?,?)";
            error_log($sql);
            $query = $conn->prepare($sql);
            $success = $query->execute(array($_POST['number'],$_POST['count'],$_POST['paidPrice'],$_POST['retailPrice'],$_POST['salePrice'],$_POST['description']));
            if($success !== true){
                http_response_code(400);
            }            
        }else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
            parse_str(file_get_contents("php://input"),$deletevars);

            $select = "SELECT count from resource WHERE id=?";
            $selectQuery = $conn->query($select, PDO::FETCH_ASSOC);
            $result = $selectQuery->fetch();
            if($result['count'] > 0){
               echo "Impossible de supprimer cet pièce puisqu'il y en a encore en inventaire.";
               http_response_code(400);
            }
            
            $sql = "DELETE FROM resource WHERE id=?";
            $query = $conn->prepare($sql);
            $success = $query->execute(array($deletevars['id']));
            if($success !== true){
                http_response_code(400);
            }            
        }
    } else {
        print "Connection to database failed!\n";
    }
    
    function getNumericValue($value){
        if($value == null){
            return $value;
        }else{
            return number_format($value,2);
        }        
    }
    
    
    function initializeDatabase($conn){
        $conn->exec("CREATE TABLE IF NOT EXISTS resource(
            id integer primary key autoincrement not null,
            number char(15) unique not null,
            count int default 0,
            paidprice real default 0.0,
            retailprice real default 0.0,
            saleprice real default 0.0,
            description text,
            status char(1) default 'a'
            )" );

        $conn->exec("CREATE TABLE IF NOT EXISTS eventtype(
            id integer primary key not null,
            name char(15)
            )" );        

        $conn->exec("CREATE TABLE IF NOT EXISTS eventlog(
            id integer primary key autoincrement not null,            
            number char(15) not null,
            eventtypeid integer,
            datetime char(20),
            userid char(15) not null,
            FOREIGN KEY(eventtypeid) REFERENCES eventtype(id)
            )" );

        $conn->exec("insert into eventtype(id, name) values ( 1, 'sale')" );

        
    }
?>

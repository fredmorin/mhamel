<?php
   // $dbconn = sqlite_open('data.sqlite');
    $conn = new PDO('sqlite:data.sqlite');

    if ($conn) {
        
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $query = $conn->query("SELECT * FROM resource ORDER BY number", PDO::FETCH_ASSOC);
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
                $feature->properties->paidPrice = number_format($result['paidprice'],2);
                $feature->properties->retailPrice = number_format($result['retailprice'],2);
                $feature->properties->salePrice = number_format($result['saleprice'],2);
                $featureCollection->features[] = $feature;            
            }
            $json = json_encode($featureCollection);
            die($json);
        }
        else if($_SERVER['REQUEST_METHOD'] == 'PUT'){
            parse_str(file_get_contents("php://input"),$putvars);
            
            $sql = "UPDATE resource SET count=?, paidprice=?, retailprice=?, saleprice=? WHERE id=?";;
            $query = $conn->prepare($sql);
            $success = $query->execute(array($putvars['count'],$putvars['paidPrice'],$putvars['retailPrice'],$putvars['salePrice'],$putvars['id']));
            if($success !== true){
                http_response_code(400);
            }
            
        }
    } else {
        print "Connection to database failed!\n";
    }
?>

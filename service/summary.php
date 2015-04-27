<?php

    session_start();
    if(!isset($_SESSION['username'])){
        http_response_code(401);
        die;
    }

    // output headers so that the file is downloaded rather than displayed
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=data.csv');

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// output the column headings
fputcsv($output, array('numero', 'vendu', 'date min', 'date max'));

// fetch the data
if(isset($_ENV['OPENSHIFT_DATA_DIR'])){
    $conn = new PDO('sqlite:' . $_ENV['OPENSHIFT_DATA_DIR'] . 'data.sqlite');

}else{
    $conn = new PDO('sqlite:data5.sqlite');
}  

$query = $conn->query("select number, count(*), min(datetime),max(datetime) from eventlog where eventtypeid = 1 group by number order by number;", PDO::FETCH_ASSOC);
$results = $query->fetchAll();
foreach($results as $result){
    fputcsv($output, $result);
}

    
?>

<?php
class DataBaseQuery{
    public $db_connected,$num_sub,$output;
    protected $db_con;
    protected $argument = [];
    //Connecting to database and handling connection errors
    public function __construct(){
        $this->db_con = TRUE;
        try{
            $this->db_con = new PDO('mysql:host=localhost;dbname=sumaryz_db;charset=utf8','sumaryz_guys','Motionb2K');
            $this->db_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db_con->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }catch(PDOException $e){
            echo "Can\'t access database at the moment".$e->getMessage();
            die();
        }
    }
    //Disconnecting from database
    function disconnectDB(){
        $this->db_con = NULL;
        $this->db_connected = FALSE;
    }
    //Select items from database as an associate array
    function sQuery($query, $argument){
        try{
            $stmt = $this->db_con->prepare($query);
            $stmt->execute($argument);
            $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $output;
        }catch(PDOException $e){
            echo "Couldn't fetch data, an error occurred !!!".$e->getMessage();
        }
    }
    //Update,Delete,Insert
    function udiQuery($query, $argument){
        try{
            $stmt = $this->db_con->prepare($query);
            $stmt->execute($argument);
            return TRUE;
        }catch(PDOException $e){
            echo "Couldn't fetch data, an error occurred !!!".$e->getMessage();
        }
    }
}
//sanitizing our script
function clean($value) {
    $value = trim($value);
    $value = stripslashes($value);
    $value = htmlspecialchars($value);
    return $value;
}
?>
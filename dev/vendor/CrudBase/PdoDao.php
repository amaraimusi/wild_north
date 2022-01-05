<?php
require_once 'IDao.php';

/**
 * PDOのDAO（データベースアクセスオブジェクト）
 * 
 * @date 2019-10-26 | 2021-12-23
 * @version 1.3.1
 * @license MIT
 * @author Kenji Uehara
 *
 */
class PdoDao implements IDao
{
	
    private $dao;
    
    public function __construct($dbConf=[]){
        
        if(empty($dbConf)){
            global $crudBaseConfig;
            $dbConf = $crudBaseConfig['dbConfig'];
        }

        try {
            $this->dao = new PDO("mysql:host={$dbConf['host']};dbname={$dbConf['db_name']};charset=utf8",$dbConf['user'],$dbConf['pw'],
            array(PDO::ATTR_EMULATE_PREPARES => false));

        } catch (PDOException $e) {
            exit('データベース接続失敗。'.$e->getMessage());
            die;
        }

    }
	
	
	
	/**
	 * DAO(データベースアクセスオブジェクト）を取得する
	 * @return object Dao
	 */
	public function getDao(){

        return $this->dao;
	}
	
	/**
	 * SQLを実行してデータを取得する
	 * @return boolean|PDOStatement[][]
	 */
	public function getData($sql){
		$dao = $this->getDao();
		$stmt = $dao->query($sql);
		if($stmt === false) {
			var_dump('SQLエラー→' . $sql);
			return false;
		}
		
		$data = [];
		foreach ($stmt as $row) {
			$ent = [];
			foreach($row as $key => $value){
				if(!is_numeric($key)){
					$ent[$key] = $value;
				}
			}
			$data[] = $ent;
		}
		
		return $data;
	}
	
	/**
	 * SQLを実行
	 * @param string $sql
	 * {@inheritDoc}
	 * @see IDao::sqlExe()
	 * @return [][] 2次元構造データ
	 */
	public function sqlExe($sql){
	    return $this->query($sql);
	}
	
	/**
	 * SQLを実行
	 * @param string $sql
	 * @return string エラーメッセージ
	 */
	public function query($sql){
	    $stmt = $this->dao->query($sql);

	    if($stmt === false){
	        $errInfo = $this->dao->errorInfo();
	        $err_msg = "
				<pre>
					SQLエラー→{$sql}
					$errInfo[0]
					$errInfo[1]
					$errInfo[2]
				</pre>
			";
			var_dump($err_msg);
	    }
	    
	    $data = $stmt->fetchAll();
	    if($data === false){
	        $errInfo = $this->dao->errorInfo();
	        $err_msg = "
				<pre>
					SQLエラー→{$sql}
					$errInfo[0]
					$errInfo[1]
					$errInfo[2]
				</pre>
			";
					var_dump($err_msg);
	    }
	    
	    return $data;

	}
	
	
	
	public function begin(){
		$dao = $this->getDao();
		$stmt = $dao->query('BEGIN');
	}
	
	public function rollback(){
		$dao = $this->getDao();
		$stmt = $dao->query('ROLLBACK');

	}
	
	public function commit(){
		$dao = $this->getDao();
		$stmt = $dao->query('COMMIT');

	}
}


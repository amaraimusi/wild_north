<?php 

/**
 * 町画面制御クラス
 * @note 町画面
 * @since 2022-1-4
 * @auther amaraimusi
 * @version 1.0.0
 */
class Model{
    
    public $dao;
    
    public function __construct(&$dao){
        $this->dao = $dao;
    }
    
    public function getBackImgHm(){
        $backImgData = $this->dao->getData('SELECT * FROM back_imgs WHERE delete_flg=0');

        $backImgHm = [];
        foreach($backImgData as $ent){
            $id = $ent['id'];
            $backImgHm[$id] = $ent;
        }

        return $backImgHm;

    }
    
}
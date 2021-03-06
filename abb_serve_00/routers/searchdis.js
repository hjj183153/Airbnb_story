const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//轮播图
router.get("/",(req,res)=>{
    var condition=req.query;
    let{
        City_id,
        District_name,
    }=condition;
    //console.log(condition);
    if(!City_id){
        City_id=2;
    }
    var sql='SELECT * FROM Airbnb_district WHERE City_id=?'
    pool.query(sql,[City_id],(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send({code:1,data:result});
    })
})
module.exports=router;
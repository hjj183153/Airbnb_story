const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//个人信息接口
router.get("/",(req,res)=>{
  var user_id=req.session.user_id;
  if(!user_id){
    res.send({code:-1,msg:'请登录'});
    return;
  }
  var sql='SELECT user_name,user_pwd,user_email,user_phone,user_gender,user_reg_time,user_login_time FROM Airbnb_user WHERE user_id=?';
  pool.query(sql,[user_id],(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:'查询成功',data:result})
  })
})
//修改信息借口
router.get('/user_update',(req,res)=>{
  var name=req.query.name;
  var email=req.query.email;
  var phone=req.query.phone;
  var sex=req.query.sex;
  var user_id=req.session.user_id;
  if(!user_id){
    res.send({code:-1,msg:'请登录'});
    return;
  }
  var sql='UPDATE Airbnb_user SET user_name=?,user_email=?,user_phone=?,user_gender=? WHERE user_id=?';
  pool.query(sql,[name,email,phone,sex,user_id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>1){
      res.send({code:1,msg:'保存成功',data:result});
    }
  })
})
module.exports=router;
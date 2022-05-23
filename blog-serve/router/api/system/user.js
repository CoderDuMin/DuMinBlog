const express = require('express');
const router = express.Router();
const {user} = require('../../../model/index')

router.put('/user/updatePwd',(req,res)=>{
   console.log(req.auth);
   let userId = req.auth.userId
   user.resetUserPwd({password:req.body.password,userId}).then(result=>{
    res.send({code:200, data:result,userInfo:req.user,msg:'密码修改成功'})
   }).catch(err=>{
    res.send({code:500, msg:err})
   })
   
})











module.exports = router
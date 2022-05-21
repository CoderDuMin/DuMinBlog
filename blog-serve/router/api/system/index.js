const express = require('express');
const router = express.Router();
const {user} = require('../../../model/index')

router.get('/getData',(req,res)=>{
   let userId = req.query.userId
   user.getUserInfo(userId).then(result=>{
    res.send({code:200, data:result,msg:'登录成功'})
   }).catch(err=>{
    res.send({code:500, msg:err})
   })
   
})
module.exports = router
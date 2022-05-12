// @login & register
const express = require('express');
const connection = require('../../sqlserve/index')
const router = express.Router();

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/login', (req, res) => {
  const {name,pwd} = req.query
  console.log(name,pwd)
  connection.query(`select * from user where userName = '${name}'`,(err, result)=>{
    if(err){
      console.log('错误');
      res.send({code:400, data:err,msg:'请求失败' })
    }
    if(result){
      
      const user = JSON.parse(JSON.stringify(result))
      console.log('成功',user);
      if(user.length == 0){
        res.send({code:408, data:'没有此账号',msg:'请求失败' })
      }else{
        pwd==user[0].password ? res.send({code:200, data:user,msg:'登录成功' }):res.send({code:409, data:'密码错误',msg:'请求失败' })
      }
    }
    
  })
  
});


module.exports = router;

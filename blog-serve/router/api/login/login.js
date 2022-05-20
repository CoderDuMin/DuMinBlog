// @login & register
const express = require('express');
const connection = require('../../../sqlserve/index')
const router = express.Router();
const jwt = require('jsonwebtoken');

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
        if(pwd==user[0].password){
          let secret="syyyuigfrhygfgi" 
          // 这是加密的key（密钥）,可以是任意的内容，但在开发中一般不写在代码中，而是一个文件
          let token = jwt.sign({userId:user[0].userId}, secret, {
          expiresIn: 60*60*1  // 1小时过期
          });
          res.send({code:200, data:user,msg:'登录成功',token })
        }
        else{
          res.send({code:409, data:'密码错误',msg:'请求失败' })
        }
        
        
      }
    }
    
  })
  
});


module.exports = router;

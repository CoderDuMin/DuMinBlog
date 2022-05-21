const express = require('express')
const {login,system}  = require('./router/api/index')
const expressJwt = require('express-jwt')
const SECRET_KEY = 'login2021' // 与生成token的密钥要一致!

const app = express();
let port = 9527

// 中间件
app.use((req,res,next)=>{
  console.log('authorization',!req.headers.authorization)
  //验证是否携带token
  if(!req.headers.authorization ){
    if(!req.path.includes('/login')){
      return res.status(402).send({code:'A20314',msg:'请求需要携带token!'})
    }
  }
  next()
})


// 1. 使用中间件解析token
// 2. 使用 .unless 排除无需校验的路由(比如: 登录)
app.use(
  expressJwt({
      secret: SECRET_KEY,
      requestProperty:'auth',
      algorithms: ['HS256'], // 使用何种加密算法解析
  }).unless({ path: ['/login/login'] }) // 登录页无需校验
)


// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
app.use('/login',login)
app.use('/system',system)

//错误处理
app.use(function(err, req, res, next) {
  console.log(err, err.name);
  let code = 500;
  let message = 'Internal Server Error';
  // token解析的错误
  if (err.name === 'UnauthorizedError') {
    code = 401
    message = 'token已失效或过期'
  }
  res.statusCode = code;
  res.send({
    code,
    message,
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


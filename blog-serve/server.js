const express = require('express')
const {login}  = require('./router/api/index')
const connection = require('./sqlserve/index')
const app = express();
let port = 9527

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
app.use('/login',login)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


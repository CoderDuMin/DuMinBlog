const db = require('../../sqlserve/index')

/**
 * 获取用户信息
 * @param {string} userId 用户id
 */
const getUserInfo = (userId)=>{
  return new Promise((resolve,reject)=>{
    let sql = 'select * from user where userId = ?'
    db.query(sql,userId,(err,res)=>{
      console.log('err',err)
      if(err){
        reject(err)
      }else{
        let result = JSON.parse(JSON.stringify(res))
        console.log('result',result)
        resolve(result)
      }
      
    })
  })
}

module.exports = {getUserInfo}
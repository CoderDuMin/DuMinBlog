const db = require('../../sqlserve/index')

/**
 * 注册用户
 * @param {object} userInfo 用户信息
 */
const registerUser = (userInfo)=>{
  console.log('userInfo',userInfo)
  return new Promise((resolve,reject)=>{
    let sql = 'insert into user (userId,userName,password,gender,type,state) values (?,?,?,?,?,?)'
    // let sql = 'insert into user set ?'
    db.query(sql,[userInfo.userId,userInfo.userName,userInfo.password,userInfo.gender,userInfo.type,userInfo.state],(err,res)=>{
      console.log('res',res)
      if(err){
        console.log('err',err)
        reject(err)
        
      }
      if(res.affectedRows === 1){
        resolve(res)
      }
    })
  })
}

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

/**
 * 修改密码
 * @param {object} queryData 
 */
const resetUserPwd = (queryData)=>{
  return new Promise((resolve,reject)=>{
    let sql = 'update user set password=? where userId = ?'
    db.query(sql,[queryData.password,queryData.userId],(err,res)=>{
      if(err){
        console.log('err',err)
        reject(err)
      }
      if(res.affectedRows === 1){
        resolve(res)
      }
    })
  })
}

module.exports = {getUserInfo,registerUser,resetUserPwd}
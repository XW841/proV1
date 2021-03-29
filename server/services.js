const db = require('./db.js')
exports.start = (req, res) => {}


// 登录注册处理
exports.login = (req, res) => {
    let username = req.body.username
    let pwd = req.body.password
        // 查询语句
    let sql = 'select * from t_user where user_name = ?'
    db.base(sql, username, (result, error) => {
        if (!result.length) {
            return res.json({ status: 0, msg: '登录失败' })
        } else {
            // [ RowDataPacket { password: '123', username: 'admin', id: 1 } ]
            if (result[0].password == pwd) {

                return res.json({ status: 1, data: result, msg: '登录成功' })
            }
            return res.json({ status: 0, msg: '密码错误' })
        }
    })
}
exports.register = (req, res) => {
    let username = req.body.username
    let pwd = req.body.password
        // 插入语句

    let sql2 = 'select * from t_user'
    let nameArr = []
    db.base(sql2, username, (result, error) => {
        result.forEach(item => {
            nameArr.push(item.user_name)
        });

        console.log(nameArr)
        console.log(username)
        console.log(nameArr.indexOf(username))
        if (nameArr.indexOf(username) == -1) {
            let sql = 'insert into t_user(user_name,password) VALUES(?,?)'
            try {
                db.base(sql, [username, pwd], (result, error) => {
                    if (error) {
                        console.log(result)
                        console.log(error + "12345323")
                        return res.json({ status: 0, msg: error.sqlMessage })
                    } else {

                        console.log(result)
                        return res.json({ status: 1, msg: "注册成功" })
                    }
                })
            } catch (err) {
                console.log(err)
            }


        } else {
            // return nameArr.indexOf(username)
            console.log("用户名已存在")
            return res.json({ status: 0, msg: '用户名已存在' })
        }

    })


}
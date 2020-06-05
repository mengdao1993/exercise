const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'QQ', // 指定邮件服务器
    port: 465, // SMTP端口发邮件的端口号
    secureConnection: true, // 使用SSL加密传输服务
    auth: { // 权限验证
        user: '939341817@qq.com',
        // 授权码
        pass: 'smzirkbpjyfzbebh' // 这是我的授权码
    }
});
function sendMails (to, subject, html) {
    let mailOptions = {
        from: '"mengcj" <939341817@qq.com>', // 发件地址
        to, // 收件地址
        subject, // 邮件标题
        html // 这是内容
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('1111', err)
        }
        console.log(info)
    })
}
module.exports = {sendMails}
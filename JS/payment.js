const nodemailer = require('nodemailer');
//Tạo transporter với thông tin SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenthong0855@gmail.com',
        pass: 'thong085537'
    },
});
//Thiết lập tùy chọn email. TK người gửi, tK người nhận, tiêu dề, nội dung
let mailOptions ={
    from: 'nguyenthong0855@gmail.com',
    to:'nguoinhan@gmail.com',
    subject:'Tiêu đê',
    text:'Nội dung',
};
//Gửi mail
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log("lỗi",error);
    }else{
        console.log("Email đã gửi"+info.response)
    }
})
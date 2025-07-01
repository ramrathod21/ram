const nodemailer = require('nodemailer');
async function sendEmail(to, subject, text, html = null) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "developmentram28@gmail.com",
                pass: "sygk eubi kjum wiui",
            }, 
            tls: {
                rejectUnauthorized: true
            }
        });
        const mailOptions = {
            from: "developmentram28@gmail.com",
            to,
            subject,
            text,
            html,
        };
        setImmediate(async () => {
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
                return info;
            } catch (error) {
                console.error('Error sending email:', error);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {sendEmail};
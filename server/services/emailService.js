const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE || 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || 'Laundex <no-reply@laundex.in>',
            to,
            subject,
            text,
            html,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't crash the server if email fails
        return null;
    }
};

module.exports = sendEmail;

const nodemailer = require('nodemailer');

// Debug: Log the email config (sanitized)
const smtpConfig = {
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER ? '***' : 'missing',
    pass: process.env.SMTP_PASS ? '***' : 'missing',
};
console.log('SMTP Configuration:', JSON.stringify(smtpConfig, null, 2));

const transportOptions = {
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};

// Prioritize explicit Host/Port if Service is missing or empty
if (process.env.SMTP_SERVICE) {
    transportOptions.service = process.env.SMTP_SERVICE;
} else {
    transportOptions.host = process.env.SMTP_HOST;
    transportOptions.port = process.env.SMTP_PORT;
    transportOptions.secure = process.env.SMTP_SECURE === 'true';
    transportOptions.tls = {
        ciphers: 'SSLv3' // Sometimes helps with handshake
    };
}

// Force IPv4 and enable verbose logging
transportOptions.family = 4;
transportOptions.debug = true;
transportOptions.logger = true;

const transporter = nodemailer.createTransport(transportOptions);

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM, // sender address
            to,
            subject,
            text,
            html,
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;

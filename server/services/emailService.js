const { Resend } = require('resend');

// Initialize Resend with API Key from Environment
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Laundex <onboarding@resend.dev>', // Use default testing domain or verified domain
            to: [to], // Resend expects an array
            subject: subject,
            text: text, // Plain text version
            html: html, // HTML version
        });

        if (error) {
            console.error('Resend API Error:', error);
            throw error;
        }

        console.log('Resend Email Sent:', data);
        return data;
    } catch (error) {
        console.error('Error sending email with Resend:', error);
        throw error;
    }
};

module.exports = sendEmail;

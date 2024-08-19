import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendEmail(to, subject, html) {
    try {
        const info = await transporter.sendMail({
            from: 'motivdetox <onboarding@yourdomain.com>', 
            to,
            subject,
            html
        });
        console.log('Email sent: %s', info.messageId);
        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email' };
    }
}

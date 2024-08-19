import VerificationCodeEmail from '../../emails/verificationEmail';
import { sendEmail } from '@/lib/sendEmail';

export async function sendVerificationEmail(
    email,
    username,
    verifyCode
){
    try {
        const html = VerificationCodeEmail(username, verifyCode);

        const result = await sendEmail(
            email,
            'MotivDetox | Verification Code',
            html
        );

        if (!result.success) {
            console.error('Error sending verification email:', result.message);
            return {
                success: false,
                message: 'Failed to send verification email'
            };
        }

        return { success: true, message: 'Verification email sent successfully.' };
    } catch (emailSendingError) {
        console.error('Failed to send verification email', emailSendingError);
        return {
            success: false,
            message: 'Failed to send verification email'
        };
    }
}

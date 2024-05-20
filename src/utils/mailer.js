import User from '@/components/lib/UserModel/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        let updateUser;
        console.log('User Id: ', userId);

        const tokenExpiry = new Date(Date.now() + 3600000);


        if (emailType === 'VERIFY') {
            updateUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken                }
            });
            console.log('Updated User: ', updateUser);
        } else if (emailType === 'RESET') {
            updateUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: tokenExpiry
                }
            });
            console.log('Updated User: ', updateUser);
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cdd56c3084be53",
                pass: "c1949757d5036b"
            }
        });

        const mailOptions = {
            from: 'noreply@example.com', // Replace with your sender address
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
                <p>
                    Click <a href='http://localhost:3000/api/users/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetPassword'}?token=${hashedToken}'>
                    here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.
                </p>
                <p>
                    Or copy and paste the link below in your browser:
                    <br>
                    <a href='http://localhost:3000/api/users/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetPassword'}?token=${hashedToken}'>
                    http://localhost:3000/api/users/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetPassword'}?token=${hashedToken}
                    </a>
                </p>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default sendEmail;

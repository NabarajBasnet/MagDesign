import User from '@/components/lib/UserModel/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verigyTokenExpiry: Date.now() + 360000
                }
            )
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 360000
                }
            )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5728e692f3bfa3", // 😣
              pass: "98bb318ab37a90"  // 😈
            }
          });

        const mailOptions = {
            from: 'nabarajbasnet2000@gmail.com',   // Sender address 
            to: email, // Receiver
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href='${'localhost'}/verifyEmail?token=${hashedToken}'>here </a>  to  ${emailType === 'VERIFY' ? 'Verify your email':'Reset your password'}
            or copy and pase the link below in your browser.
            <br>${'/Domain'}/verifyemailToken/?token=${hashedToken}
            </p>
            `,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    }
    catch (error) {
        throw new Error(error.message)
    }
}


export default sendEmail;
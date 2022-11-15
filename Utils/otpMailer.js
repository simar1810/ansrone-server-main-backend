const nodemailer = require("nodemailer");

const send = async (mailTo, otp) => {
    // TODO: add gmail id and app password to .env file

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const body = `<h1>${otp}</h1>`;

    const mailOptions = {
        from: "AnsrCoach <noreply@ansrcoach.com>",
        to: mailTo,
        subject: "AnsrCoach OTP",
        html: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { send };

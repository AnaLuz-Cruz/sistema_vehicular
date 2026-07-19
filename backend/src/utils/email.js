import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const enviarCorreo = async (destinatario, asunto, html) => {
    const info = await transporter.sendMail({
        from: `"Sistema Control Vehicular" <${process.env.EMAIL_USER}>`,
        to: destinatario,
        subject: asunto,
        html,
    });

    console.log("Correo enviado:", info.messageId);
};

export { enviarCorreo };    
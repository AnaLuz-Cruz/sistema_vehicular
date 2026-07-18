import nodemailer from "nodemailer";


const testAccount = await nodemailer.createTestAccount();



const transporter = nodemailer.createTransport({

    host: "smtp.ethereal.email",

    port: 587,

    secure: false,

    auth: {

        user: testAccount.user,

        pass: testAccount.pass

    }

});



const enviarCorreo = async (
    destinatario,
    asunto,
    html
)=>{


    const info = await transporter.sendMail({

        from:
        `"Sistema Control Vehicular" <${testAccount.user}>`,

        to: destinatario,

        subject: asunto,

        html

    });


    console.log(
        "Correo generado:"
    );


    console.log(
        nodemailer.getTestMessageUrl(info)
    );


};



export {
    enviarCorreo
};
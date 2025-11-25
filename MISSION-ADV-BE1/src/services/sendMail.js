import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `http://localhost:5000/verifikasi-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"EduCourse App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifikasi Akun EduCourse",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Verifikasi Akun Anda</h2>
        <p>Terima kasih telah mendaftar di EduCourse.</p>
        <p>Klik tombol di bawah ini untuk memverifikasi akun Anda:</p>
        <a href="${verifyUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verifikasi Sekarang
        </a>
        <p>Atau salin link ini ke browser Anda:</p>
        <p>${verifyUrl}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email verifikasi dikirim ke ${to}`);
  } catch (error) {
    console.error("❌ Gagal mengirim email:", error);
    throw error;
  }
};

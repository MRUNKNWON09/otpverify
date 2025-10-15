const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { email, subject, message } = req.query;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  // Gmail SMTP সেটআপ
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "apisheba.top@gmail.com",   // তোমার Gmail
      pass: "gwgr vbjv xdoj ofvy",                // Gmail app password (2FA app password)
    },
  });

  // মেইল অপশনস (From এ নাম সহ)
  const mailOptions = {
    from: '"Api Sheba" <security@apisheba.com>', // Display Name + Email
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "❌ Failed to send email", detail: error.message });
  }
};

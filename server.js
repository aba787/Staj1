const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// صفحة تسجيل الدخول
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`📥 تسجيل دخول من: ${email}, كلمة المرور: ${password}`);
  res.send('✅ تم تسجيل الدخول (تجريبي)');
});

// صفحة خدمة العملاء
app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'support.html'));
});

app.post('/support', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `📩 رسالة من ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('✅ تم إرسال رسالتك بنجاح');
  } catch (error) {
    console.error(error);
    res.send('❌ حدث خطأ أثناء الإرسال');
  }
});

// صفحة إنشاء الحساب والأنواع
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/register-student', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register-student.html'));
});

app.get('/register-parent', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register-parent.html'));
});

// صفحة التقديم كمعلم
app.get('/apply-teacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'apply-teacher.html'));
});

app.post('/apply-teacher', async (req, res) => {
  const { name, subject, prefix, phone, email, notes } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `📩 طلب معلم جديد: ${name}`,
    text: `
📘 الاسم: ${name}
📚 التخصص: ${subject}
📱 الهاتف: ${prefix} ${phone}
📧 الإيميل: ${email}

📝 ملاحظات:
${notes}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('✅ تم إرسال الطلب بنجاح! سيتم مراجعته قريباً.');
  } catch (err) {
    console.error(err);
    res.send('❌ حدث خطأ أثناء إرسال الطلب.');
  }
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

res.redirect('/filter.html');  // بعد تسجيل الدخول
// صفحة الإعدادات
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.addUser = async function () {
  const username = document.getElementById("username").value;
  if (!username) return alert("الاسم مطلوب");

  try {
    await addDoc(collection(db, "users"), {
      name: username,
      createdAt: new Date(),
    });
    alert("تمت إضافة المستخدم");
  } catch (e) {
    console.error("خطأ:", e);
  }
}
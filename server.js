const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;  // ใช้พอร์ตจาก environment variable ถ้ามี


app.use(cors({ origin: "*" })); // เปิดใช้ CORS สำหรับทุกโดเมน (หรือระบุเฉพาะ Ngrok URL)
app.use(express.json());

const STAFF_USERNAME = "staff";
const STAFF_PASSWORD = "1234";
const orders = []; // เก็บรายการสั่งซื้อทั้งหมด


// Route สำหรับ Login ของพนักงาน
app.post("/staff-login", (req, res) => {
    const { username, password } = req.body;
    if (username === STAFF_USERNAME && password === STAFF_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
});

// Route สำหรับหน้าแดชบอร์ดพนักงานเพื่อดูคำสั่งซื้อทั้งหมด
app.get("/staff-dashboard", (req, res) => {
    res.json(orders);
});
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); // เปลี่ยนเป็นชื่อไฟล์ของคุณ
});


// Route สำหรับการจัดการคำสั่งซื้อของลูกค้า
app.post("/order", (req, res) => {
    const items = req.body;
    const orderId = Math.floor(Math.random() * 1000000);
    const newOrder = { orderId, items };
    orders.push(newOrder); // เก็บคำสั่งซื้อใน Array `orders`
    res.json({ message: "สั่งซื้อสำเร็จ!", orderId });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

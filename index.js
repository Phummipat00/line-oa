const express = require("express"); // นำเข้าโมดูล express เพื่อใช้สร้างเว็บเซิร์ฟเวอร์
const bodyparser = require("body-parser"); // นำเข้าโมดูล body-parser เพื่อจัดการกับข้อมูล JSON ในการร้องขอ
const { WebhookClient, Payload } = require("dialogflow-fulfillment"); // นำเข้า WebhookClient และ Payload จาก dialogflow-fulfillment เพื่อจัดการกับ webhook
const port = 4000; // กำหนดพอร์ตสำหรับเซิร์ฟเวอร์

const app = express(); // สร้างแอปพลิเคชัน Express
app.use(bodyparser.json()); // ใช้ body-parser middleware เพื่อแปลงข้อมูล JSON ในการร้องขอให้เป็น object

// ตั้งค่าเส้นทางหลัก (route) สำหรับการร้องขอ GET ที่ root path
app.get("/", (req, res) => {
  res.send("<h1>hello king baldwin iv</h1>"); // ส่งข้อความ HTML เป็นการตอบกลับ
});

// ตั้งค่าเส้นทาง webhook สำหรับการร้องขอ POST ที่ "/webhook"
app.post("/webhook", (req, res) => {
  // สร้าง WebhookClient ด้วยการร้องขอและการตอบกลับ
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  // พิมพ์ headers ของการร้องขอจาก Dialogflow ในรูป JSON
  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  // พิมพ์ body ของการร้องขอจาก Dialogflow ในรูป JSON
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  // ฟังก์ชันสำหรับจัดการ intent "Default Welcome Intent"
  function welcome(agent) {
    agent.add(`ยินดีต้อนรับสู่เอเจนต์ของฉัน!`); // เพิ่มข้อความตอบกลับ
  }

  // ฟังก์ชันสำหรับจัดการ intent "Default Fallback Intent"
  function fallback(agent) {
    agent.add(`ฉันไม่เข้าใจ`); // เพิ่มข้อความตอบกลับกรณีที่ไม่เข้าใจ
    agent.add(`ขอโทษค่ะ คุณลองอีกครั้งได้ไหม?`); // เพิ่มข้อความขอให้ลองใหม่อีกครั้ง
  }

  // ฟังก์ชันสำหรับคำนวณค่า BMI
  function bodyMassIndex(agent) {
    let weight = agent.parameters.weight; // ดึงค่าพารามิเตอร์ weight จากการร้องขอ
    let height = agent.parameters.height / 100; // ดึงค่าพารามิเตอร์ height และแปลงหน่วยเป็นเมตร
    let bmi = (weight / (height * height)).toFixed(2); // คำนวณค่า BMI และปัดเศษเป็นทศนิยม 2 ตำแหน่ง
    let result = "ขออภัย หนูไม่เข้าใจ"; // กำหนดข้อความเริ่มต้น

    // ตรวจสอบค่า BMI และกำหนดข้อความตอบกลับตามผลลัพธ์
    if (bmi < 18.5) {
      result = "คุณผอมไป กินข้าวบ้างนะ";
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      result = "คุณหุ่นดีจุงเบย";
    } else if (bmi >= 23 && bmi <= 24.9) {
      result = "คุณเริ่มจะท้วมแล้วนะ";
    } else if (bmi >= 25.8 && bmi <= 29.9) {
      result = "คุณอ้วนละ ออกกำลังกายหน่อยนะ";
    } else if (bmi > 30) {
      result = "คุณอ้วนเกินไปละ หาหมอเหอะ";
    }

    agent.add(result); // เพิ่มข้อความตอบกลับ
  }

  // ฟังก์ชันสำหรับคำนวณพื้นที่วงกลม
  function calculateCircle(agent) {
    const radius = agent.parameters.radius; // ดึงค่าพารามิเตอร์รัศมีจากการร้องขอ
    const area = Math.PI * Math.pow(radius, 2); // คำนวณพื้นที่วงกลม
    agent.add(
      `พื้นที่ของวงกลมที่มีรัศมี ${radius} คือ ${area.toFixed(2)} ตารางหน่วย`
    ); // เพิ่มข้อความตอบกลับ
  }

  // ฟังก์ชันสำหรับคำนวณพื้นที่สี่เหลี่ยม
  function calculateSquare(agent) {
    const width = agent.parameters.width; // ดึงค่าพารามิเตอร์ความกว้างจากการร้องขอ
    const length = agent.parameters.length; // ดึงค่าพารามิเตอร์ความยาวจากการร้องขอ
    const area = width * length; // คำนวณพื้นที่สี่เหลี่ยม
    agent.add(
      `พื้นที่ของสี่เหลี่ยมที่มีความกว้าง ${width} และความยาว ${length} คือ ${area} ตารางหน่วย`
    ); // เพิ่มข้อความตอบกลับ
  }

  // ฟังก์ชันสำหรับคำนวณพื้นที่สามเหลี่ยม
  function calculateTriangle(agent) {
    const base = agent.parameters.base; // ดึงค่าพารามิเตอร์ฐานจากการร้องขอ
    const height = agent.parameters.height; // ดึงค่าพารามิเตอร์ความสูงจากการร้องขอ
    const area = 0.5 * base * height; // คำนวณพื้นที่สามเหลี่ยม
    agent.add(
      `พื้นที่ของสามเหลี่ยมที่มีฐาน ${base} และสูง ${height} คือ ${area} ตารางหน่วย`
    ); // เพิ่มข้อความตอบกลับ
  }

  // สร้างแผนที่ (map) ของ intent กับฟังก์ชันที่จัดการ
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome); // จับคู่ "Default Welcome Intent" กับฟังก์ชัน welcome
  intentMap.set("Default Fallback Intent", fallback); // จับคู่ "Default Fallback Intent" กับฟังก์ชัน fallback
  intentMap.set("BMI - custom - yes", bodyMassIndex); // จับคู่ intent สำหรับคำนวณ BMI กับฟังก์ชัน bodyMassIndex
  intentMap.set("area - Square - custom - yes", calculateSquare); // จับคู่ intent สำหรับคำนวณพื้นที่สี่เหลี่ยมกับฟังก์ชัน calculateSquare
  intentMap.set("area - Circle - custom - yes", calculateCircle); // จับคู่ intent สำหรับคำนวณพื้นที่วงกลมกับฟังก์ชัน calculateCircle
  intentMap.set("area - Triangle - custom - yes", calculateTriangle); // จับคู่ intent สำหรับคำนวณพื้นที่สามเหลี่ยมกับฟังก์ชัน calculateTriangle

  agent.handleRequest(intentMap); // ให้ WebhookClient จัดการการร้องขอด้วย intent map
});

// เริ่มต้นเซิร์ฟเวอร์และฟังที่พอร์ตที่กำหนด
app.listen(port, () => {
  console.log("เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:" + port); // พิมพ์ข้อความแจ้งเตือนเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});

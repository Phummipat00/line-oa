const express = require("express");
const bodyparser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");
const port = 4000;

const app = express();
// ตั้งค่าเซิร์ฟเวอร์
app.use(bodyparser.json());

// เส้นทางหลัก
app.get("/", (req, res) => {
  res.send("<h1>hello king baldwin iv</h1>");
});

// เส้นทาง webhook
app.post("/webhook", (req, res) => {
  // สร้าง webhook client
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  function welcome(agent) {
    agent.add(`ยินดีต้อนรับสู่เอเจนต์ของฉัน!`);
  }

  function fallback(agent) {
    agent.add(`ฉันไม่เข้าใจ`);
    agent.add(`ขอโทษค่ะ คุณลองอีกครั้งได้ไหม?`);
  }

  function bodyMassIndex(agent) {
    let weight = agent.parameters.weight;
    let height = agent.parameters.height / 100;
    let bmi = (weight / (height * height)).toFixed(2);
    let result = "ขออภัย หนูไม่เข้าใจ";

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

    agent.add(result);
  }

  function calculateCircle(agent) {
    const radius = agent.parameters.radius;
    const area = Math.PI * Math.pow(radius, 2);
    agent.add(`พื้นที่ของวงกลมที่มีรัศมี ${radius} คือ ${area.toFixed(2)} ตารางหน่วย`);
  }

  function calculateSquare(agent) {
    const width = agent.parameters.width;
    const length = agent.parameters.length;
    const area = width * length;
    agent.add(`พื้นที่ของสี่เหลี่ยมที่มีความกว้าง ${width} และความยาว ${length} คือ ${area} ตารางหน่วย`);
  }

  function calculateTriangle(agent) {
    const base = agent.parameters.base;
    const height = agent.parameters.height;
    const area = 0.5 * base * height;
    agent.add(`พื้นที่ของสามเหลี่ยมที่มีฐาน ${base} และสูง ${height} คือ ${area} ตารางหน่วย`);
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);

  intentMap.set("BMI - custom - yes", bodyMassIndex);
  intentMap.set("area - Square - custom - yes", calculateSquare);
  intentMap.set("area - Circle - custom - yes", calculateCircle);
  intentMap.set("area - Triangle - custom - yes", calculateTriangle);

  agent.handleRequest(intentMap);
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log("เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:" + port);
});

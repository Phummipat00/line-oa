const express = require("express");
const bodyparser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
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
    //agent.add(`พื้นที่ของวงกลมที่มีรัศมี ${radius} คือ ${area.toFixed(2)} ตารางหน่วย`);
    let flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.trueplookpanya.com%2Fdhamma%2Fcontent%2F65401&psig=AOvVaw0uK0r2Q3kQjhL6zG-2-3lM&ust=1722406175772000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjujeaLzocDFQAAAAAdAAAAABAE",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "https://line.me/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: `พื้นที่ของวงกลมที่มีรัศมี ${radius} คือ ${area.toFixed(
                2
              )} ตารางหน่วย`,
              weight: "bold",
              size: "xl",
            },
          ],
        },
      },
    };
    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
  }

  function calculateSquare(agent) {
    const width = agent.parameters.width;
    const length = agent.parameters.length;
    const area = width * length;
    //agent.add(`พื้นที่ของสี่เหลี่ยมที่มีความกว้าง ${width} และความยาว ${length} คือ ${area} ตารางหน่วย`);
    let flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.trueplookpanya.com%2Fknowledge%2Fcontent%2F65401-scimat-sci-&psig=AOvVaw3DsrrttSmRCbaIpNBHv1yc&ust=1722406287735000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDQ15eMzocDFQAAAAAdAAAAABAE",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "https://line.me/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: `พื้นที่ของสี่เหลี่ยมที่มีความกว้าง ${width} และความยาว ${length} คือ ${area} ตารางหน่วย`,
              weight: "bold",
              size: "xl",
            },
          ],
        },
      },
    };
    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
  }

  function calculateTriangle(agent) {
    const base = agent.parameters.base;
    const height = agent.parameters.height;
    const area = 0.5 * base * height;
    //agent.add(`พื้นที่ของสามเหลี่ยมที่มีฐาน ${base} และสูง ${height} คือ ${area} ตารางหน่วย`);
    let flexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.trueplookpanya.com%2Fdhamma%2Fcontent%2F65401&psig=AOvVaw1QwkvlfNfyiGqeLvbc2z8B&ust=1722406374772000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOia_cCMzocDFQAAAAAdAAAAABAE",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "https://line.me/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: `พื้นที่ของสามเหลี่ยมที่มีฐาน ${base} และสูง ${height} คือ ${area} ตารางหน่วย`,
              weight: "bold",
              size: "xl",
            },
          ],
        },
      },
    };
    let payload = new Payload("LINE", flexMessage, { sendAsMessage: true });
    agent.add(payload);
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

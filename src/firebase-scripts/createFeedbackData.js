const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// 載入 service account JSON 檔案
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function createSampleData() {
  const batch = db.batch();

  for (let i = 1; i <= 3; i++) {
    const docRef = db.collection("feedback").doc(); // 自動產生 ID
    batch.set(docRef, {
      Class: db.doc("groupClass/G20250515Marimba"),
      Content: `Interesting feedback content ballalala ${i}`,
      Stars: Math.floor(Math.random() * 5) + 1,
      Student: db.doc("students/B987654321"), // 注意：如果你的欄位是 Students 而非 Student，請確認
    });
  }

  await batch.commit();
  console.log("✅ Sample data added successfully!");
}

createSampleData().catch((err) => {
  console.error("❌ 發生錯誤：", err);
});

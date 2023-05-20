const ACCESS_TOKEN = "set token";
const URL = "https://api.line.me/v2/bot/message/push";
const GROUP_ID = "set group id";

function getDayCount(date) {
  return Math.floor((date.getDate() - 1) / 7) + 1;
}

function notifyTheNightBefore() {
  let message = "";
  const date = new Date();

  date.setDate(date.getDate());
  const dayIndex = date.getDay();
  const day = ["日", "月", "火", "水", "木", "金", "土"][dayIndex];

  // 月曜日・木曜日 燃えるゴミ
  if (day === "日" || day === "水") {
    message = "明日は燃えるゴミの日だよ！準備しよう！";
  }

  // 水曜日 トレイなどのプラゴミ、段ボール
  if (day === "火") {
    message =
      "明日はペットボトルやトレイなどのプラゴミの日、そして段ボールなどの資源ゴミの日だよ！準備しよう！";
  }

  // 金曜日 ビン、缶、ペットボトル
  if (day === "木") {
    message = "明日はビン、缶、ペットボトルゴミの日だよ！準備しよう！";
  }

  // 2･4回目金曜日 アルミ缶、ガラス、金属などの燃えないゴミ
  const is2ndThur = day === "木" && getDayCount(date) == 2;
  const is4thThur = day === "木" && getDayCount(date) == 4;
  if (is2ndThur || is4thThur) {
    message =
      "明日はアルミ缶、ガラス、金属などの燃えないゴミの日だよ！準備は大丈夫そう？";
  }

  if (day !== "月" || day !== "金" || is2ndThur || is4thThur) {
    UrlFetchApp.fetch(URL, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      method: "POST",
      payload: JSON.stringify({
        to: GROUP_ID,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      }),
    });
  }
}

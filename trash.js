const ACCESS_TOKEN = "set token";
const URL = "https://api.line.me/v2/bot/message/push";
const GROUP_ID = "set group id";

const MESSAGE = {
  0: "明日は燃えるゴミの日だよ！準備しよう！",
  1: "",
  2: "明日はトレイなどのプラゴミの日、そして段ボールなどの資源ゴミの日だよ！準備しよう！",
  3: "明日は燃えるゴミの日だよ！準備しよう！",
  4: "明日はビン、缶、ペットボトルゴミの日だよ！準備しよう！",
  5: "",
  6: "",
  7: "明日はガラス、金属、硬いプラスチックなどの燃えないゴミの日だよ！準備は大丈夫そう？",
};
const emptyKeys = Object.keys(MESSAGE).filter((key) => MESSAGE[key] === "");

function getDayCount(date) {
  return Math.floor((date.getDate() - 1) / 7) + 1;
}

function notifyTheNightBefore() {
  const date = new Date();
  const dayOfTheWeek = date.getDay();
  let isNonBurnableDay =
    dayOfTheWeek === 4 && [2, 4].includes(getDayCount(date));
  const nonBurnableText = isNonBurnableDay ? `\n${MESSAGE[7]}` : "";
  const message = `${MESSAGE[dayOfTheWeek]}${nonBurnableText}`;

  if (message) {
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

const ACCESS_TOKEN = "set token";
const URL = "https://api.line.me/v2/bot/message/push";
const GROUP_ID = "set group id";
const MESSAGE = {
  5: {
    21: "今日は結婚記念日だよ！ お祝いしよう!",
    20: "明日は結婚記念日だよ！",
    18: "3日後は結婚記念日だよ!",
    14: "1週間後は結婚記念日だよ!",
  },
  3: {
    14: "今日はホワイトデーだよ！",
    13: "明日はホワイトデーだよ！",
    11: "3日後はホワイトデーだよ!",
    7: "1週間後はホワイトデーだよ!",
  },
};

function notifyAnniversary() {
  const currentDate = new Date();
  const weddingMonth = 5;
  const weddingDay = 21;
  const whiteMonth = 3;
  const whiteDay = 14;

  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const isWedding =
    currentMonth === weddingMonth &&
    [weddingDay, weddingDay - 1, weddingDay - 3, weddingDay - 7].includes(
      currentDay
    );
  const isWhite =
    currentMonth === whiteMonth &&
    [whiteDay, whiteDay - 1, whiteDay - 3, whiteDay - 7].includes(currentDay);

  if (isWedding || isWhite) {
    UrlFetchApp.fetch(URL, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      method: "POST",
      payload: JSON.stringify({
        to: GROUP_ID,
        messages: [
          {
            type: "text",
            text: MESSAGE[String(currentMonth)][String(currentDay)],
          },
        ],
      }),
    });
  }
}

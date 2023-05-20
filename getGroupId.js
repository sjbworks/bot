const ACCESS_TOKEN = "set token";

function doPost(e) {
  let json = JSON.parse(e.postData.contents);
  let userId = json.events[0].source.userId;
  let groupId = json.events[0].source.groupId;

  const spst = SpreadsheetApp.openById(
    "set spread sheet id(url path)"
  ).getSheetByName("set sheet name");
  let row = spst.getLastRow();

  spst.getRange(row + 1, 1).setValue(getUserName(userId));
  spst.getRange(row + 1, 2).setValue(groupId);
}

function getUserName(userId) {
  const url = "https://api.line.me/v2/bot/profile/" + userId;
  const response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  });
  return JSON.parse(response.getContentText()).displayName;
}

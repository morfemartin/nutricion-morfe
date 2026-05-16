const SPREADSHEET_ID = "1B7z1BACnBpCSHNFcJloQ7UmGdzWxxilCE3bXlx-FtuE";

const SHEETS = {
  legacy: {
    name: "Registros",
    headers: ["id", "person", "date", "weight", "waist", "steps", "notes", "createdAt"]
  },
  body: {
    name: "Body_Log",
    headers: ["id", "person", "date", "weight", "waist", "shoulders", "chest", "hip", "arm", "forearm", "neck", "leg", "steps", "notes", "createdAt"]
  },
  meals: {
    name: "Meal_Log",
    headers: ["id", "person", "date", "meal", "planned_food", "eaten_food", "calories", "protein", "status", "notes", "createdAt"]
  },
  workouts: {
    name: "Workout_Log",
    headers: ["id", "person", "date", "day", "module", "routineTitle", "exerciseId", "exercise", "tracking", "weight", "reps", "duration", "distance", "intensity", "notes", "createdAt"]
  }
};

function doGet(e) {
  const action = e.parameter.action || "listLogs";
  if (action === "listLogs") return jsonResponse({ ok: true, ...getAllLogs() });
  if (action === "list") return jsonResponse({ ok: true, logs: getLegacyLogs() });
  return jsonResponse({ ok: false, error: "Accion no valida" });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const action = body.action;
    if (action === "addBodyLog") {
      appendByHeaders(SHEETS.body, body.entry || {});
      return jsonResponse({ ok: true });
    }
    if (action === "addMealLog") {
      appendByHeaders(SHEETS.meals, body.entry || {});
      return jsonResponse({ ok: true });
    }
    if (action === "addWorkoutLog") {
      appendByHeaders(SHEETS.workouts, body.entry || {});
      return jsonResponse({ ok: true });
    }
    if (action === "deleteLog") {
      deleteEntryEverywhere(body.id);
      return jsonResponse({ ok: true });
    }
    if (action === "add") {
      appendByHeaders(SHEETS.legacy, body.entry || {});
      return jsonResponse({ ok: true });
    }
    if (action === "delete") {
      deleteEntry(SHEETS.legacy, body.id);
      return jsonResponse({ ok: true });
    }
    return jsonResponse({ ok: false, error: "Accion no valida" });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getOrCreateSheet(config) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) sheet = ss.insertSheet(config.name);
  const firstRow = sheet.getRange(1, 1, 1, config.headers.length).getValues()[0];
  const hasHeaders = firstRow.some(Boolean);
  if (!hasHeaders) sheet.getRange(1, 1, 1, config.headers.length).setValues([config.headers]);
  return sheet;
}

function appendByHeaders(config, entry) {
  const sheet = getOrCreateSheet(config);
  sheet.appendRow(config.headers.map((key) => entry[key] || ""));
}

function rowsByHeaders(config) {
  const sheet = getOrCreateSheet(config);
  const values = sheet.getDataRange().getValues();
  return values.slice(1).filter((row) => row.some(Boolean)).map((row) => {
    const entry = {};
    config.headers.forEach((key, index) => entry[key] = row[index]);
    return entry;
  });
}

function groupByPerson(rows) {
  const result = { martin: [], mama: [] };
  rows.forEach((entry) => {
    if (entry.person === "martin") result.martin.push(entry);
    if (entry.person === "mama") result.mama.push(entry);
  });
  return result;
}

function getAllLogs() {
  return {
    body: groupByPerson(rowsByHeaders(SHEETS.body)),
    meals: groupByPerson(rowsByHeaders(SHEETS.meals)),
    workouts: groupByPerson(rowsByHeaders(SHEETS.workouts))
  };
}

function getLegacyLogs() {
  return groupByPerson(rowsByHeaders(SHEETS.legacy));
}

function deleteEntryEverywhere(id) {
  deleteEntry(SHEETS.body, id);
  deleteEntry(SHEETS.meals, id);
  deleteEntry(SHEETS.workouts, id);
  deleteEntry(SHEETS.legacy, id);
}

function deleteEntry(config, id) {
  if (!id) return;
  const sheet = getOrCreateSheet(config);
  const values = sheet.getDataRange().getValues();
  for (let i = values.length - 1; i >= 1; i--) {
    if (String(values[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return;
    }
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

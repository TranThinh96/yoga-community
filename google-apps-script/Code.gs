/**
 * Google Apps Script – nhận đăng ký workshop từ website.
 *  1. Ghi một dòng vào trang tính "Đăng ký".
 *  2. Gửi email xác nhận (kèm file .ics) từ Gmail của chủ Google Sheet.
 *
 * Cài đặt: xem docs/huong-dan-google-sheets.md
 * Thuộc tính tập lệnh (Project Settings → Script properties):
 *   SECRET        – chuỗi bí mật, trùng với GOOGLE_SCRIPT_SECRET trên Vercel (bắt buộc)
 *   NOTIFY_EMAIL  – email nhận thông báo khi có người đăng ký (không bắt buộc)
 */

var SHEET_NAME = 'Đăng ký';
var HEADERS = ['Thời điểm đăng ký', 'Mã workshop', 'Workshop', 'Ngày giờ', 'Giáo viên', 'Hình thức',
  'Họ tên', 'Email', 'Số điện thoại', 'Ghi chú', 'Trạng thái email'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    if (!props.getProperty('SECRET') || body.secret !== props.getProperty('SECRET')) {
      return json({ ok: false, error: 'unauthorized' });
    }
    var r = body.registration;
    var mail = body.email;

    lock.waitLock(20000);
    var sheet = getSheet();

    // Kiểm tra số lượng (nếu workshop có giới hạn)
    if (r.capacity > 0) {
      var last = sheet.getLastRow();
      var slugs = last > 1 ? sheet.getRange(2, 2, last - 1, 1).getValues() : [];
      var count = slugs.filter(function (row) { return row[0] === r.workshopSlug; }).length;
      if (count >= r.capacity) return json({ ok: false, error: 'full' });
    }

    sheet.appendRow([new Date(), r.workshopSlug, r.workshopTitle, r.workshopStart, r.teacher, r.format,
      r.name, r.email, "'" + r.phone, r.note, 'Đang gửi…']);
    var rowIndex = sheet.getLastRow();
    SpreadsheetApp.flush();
    lock.releaseLock();

    var status = 'Đã gửi';
    try {
      MailApp.sendEmail({
        to: mail.to,
        subject: mail.subject,
        htmlBody: mail.htmlBody,
        name: mail.senderName,
        attachments: [Utilities.newBlob(mail.ics, 'text/calendar', mail.icsFileName)],
      });
    } catch (err) {
      status = 'Lỗi: ' + err;
    }
    sheet.getRange(rowIndex, HEADERS.length).setValue(status);

    var notify = props.getProperty('NOTIFY_EMAIL');
    if (notify) {
      try {
        MailApp.sendEmail(notify, '[Đăng ký mới] ' + r.workshopTitle,
          r.name + ' – ' + r.email + ' – ' + r.phone + (r.note ? '\nGhi chú: ' + r.note : ''));
      } catch (err) { /* bỏ qua */ }
    }
    return json({ ok: true, emailStatus: status });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) { /* đã nhả */ }
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Chạy hàm này một lần trong trình soạn thảo để cấp quyền Gmail + Sheets. */
function capQuyen() {
  getSheet();
  Logger.log('Email còn có thể gửi hôm nay: ' + MailApp.getRemainingDailyQuota());
}

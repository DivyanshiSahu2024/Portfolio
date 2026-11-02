/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: CONTACT FORM & CV DOWNLOAD EMAIL VERIFICATION + TRACKING
 * ==============================================================================
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet linked to the portfolio.
 * 2. Click "Extensions" > "Apps Script".
 * 3. Replace all existing code in Code.gs with this entire script.
 * 4. Click "Deploy" > "Manage deployments" > Edit (pencil icon) > New version > "Deploy".
 *    (Ensure access is set to "Anyone").
 * 
 * Features:
/**
 * ONE-TIME SETUP INSTRUCTION TO FIX PERMISSION ERROR:
 * Google requires you to grant email permission once from inside the editor.
 * 
 * How to authorize (takes 30 seconds):
 * 1. In the Apps Script toolbar at the top, change the function dropdown from "doPost" to "authorizeScript".
 * 2. Click the "Run" button (▶ Run).
 * 3. An "Authorization required" popup will appear. Click "Review Permissions".
 * 4. Select your Google account.
 * 5. Click "Advanced" (small link at bottom left of the modal).
 * 6. Click "Go to Untitled project (unsafe)" (or your project name).
 * 7. Click "Allow".
 * 8. You will receive a confirmation test email!
 * 9. Finally, deploy the update:
 *    Click "Deploy" > "Manage deployments" > Pencil icon (Edit) > Version: "New version" > Click "Deploy".
 */
function authorizeScript() {
  const userEmail = Session.getActiveUser().getEmail();
  MailApp.sendEmail({
    to: userEmail,
    subject: "✅ Portfolio Script Authorization Complete!",
    body: "Hi Divyanshi,\n\nYour Google Apps Script is now successfully authorized to send verification codes for CV downloads and receive contact messages.\n\nBest,\nYour Portfolio System"
  });
  Logger.log("Authorization successful! Test email sent to: " + userEmail);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // Wait up to 10s to prevent concurrent write collisions

  try {
    const params = e.parameter || {};
    const action = params.action;

    // ==========================================================================
    // ACTION 1: Generate & Email 6-Digit Verification Code for CV Download
    // ==========================================================================
    if (action === 'request_cv_otp') {
      const email = (params.email || '').trim().toLowerCase();
      const name = (params.name || '').trim();

      if (!email || !name) {
        return createJsonResponse({ status: 'error', message: 'Name and email are required.' });
      }

      // Generate secure 6-digit random code
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store in Script Cache for 10 minutes (600 seconds)
      const cache = CacheService.getScriptCache();
      cache.put('cv_otp_' + email, otp, 600);
      cache.put('cv_name_' + email, name, 600);

      // Send branded verification email
      const subject = "Your Verification Code to Download Divyanshi Sahu's CV";
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 25px; border: 1px solid #e8e8e8; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #e4003a; margin: 0; font-size: 22px;">Divyanshi Sahu</h2>
            <p style="color: #666; font-size: 13px; margin: 4px 0 0;">Amazon Future Engineer Scholar | Software Engineer</p>
          </div>
          
          <p style="color: #333; font-size: 15px;">Hi <strong>${name}</strong>,</p>
          <p style="color: #555; font-size: 14px; line-height: 1.5;">
            Thank you for your interest in my background! Please use the 6-digit verification code below to download my CV:
          </p>

          <div style="text-align: center; margin: 25px 0;">
            <div style="display: inline-block; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #111; background-color: #f7f7f8; border: 1px dashed #e4003a; padding: 14px 28px; border-radius: 8px;">
              ${otp}
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 8px;">This code will expire in 10 minutes.</p>
          </div>

          <p style="color: #666; font-size: 13px; line-height: 1.5;">
            If you did not request this verification code, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 11px; text-align: center;">
            Portfolio: <a href="https://divyanshisahu2024.github.io/Portfolio/" style="color: #e4003a; text-decoration: none;">divyanshisahu2024.github.io/Portfolio</a>
          </p>
        </div>
      `;

      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody
      });

      return createJsonResponse({ status: 'success', message: 'Verification code sent.' });
    }

    // ==========================================================================
    // ACTION 2: Verify OTP & Record Verified Download to Google Sheet
    // ==========================================================================
    if (action === 'verify_cv_otp') {
      const email = (params.email || '').trim().toLowerCase();
      const enteredOtp = (params.otp || '').trim();

      const cache = CacheService.getScriptCache();
      const cachedOtp = cache.get('cv_otp_' + email);
      const name = cache.get('cv_name_' + email) || params.name || 'Unknown';

      if (!cachedOtp) {
        return createJsonResponse({
          status: 'error',
          message: 'Verification code expired or not found. Please click "Resend Code".'
        });
      }

      if (cachedOtp !== enteredOtp) {
        return createJsonResponse({
          status: 'error',
          message: 'Incorrect verification code. Please check your email and try again.'
        });
      }

      // Valid OTP! Clear cache entry to prevent reuse
      cache.remove('cv_otp_' + email);

      // Access or create the "CV_Downloads" tab in your Google Sheet
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = spreadsheet.getSheetByName('CV_Downloads');

      if (!sheet) {
        sheet = spreadsheet.insertSheet('CV_Downloads');
        sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Verification Status']);
        sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#f3f3f3');
      }

      const timestamp = new Date();
      sheet.appendRow([timestamp, name, email, 'Verified & Downloaded']);

      // Send real-time notification alert to Divyanshi
      try {
        MailApp.sendEmail({
          to: 'divyanshisahuds@gmail.com',
          subject: '📄 [Portfolio Alert] CV Downloaded by ' + name,
          body: `Hi Divyanshi,\n\nA new verified user has downloaded your CV!\n\nName: ${name}\nEmail: ${email}\nDate & Time: ${timestamp.toLocaleString()}\n\nBest,\nYour Portfolio Notification System`
        });
      } catch (mailErr) {
        // Logging error should not prevent user download
      }

      return createJsonResponse({
        status: 'success',
        verified: true,
        message: 'Email successfully verified!'
      });
    }

    // ==========================================================================
    // DEFAULT ACTION: Contact Form Message Submission
    // ==========================================================================
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let contactSheet = spreadsheet.getSheetByName('Contact_Messages') || spreadsheet.getSheets()[0];

    if (contactSheet.getLastRow() === 0) {
      contactSheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
      contactSheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#f3f3f3');
    }

    const timestamp = new Date();
    const name = params.Name || params.name || '';
    const email = params.Email || params.email || '';
    const message = params.Message || params.message || '';

    contactSheet.appendRow([timestamp, name, email, message]);

    return createJsonResponse({
      status: 'success',
      message: 'Message sent successfully!'
    });

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function createJsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";


export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await req.json();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Inter',Arial,sans-serif;color:#09090b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border:1px solid #e4e4e7;overflow:hidden;margin:0 auto;">

          <!-- Header -->
          <tr>
            <td style="background:#09090b;padding:36px 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#71717a;font-weight:600;font-family:'Inter',Arial,sans-serif;">New Enquiry</p>
                    <h1 style="margin:10px 0 0;font-size:32px;font-weight:300;font-style:italic;color:#ff0000;line-height:1;font-family:Georgia,'Times New Roman',serif;letter-spacing:-0.01em;">Resto<span style="font-weight:900;font-style:normal;color:#ffffff;font-family:'Inter',Arial,sans-serif;">Refine</span><span style="color:#ff0000;font-style:normal;font-weight:900;">.</span></h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Red accent bar -->
          <tr>
            <td style="background:#ff0000;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px 0;">
              <p style="margin:0;font-size:14px;color:#71717a;line-height:1.6;font-family:'Inter',Arial,sans-serif;">
                You've received a new enquiry from <strong style="color:#09090b;">${data.name}</strong>.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="background:#ffffff;padding:24px 40px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>

          <!-- Service Details -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px 0;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#a1a1aa;font-weight:600;font-family:'Inter',Arial,sans-serif;">
                <span style="color:#ff0000;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;letter-spacing:0;text-transform:none;font-weight:300;">01&nbsp;</span>Service Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Service</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.mainService}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Service Type</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.serviceType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Budget</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.budget}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Timeline</span>
                  </td>
                  <td style="padding:10px 0;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.timeline}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="background:#ffffff;padding:24px 40px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>

          <!-- Contact Details -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px 0;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#a1a1aa;font-weight:600;font-family:'Inter',Arial,sans-serif;">
                <span style="color:#ff0000;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;letter-spacing:0;text-transform:none;font-weight:300;">02&nbsp;</span>Contact
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Name</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Email</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;text-align:right;">
                    <a href="mailto:${data.email}" style="font-size:13px;font-weight:600;color:#ff0000;text-decoration:none;font-family:'Inter',Arial,sans-serif;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Phone</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:13px;color:#71717a;font-family:'Inter',Arial,sans-serif;">Company</span>
                  </td>
                  <td style="padding:10px 0;text-align:right;">
                    <span style="font-size:13px;font-weight:600;color:#09090b;font-family:'Inter',Arial,sans-serif;">${data.company}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          ${
            data.message
              ? `
          <tr><td style="background:#ffffff;padding:24px 40px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>
          <tr>
            <td style="background:#ffffff;padding:24px 40px 0;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#a1a1aa;font-weight:600;font-family:'Inter',Arial,sans-serif;">
                <span style="color:#ff0000;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;letter-spacing:0;text-transform:none;font-weight:300;">03&nbsp;</span>Message
              </p>
              <p style="margin:12px 0 0;font-size:14px;color:#3f3f46;line-height:1.7;white-space:pre-wrap;font-family:'Inter',Arial,sans-serif;">${data.message}</p>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Reply CTA -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#09090b;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;padding:14px 28px;letter-spacing:0.08em;text-transform:uppercase;font-family:'Inter',Arial,sans-serif;">Reply to ${data.name}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#09090b;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#52525b;font-family:'Inter',Arial,sans-serif;">Enquiry submitted via <span style="color:#a1a1aa;">restorefine.co.uk</span></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `New Enquiry — RestoRefine\n\nService: ${data.mainService}\nService Type: ${data.serviceType}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\nContact\n-------\nName:    ${data.name}\nEmail:   ${data.email}\nPhone:   ${data.phone}\nCompany: ${data.company}\n\nMessage:\n${data.message}`;

    const { data: emailData, error } = await resend.emails.send({
      from: `RestoRefine Enquiries <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: data.email,
      subject: `New Enquiry from ${data.name} — ${data.mainService}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to send email" }, { status: 500 });
  }
}

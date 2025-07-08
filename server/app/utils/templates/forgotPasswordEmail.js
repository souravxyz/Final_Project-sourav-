const forgotPasswordEmail = (name, resetLink) => {
  return `
    <div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 30px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      color: #333333;
    ">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4f46e5; margin: 0; font-size: 24px;">ServeHub</h1>
      </div>
      
      <h2 style="color: #111827; font-size: 20px; margin-bottom: 20px;">
        Password Reset Request
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
        Hi ${name || "User"},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        We received a request to reset your password. Click the button below to reset it:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" target="_blank" style="
          background-color: #4f46e5;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          font-size: 16px;
        ">
          Reset Your Password
        </a>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
        This link will expire in 15 minutes. If you did not request a reset, you can safely ignore this email.
      </p>
      
      <div style="
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
        color: #6b7280;
        font-size: 14px;
      ">
        <p style="margin: 0;">Thanks,</p>
        <p style="margin: 5px 0 0; font-weight: 600;">The ServeHub Team</p>
      </div>
    </div>
  `;
};

export default forgotPasswordEmail;

// utils/templates/welcomeEmail.js
const welcomeEmail = (name) => `
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
      Welcome to ServeHub, ${name || 'there'}!
    </h2>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
      We're excited to have you on board as a valued ${name ? 'member' : 'user'}.
    </p>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
      Explore providers, book services, or join as one today.
    </p>
    
    <div style="
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    ">
      <p style="margin: 0;">Cheers,</p>
      <p style="margin: 5px 0 0; font-weight: 600;">The ServeHub Team</p>
    </div>
  </div>
`;

export default welcomeEmail;

// utils/templates/reviewNotificationEmail.js


// utils/templates/forgotPasswordEmail.js



// utils/templates/bookingEmails.js

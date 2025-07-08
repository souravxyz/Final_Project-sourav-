export const reviewNotificationEmail = ({
  providerName,
  customerName,
  rating,
  comment,
}) => `
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
      Hello ${providerName},
    </h2>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
      <strong>${customerName}</strong> has ${comment ? "left a review" : "given a rating"} for your service.
    </p>
    
    <div style="
      background: #f9fafb;
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 25px;
    ">
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;">
          <strong style="color: #111827;">Rating:</strong> 
          ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)
        </li>
        ${comment ? `
          <li style="margin-bottom: 8px;">
            <strong style="color: #111827;">Comment:</strong> 
            <div style="font-style: italic; margin-top: 5px;">${comment}</div>
          </li>
        ` : ""}
      </ul>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
      Keep up the good work!
    </p>
    
    <div style="
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    ">
      <p style="margin: 0;">Best regards,</p>
      <p style="margin: 5px 0 0; font-weight: 600;">The ServeHub Team</p>
    </div>
  </div>
`;
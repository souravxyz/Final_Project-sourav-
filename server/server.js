import app from "./app.js";
import connectDB from "./app/configs/db.js";

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 6900;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

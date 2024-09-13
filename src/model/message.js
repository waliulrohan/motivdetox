import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
    parts: [
      {
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.message || mongoose.model("message", messageSchema);
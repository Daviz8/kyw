import { Schema, models, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    image: { type: String, default: "" },
    googleId: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
  },
  { timestamps: true }
);

const SessionRequestSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "KYWUser", index: true },

    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, default: "" },
    gender: { type: String, default: "" },

    emergencyName: { type: String, default: "" },
    emergencyPhone: { type: String, default: "" },
    emergencyRelationship: { type: String, default: "" },

    supportType: {
      type: String,
      enum: [
        "depression",
        "anxiety",
        "addiction",
        "relationship",
        "child_psychology",
        "stress",
        "grief",
        "trauma",
        "other",
      ],
      required: true,
      index: true,
    },

    clientCategory: {
      type: String,
      enum: ["adult", "child", "teen", "couple", "family"],
      default: "adult",
      index: true,
    },

    mainConcern: { type: String, required: true },
    previousCounselling: { type: String, enum: ["yes", "no"], default: "no" },
    medication: { type: String, enum: ["yes", "no"], default: "no" },
    riskConcern: { type: String, enum: ["yes", "no"], default: "no" },

    preferredSession: {
      type: String,
      enum: ["online", "physical", "either"],
      default: "online",
    },

    plan: {
      type: String,
      enum: ["basic", "premium"],
      default: "basic",
    },

    amount: { type: Number, default: 50750 },

    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "scheduled", "closed"],
      default: "new",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
      index: true,
    },

    paystackReference: { type: String, default: "", index: true },
    paidAt: Date,

    consent: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const UserModel =
  models.KYWUser || model("KYWUser", UserSchema);

export const SessionRequestModel =
  models.KYWSessionRequest ||
  model("KYWSessionRequest", SessionRequestSchema);
/**
 * User Mongoose Schema
 * MongoDB schema definition for User entity
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 255,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      maxlength: 255,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);


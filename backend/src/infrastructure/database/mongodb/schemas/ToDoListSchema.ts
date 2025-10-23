/**
 * ToDoList Mongoose Schema
 * MongoDB schema definition for ToDoList entity
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IToDoListDocument extends Document {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ToDoListSchema = new Schema<IToDoListDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    collection: 'todo_lists',
  }
);

// Index for faster user queries
ToDoListSchema.index({ userId: 1, createdAt: -1 });

export const ToDoListModel = mongoose.model<IToDoListDocument>('ToDoList', ToDoListSchema);


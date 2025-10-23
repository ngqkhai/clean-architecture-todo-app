/**
 * ToDoItem Mongoose Schema
 * MongoDB schema definition for ToDoItem entity
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IToDoItemDocument extends Document {
  id: string;
  listId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  startDate: Date | null;
  deadlineDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ToDoItemSchema = new Schema<IToDoItemDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    listId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    description: {
      type: String,
      default: null,
      maxlength: 1000,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
    deadlineDate: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'todo_items',
  }
);

// Custom validation for date range
ToDoItemSchema.pre('save', function (next) {
  if (this.startDate && this.deadlineDate && this.deadlineDate < this.startDate) {
    next(new Error('Deadline date must be after or equal to start date'));
  } else {
    next();
  }
});

// Index for faster list queries
ToDoItemSchema.index({ listId: 1, createdAt: 1 });

export const ToDoItemModel = mongoose.model<IToDoItemDocument>('ToDoItem', ToDoItemSchema);


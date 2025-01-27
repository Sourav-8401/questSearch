import mongoose, { Schema } from "mongoose";

const blockSchema = new Schema({
  text: {
    type: String,
  },
  showInOption: {
    type: Boolean,
  },
  isAnswer: {
    type: Boolean,
  },
});

const optionSchema = new Schema({
  text: {
    type: String,
  },
  isCorrectAnswer: {
    type: Boolean,
  },
});

const questionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ["ANAGRAM", "MCQ", "READ_ALONG", "CONTENT_ONLY", "CONVERSATION"],
    required: true,
  },
  anagramType: {
    type: String,
    enum: ["SENTENCE", "WORD"],
    required: function () {
      return this.type === "ANAGRAM";
    },
  },
  blocks: {
    type: [blockSchema],
    required: function () {
      return this.type === "ANAGRAM";
    },
  },
  options: {
    type: [optionSchema],
    required: function () {
      return this.type === "MCQ";
    },
  },
  siblingId: { type: mongoose.Schema.Types.ObjectId },
  solution: {
    type: String,
  },
  title: { type: String, required: true },
});

export const Question = mongoose.model("Question", questionSchema);
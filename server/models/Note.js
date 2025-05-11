import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Note = mongoose.model("Note", NoteSchema);
export default Note;

import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    exam_name : {
        type : String,
        required: true,
    },
});

const Exam = mongoose.model('Exam',examSchema);
export default Exam;
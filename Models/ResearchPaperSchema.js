const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Teacher=require("./TeacherSchema");
const resPaperSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"Teacher"
    },
    citedBy:{
        type:Number,
        required:true,
        default:0
    },
})

module.exports=mongoose.model("ResearchPaper",resPaperSchema);
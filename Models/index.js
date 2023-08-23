const { DepartmentSchema } = require("./DepartmentSchema")
const { TeacherSchema } = require("./TeacherSchema")
const { EventSchema } = require("./EventSchema")
const { QualificaitonSchema } = require("./QualificatonSchema")
const mongoose = require("mongoose")


exports.DepartmentModal = mongoose.model("Department", DepartmentSchema)
exports.TeacherModal = mongoose.model("Teacher", TeacherSchema)
exports.EventModal = mongoose.model("Event", EventSchema)
exports.QualificationModal = mongoose.model("Qualification", QualificaitonSchema)
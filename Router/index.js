const express = require("express")
const TeacherRouter = require("./TeacherRouter")
const DepartmentRouter = require("./DepartmentRouter")
const AuthRouter = require("./AuthRouter")
const EventRouter = require("./EventRouter")
const QualificatoinRouter = require("./QualificationRouter")

const Router = express.Router()
Router.use("/api/teacher", TeacherRouter)
Router.use("/api/department", DepartmentRouter)
Router.use("/api/auth", AuthRouter)
Router.use("/api/event", EventRouter)
Router.use("/api/qualification", QualificatoinRouter)


module.exports = Router
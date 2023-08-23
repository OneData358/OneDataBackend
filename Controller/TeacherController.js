const { TeacherModal } = require("../Models")
const { RouterAsncErrorHandler } = require("../Midleware/ErrorHandlerMiddleware")
const mongoose = require("mongoose")
const { NotFoundError ,CredentialError} = require("../Utility/CustomErrors")
const fs = require("fs-extra")

exports.registerTeacher = RouterAsncErrorHandler(async (req, res, next) => {
    const { name, employeeId, password, email } = req.body
    const teacher = await TeacherModal.create({ name, employeeId, password, email })
    if (!teacher) throw new Error()
    res.json({ id: teacher.id })
})

exports.deleteTeacher = RouterAsncErrorHandler(async (req, res, next) => {
    res.json({ success: true })
})

exports.updateTeacher = RouterAsncErrorHandler(async (req, res, next) => {
    res.json({ success: true })
})


exports.getTeacherInfoById = RouterAsncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const teacher = await TeacherModal.findById(id).select(["-password"]).populate({
        path: "department",
        select: ["name", "id"]
    }).populate({
        path: "qualification",
    })
    if (!teacher) throw new NotFoundError(id, "teacher")
    res.json(teacher)
})

exports.getTeachersData = RouterAsncErrorHandler(async (req, res, next) => {
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 0

    const skip =
        Number(req.query.page) ? (Number(req.query.page) - 1) * limit : 0

    const teachers = await TeacherModal.find().skip(skip).limit(limit).select(["-qualification", "-password"]).populate({
        path: "department", select: ["name", "id"]
    })
    if (!teachers || teachers.length === 0) throw new NotFoundError("teacher data ", "teacher")
    res.json(teachers)
})

exports.toggelAccountActivation = RouterAsncErrorHandler(async (req, res, next) => {
    const { teacherId, option } = req.body
    const teacher = await TeacherModal.findById(teacherId)
    if (!teacher) throw new NotFoundError("teacher data ", "teacher")
    teacher.active = option
    await teacher.save()
    res.json({ success: true })
})

exports.addFileData = RouterAsncErrorHandler(async (req, res, next) => {
    const teacherId = req.headers?.teacherid
    if (!mongoose.isValidObjectId(teacherId)) throw new CredentialError(teacherId, "teacherId")
    const teacher = await TeacherModal.findById(teacherId)
    if (!teacher) throw new NotFoundError(teacherId, "teacher")
    req.fileData = {
        path: `./file/teacher/${teacher.name}_${teacher.id}`,
        fileName: `${teacher.name}_${teacher.id}`
    }
    await fs.remove(req.fileData.path)
    req.teacher = teacher
    return next()
})


exports.uploadImage = RouterAsncErrorHandler(async (req, res, next) => {
    const file = req.file
    req.teacher.photo_url = `${file.destination}/${file.filename}`
    await req.teacher.save()
    res.json({ success: true })
})
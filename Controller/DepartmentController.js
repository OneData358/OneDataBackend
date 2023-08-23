const { RouterAsncErrorHandler } = require("../Midleware/ErrorHandlerMiddleware")
const { DepartmentModal, TeacherModal } = require("../Models")
const { NotFoundError } = require("../Utility/CustomErrors")
const { default: mongoose } = require("mongoose")


const removeHodDepartmentRelation = async (department) => {
    const teacher = department.HOD
    if (teacher) {
        const teacherUpdate = await TeacherModal.findById(teacher)
        await department.updateOne({ $unset: { HOD: 1 } })
        await teacherUpdate.updateOne({ isHod: false })
    }
}


exports.registerDepartment = RouterAsncErrorHandler(async (req, res, next) => {
    const { name } = req.body
    const department = await DepartmentModal.create({ name: name.toUpperCase() })
    if (!department) throw new Error()
    res.json({ id: department.id })
})

exports.deleteDepartment = RouterAsncErrorHandler(async (req, res, next) => {

    res.json({ success: true })
})




exports.getDepartment = RouterAsncErrorHandler(async (req, res, next) => {
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 0
    const skip = Number(req.query.page) ? (Number(req.query.page) - 1) * limit : 0

    const department = await DepartmentModal.find().select(["-teachers"]).skip(skip).limit(limit).select(["-unVerifiedQualifications"]).populate({
        path: "HOD",
        select: ["id", "name"]

    })
    if (!department || department.length === 0) throw new NotFoundError("department data", "department")
    res.json(department)
})




exports.getDepartmentById = RouterAsncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const department = await DepartmentModal.findById(id).select(["-unVerifiedQualifications"]).populate({
        path: "teachers", select: ["name", "id"]
    }).populate({
        path: "HOD",
        select: ["id", "name"]

    })
    if (!department) throw new NotFoundError(id, "department")
    res.json(department)
})


exports.getTeachersByDepartmet = RouterAsncErrorHandler(async (req, res, next) => {
    const { departmentId } = req.body
    const department = await DepartmentModal.findById(departmentId).select(["teachers", "-_id"]).populate({
        path: "teachers",
        select: ["name", "id"]
    })
    if (!department) throw new NotFoundError(departmentId, "department")
    if (department.teachers.length === 0) throw new NotFoundError(departmentId, "teacher")
    res.json(department?.teachers)
})



exports.addTeacher = RouterAsncErrorHandler(async (req, res, next) => {
    const { teacherId, departmentId } = req.body
    const teacher = await TeacherModal.findById(teacherId)
    const department = await DepartmentModal.findById(departmentId)

    if (!teacher) throw new NotFoundError(teacherId, "teacherId")
    if (!department) throw new NotFoundError(departmentId, "departmentId")

    if (department.teachers.includes(teacher.id)) throw new DuplicateDataError(`${teacher.name}  in ${department.name} `, "addTeacher")

    teacher.department = department.id
    department.teachers.push(teacher.id)
    await department.save()
    await teacher.save()
    res.json({ success: true })
})

exports.removeTeacher = RouterAsncErrorHandler(async (req, res, next) => {
    const { teacherId, departmentId } = req.body
    const teacher = await TeacherModal.findById(teacherId)
    const department = await DepartmentModal.findById(departmentId)


    if (!teacher) throw new NotFoundError(teacherId, "teacherId")
    if (!department) throw new NotFoundError(departmentId, "departmentId")

    if (teacher.isHod) await removeHodDepartmentRelation(department)
    await teacher.updateOne({ $unset: { department: 1 } })
    await department.updateOne({ $pull: { teachers: teacher.id } })
    res.json({ success: true })
})

exports.addHod = RouterAsncErrorHandler(async (req, res, next) => {
    const { teacherId, departmentId } = req.body
    const teacher = await TeacherModal.findById(teacherId)
    const department = await DepartmentModal.findById(departmentId)

    if (!teacher) throw new NotFoundError(teacherId, "teacherId")
    if (!department) throw new NotFoundError(departmentId, "departmentId")

    if (!department.teachers.includes(teacher.id)) throw new Error() //change error here

    if (teacher.isHod) throw new Error("")
    if (!!department.HOD) await removeHodDepartmentRelation(department)

    teacher.isHod = true
    department.HOD = teacher.id
    await teacher.save()
    await department.save()
    res.json({ success: true })
})






exports.removeHod = RouterAsncErrorHandler(async (req, res, next) => {
    const { departmentId } = req.body
    const department = await DepartmentModal.findById(departmentId)
    if (!department) throw new NotFoundError(departmentId, "departmentId")
    await removeHodDepartmentRelation(department)
    res.json({ success: true })
})


exports.changeView = RouterAsncErrorHandler(async (req, res, next) => {
    const { teacherId } = req.body
    const user = await TeacherModal.findById(teacherId)
    if (!user) throw new NotFoundError(teacherId, "teacherId")
    user.view = !user.view
    await user.save()
    res.send({ success: true })
})

exports.getUnverifiedQualifications = RouterAsncErrorHandler(async (req, res, next) => {
    const { id: departmentId } = req.params
    const department = await DepartmentModal.findById(departmentId).select(["unVerifiedQualifications"]).populate({
        path: "unVerifiedQualifications",
        select: ["id", "teacher", "description"],
        populate: {
            path: "teacher",
            select: ["id", "name"]
        }
    })
    // console.log(department);
    if (!department || department.length === 0) throw new NotFoundError(departmentId, "departmentId")

    res.json(department?.unVerifiedQualifications)
})
// scheduler.js
const schedule = require('node-schedule');
const { fetchResearchPapers } = require('./GoogleScraper');
const Teacher = require('../models/Teacher');
const ResearchPaper = require("../Models/ResearchPaperSchema")

let lastProcessedTeacherIndex = 0; 
async function fetchPapersForTeacher(teacher) {
    if (teacher.googleScholarId) {
        const papers = await fetchResearchPapers(teacher.googleScholarId);

        for (const paper of papers) {
            const researchPaper = new ResearchPaper({
                title: paper.title,
                author: teacher._id,
                citedBy: paper.citedBy
            });

            await researchPaper.save();
            console.log(`Saved research paper: ${paper.title}`);
        }
    }
}

const dailyScheduler = schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const teachers = await Teacher.find();
        const maxTeachersPerDay = 3;

        for (let i = 0; i < maxTeachersPerDay; i++) {
            const teacherIndex = lastProcessedTeacherIndex % teachers.length;
            const teacher = teachers[teacherIndex];
            await fetchPapersForTeacher(teacher);
            lastProcessedTeacherIndex++;
        }

        if (lastProcessedTeacherIndex >= teachers.length) {
            lastProcessedTeacherIndex = 0; // Reset the index
            console.log('All teachers processed. Starting from the beginning.');
        }

        console.log('Daily fetching completed.');
    } catch (error) {
        console.error('Error during daily fetching:', error);
    }
});

console.log('Scheduler is running...');


module.exports=dailyScheduler;

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { CreateLessonDto } from "./dto/create-lesson.dto";
import { Lesson } from "./lesson.entity";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Lecturer } from "src/lecturers/lecturer.entity";
import { Learner } from "src/learners/learner.entity";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
    @InjectRepository(Learner)
    private learnerRepository: Repository<Learner>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createLesson(
    lessonDetails: CreateLessonDto,
    video: Express.Multer.File,
  ) {
    const { id, questions, title, description, lecturerId, learnerIds } =
      lessonDetails;

    this.eventEmitter.emit("user.video.upload", {
      lessonId: id,
      video,
    });

    const learners = await this.learnerRepository.find({
      where: { id: In(learnerIds) },
    });

    console.log("assigning learners: ", learners);

    const lecturer = await this.lecturerRepository.findOneBy({
      id: lecturerId,
    });

    // Create a new Lesson
    const newLesson = this.lessonRepository.create({
      id,
      title,
      lecturer,
      learners,
      createdAt: new Date(),
      releaseDate: new Date(),
      description,
    });

    const savedLesson = await this.lessonRepository.save(newLesson);
    // Process and save questions and answers
    const questionEntities = await Promise.all(
      questions.map(async ({ question, answers }) => {
        // Create answer entities
        const answerEntities = await Promise.all(
          answers.map(async ({ option, isCorrect }) => {
            return this.answerRepository.create({
              id: uuidv4(),
              option,
              isCorrect,
            });
          }),
        );

        // Save answers
        const savedAnswers = await this.answerRepository.save(answerEntities);

        // Create question entity with saved answers
        const questionEntity = this.questionRepository.create({
          id: uuidv4(),
          lesson: savedLesson,
          question,
          answers: savedAnswers,
        });

        return questionEntity;
      }),
    );

    // Save questions
    await this.questionRepository.save(questionEntities);
  }

  async getLearnersByLessonId(lessonId: string) {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ["learners"],
    });
    if (!lesson) throw new Error("Lesson not found");

    // Return all learners for this lesson
    return lesson.learners;
  }

  async getLecturerByLessonId(lessonId: string) {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ["lecturer"], // Include lecturer in the result
    });
    if (!lesson) throw new Error("Lesson not found");

    return lesson.lecturer; // Return the lecturer for this lesson
  }

  async getLessonsByLecturerId(lecturerId: string) {
    const lessons = await this.lessonRepository.find({
      where: { lecturer: { id: lecturerId } },
      relations: ["lecturer"],
    });

    if (!lessons.length) {
      throw new Error("No lessons found for this lecturer");
    }

    return lessons;
  }

  async getLessonsByLearnerId(learnerId: string) {
    const lessons = await this.lessonRepository.find({
      where: { learners: { id: learnerId } },
      relations: ["learners"],
    });

    if (!lessons.length) {
      throw new Error("No lessons found for this learner");
    }

    return lessons;
  }

  getAll() {
    return this.lessonRepository.find({
      relations: ["questions"],
      relationLoadStrategy: "join",
    });
  }

  async findLessonById(id: string) {
    console.log("id: ", id);
    return await this.lessonRepository.findOne({
      where: { id },
      relations: ["questions", "questions.answers"],
    });
  }

  updateById() {}

  deleteLesson(id: string) {
    return this.lessonRepository.delete({ id });
  }
}

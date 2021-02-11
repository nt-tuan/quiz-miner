import { getExam, reviewExam, saveExam, submitTest } from "./exam.ts";
import * as log from "https://deno.land/std@0.86.0/log/mod.ts";
const logger = log.getLogger();
try {
  const exam = await getExam(65);
  const saveResponse = await saveExam(exam);
  const textSaveResponse = await saveResponse.text();
  const submitResponse = await submitTest(exam);
  const questions = await reviewExam(exam.attemptId);
  exam.questions = questions;
} catch (e) {
  logger.error(e);
}

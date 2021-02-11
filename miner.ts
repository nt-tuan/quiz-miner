import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { firstChild } from "./helper.ts";
import { sleepRandomAmountOfSeconds } from "https://deno.land/x/sleep/mod.ts";
import { getExam, reviewExam, saveExam, submitTest } from "./exam.ts";
import { Exam } from "./model.ts";

const getExams = async (start: number, end: number) => {
  const exams: Exam[] = [];
  const errorExams: number[] = [];
  for (let i = start; i <= end; i++) {
    try {
      const exam = await getExam(i);
      const saveResponse = await saveExam(exam);
      const textSaveResponse = await saveResponse.text();
      const submitResponse = await submitTest(exam);
      const questions = await reviewExam(exam.attemptId);
      exam.questions = questions;
      exams.push(exam);
      console.log(`Exam ${i} done!`);
    } catch (e) {
      if (e.message != "not-a-test-page") {
        errorExams.push(i);
      }
      console.log(`Exam ${i} failed: ${e.message}`);
    }
    await sleepRandomAmountOfSeconds(0.5, 1);
  }
  return { exams, errorExams };
};

const main = async () => {
  const max = 40000;
  const chuckSize = 100;
  let index = 1;

  while (index < max) {
    console.log(`chuck ${index} - ${index + chuckSize}`);
    const { exams, errorExams } = await getExams(index, index + chuckSize);
    const text = JSON.stringify(exams);
    await Deno.writeTextFile(
      `./exams_v2/exam${index}_${index + chuckSize}.json`,
      text,
    );
    if (errorExams.length > 0) {
      await Deno.writeTextFile(
        `./exams_v2/exam${index}_${index + chuckSize}_error.json`,
        JSON.stringify(errorExams),
      );
    }
    index += chuckSize;
  }
};

main();

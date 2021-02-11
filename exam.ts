import {
  Document,
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { min } from "https://deno.land/x/math@v1.1.0/mod.ts";
import { firstChild } from "./helper.ts";
import { Answer, Exam, Question } from "./model.ts";
const cookie =
  "G_AUTHUSER_H=0; MoodleSession=058tdiii5nk2ac8vuhqt1ktu53; time_join_home_new=1612690755272; _ga=GA1.2.277363659.1612690756; _hjid=770a99cb-d61c-4099-97f6-313c87a0d926; _fbp=fb.1.1612690756752.462675484; G_ENABLED_IDPS=google; __utmc=267732759; __utmz=267732759.1612690772.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __fss=9638125e71fa663ece59de001e35f13a; __fsu=e047509e7365211fd7bc6d4314c6ad47; rating-modal-undefined-undefined=1; ins-storage-version=1; G_AUTHUSER_H=0; MoodleSessionTest=Yyn1hzAfTt; homeFullname=Le+Minh+Luan; MOODLEID_=%ED%D8%0AY%B2s%E2X%B9%14%C1%21%EEU%D3m%80%D0n%2B; __hmrcid=54774837; _gid=GA1.2.228574911.1613029336; __utma=267732759.277363659.1612690756.1612731019.1613029337.5; _gat_clientTracker=1; __utmt=1; __utmb=267732759.3.10.1613029337";

export const saveExam = async (exam: Exam) => {
  const data = new URLSearchParams();
  data.append("q", exam.id.toString());
  data.append("attemptid", exam.attemptId);
  data.append("changepage", "false");
  data.append("page", "0");
  const minAmmount: number = exam.questions.length > 10
    ? exam.questions.length
    : 10;
  const questions = exam.questions.slice(0, minAmmount - 1);
  data.append("questionids", exam.questionsIds);
  // for (const question of questions) {
  //   data.append(`question_mistake[${question.id}]`, "");
  // }
  data.append("timeup", "0");
  data.append("finishattempt", "0");
  data.append("saveattempt", "0");
  data.append("skiptest", "0");
  data.append("scorm", "0");
  data.append("pause", "0");
  // data.append("course", "0");
  data.append(
    exam.questions[0].answers[0].name,
    exam.questions[0].answers[0].value,
  );

  return await fetch("https://hocmai.vn/phong-luyen/action/save-test.php", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua":
        '"Chromium";v="88", "Google Chrome";v="88", ";Not\\\\A\\"Brand";v="99"',
      "sec-ch-ua-mobile": "?1",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      cookie,
    },
    "referrer": "https://hocmai.vn/mod/quiz/nen-tang/attempt.php?q=293",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": data,
    "method": "POST",
    "mode": "cors",
    "credentials": "include",
  });
};

export const submitTest = async (exam: Exam) => {
  const data = new URLSearchParams();
  data.append("q", exam.id.toString());
  data.append("attemptid", exam.attemptId);
  data.append("changepage", "false");
  data.append("page", "0");
  const minAmmount: number = exam.questions.length > 10
    ? exam.questions.length
    : 10;
  const questions = exam.questions.slice(0, minAmmount - 1);
  data.append("questionids", exam.questionsIds);
  // for (const question of questions) {
  //   data.append(`question_mistake[${question.id}]`, "");
  // }
  data.append("timeup", "0");
  data.append("finishattempt", "1");
  data.append("saveattempt", "0");
  data.append("skiptest", "0");
  data.append("scorm", "0");
  data.append("pause", "0");
  data.append("course", "10");
  data.append(
    exam.questions[0].answers[0].name,
    exam.questions[0].answers[0].value,
  );
  return await fetch("https://hocmai.vn/mod/quiz/nen-tang/attempt.php", {
    "headers": {
      "accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Chromium";v="88", "Google Chrome";v="88", ";Not\\\\A\\"Brand";v="99"',
      "sec-ch-ua-mobile": "?1",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie,
    },
    "referrer": "https://hocmai.vn/mod/quiz/nen-tang/attempt.php?q=293",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": data,
    "method": "POST",
    "mode": "cors",
    "credentials": "include",
  });
};

export const getExam = async (id: number): Promise<Exam> => {
  const cookie =
    "G_AUTHUSER_H=0; MoodleSession=058tdiii5nk2ac8vuhqt1ktu53; time_join_home_new=1612690755272; _ga=GA1.2.277363659.1612690756; _gid=GA1.2.1279321167.1612690756; _hjid=770a99cb-d61c-4099-97f6-313c87a0d926; _fbp=fb.1.1612690756752.462675484; G_ENABLED_IDPS=google; __utmc=267732759; __utmz=267732759.1612690772.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __fss=9638125e71fa663ece59de001e35f13a; __fsu=e047509e7365211fd7bc6d4314c6ad47; rating-modal-undefined-undefined=1; ins-storage-version=1; G_AUTHUSER_H=0; MoodleSessionTest=Yyn1hzAfTt; __utma=267732759.277363659.1612690756.1612694394.1612725984.3; homeFullname=Le+Minh+Luan; MOODLEID_=%ED%D8%0AY%B2s%E2X%B9%14%C1%21%EEU%D3m%80%D0n%2B; __hmrcid=54774837; __utmb=267732759.7.10.1612725984";
  const headers = {
    Host: "hocmai.vn",
    Cookie: cookie,
    "user-agent":
      `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Mobile Safari/537.36`,
  };
  const response = await fetch(
    `https://hocmai.vn/mod/quiz/nen-tang/attempt.php?q=${id}`,
    {
      method: "GET",
      headers,
    },
  );

  const text = await response.text();
  if (response.status !== 200) {
    throw new Error(text);
  }
  const doc = new DOMParser().parseFromString(
    text,
    "text/html",
  )!;
  const testPage = doc.getElementsByClassName("test-page")[0];
  if (testPage == null) {
    throw new Error("not-a-test-page");
  }
  const titleDOM = firstChild(testPage, { className: "pr-a-title" });

  if (titleDOM == null) throw new Error("null title");
  const head = doc.getElementsByTagName("head")[0];
  const attemptDOM =
    testPage.getElementsByTagName("input").filter((input) =>
      input.getAttribute("name") === "attemptid"
    )[0];
  const questionIdsInput = testPage.getElementsByTagName("input").filter(
    (input) => input.getAttribute("name") === "questionids",
  );
  const exam: Exam = {
    id,
    tag: {},
    title: firstChild(titleDOM, { tag: "h1" })?.textContent ?? "",
    subtitle: firstChild(titleDOM, { tag: "h2" })?.textContent ?? "",
    questions: [] as Question[],
    attemptId: attemptDOM.getAttribute("value") ??
      "",
    questionsIds: questionIdsInput[0].getAttribute(
      "value",
    ) ?? "",
  };
  const pageTitle = head.getElementsByTagName("title");
  if (pageTitle.length > 0) {
    exam.tag["title"] = pageTitle[0].textContent;
  }
  const questionDOMs = testPage.getElementsByClassName("que");
  for (const questionDOM of questionDOMs) {
    try {
      const question = extractQuestion(questionDOM);
      exam.questions.push(question);
    } catch {
    }
  }
  return exam;
};

const extractQuestion = (questionDOM: Element) => {
  const content = firstChild(questionDOM, { className: "content" }, {
    className: "qtext",
  })?.innerHTML ?? "";
  const answerDOMs = questionDOM.getElementsByClassName("answer")[0]
    .getElementsByTagName("tr");
  const id = questionDOM.getAttribute("id") ?? "";
  const answers: Answer[] = [];
  for (const answerContainer of answerDOMs) {
    const answerContentElement =
      answerContainer.getElementsByClassName("text")[0];
    const className = answerContentElement.getAttribute("class");
    const isCorrect = className?.includes("highlight") ?? false;
    const control = firstChild(answerContainer, { className: "control" }, {
      tag: "input",
    });
    const answer: Answer = {
      content: answerContentElement.getElementsByTagName("label")[0].innerHTML,
      value: control?.getAttribute("value") ?? "",
      name: control?.getAttribute("name") ?? "",
      id: control?.getAttribute("id") ?? "",
      isCorrect,
    };
    answers.push(answer);
  }
  const question: Question = {
    content,
    answers,
    id,
  };
  return question;
};

export const reviewExam = async (attemptId: string) => {
  const response = await fetch(
    `https://hocmai.vn/mod/quiz/nen-tang/review.php?attempt=${attemptId}&scorm=0`,
    {
      "headers": {
        "accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,vi;q=0.8",
        "sec-ch-ua":
          '"Chromium";v="88", "Google Chrome";v="88", ";Not\\\\A\\"Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "upgrade-insecure-requests": "1",
        cookie,
      },
      "referrer": "https://hocmai.vn/mod/quiz/nen-tang/attempt.php",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include",
    },
  );
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text);
  }
  const doc = new DOMParser().parseFromString(
    text,
    "text/html",
  )!;
  const questions: Question[] = [];
  const questionDOMs = doc.getElementsByClassName("que");
  for (const questionDOM of questionDOMs) {
    try {
      const question = extractQuestion(questionDOM);
      questions.push(question);
    } catch {}
  }
  return questions;
};

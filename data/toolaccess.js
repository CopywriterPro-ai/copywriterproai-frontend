import * as tasks from "@/appconstants/task";

const taskArr = Object.values(tasks);

const excludefreemium = ["paraphrasing", "expander"];
const excludebasic = ["paraphrasing", "active-passive"];
const excludestandard = [];
const excludeprofessional = ["paraphrasing"];

const excludeFunc = (excludeArr = []) => {
  return taskArr.filter((task) => !excludeArr.includes(task));
};

const freemium = excludeFunc(excludefreemium);
const basic = excludeFunc(excludebasic);
const standard = excludeFunc(excludestandard);
const professional = excludeFunc(excludeprofessional);

const access = { freemium, basic, standard, professional, _all: taskArr };

export default access;

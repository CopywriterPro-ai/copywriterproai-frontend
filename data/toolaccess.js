import * as tasks from "@/appconstants/task";

const taskArr = Object.values(tasks);

const excludefreemium = [];
const excludebasic = [
  tasks.BLOG_IDEA,
  tasks.BLOG_OUTLINE,
  tasks.BLOG_FROM_OUTLINE,
  tasks.BLOG_HEADLINE,
  tasks.BLOG_INTRO,
  tasks.BLOG_OUTRO,
  tasks.BLOG_TOPIC,
  tasks.PARAPHRASING,
  tasks.EXPANDER,
  tasks.CHANGE_TONE,
  tasks.SIMPLIFIER,
  tasks.NOTES_FROM_PASSAGE,
  tasks.POINT_OF_VIEW,
];
const excludestandard = [];
const excludeprofessional = [];

const excludeFunc = (excludeArr = []) => {
  return taskArr.filter((task) => !excludeArr.includes(task));
};

const freemium = excludeFunc(excludefreemium);
const basic = excludeFunc(excludebasic);
const standard = excludeFunc(excludestandard);
const professional = excludeFunc(excludeprofessional);

const access = { freemium, basic, standard, professional, _all: taskArr };

export default access;

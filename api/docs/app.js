import { readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

// const docsDirectory = join(process.cwd(), "docs/app");

// export const getDocTasks = () => {
//   return fs.readdirSync(docsDirectory);
// };

export const Test = () => {
  console.log("Test");
};

// export const getDocByTask = (task, fields = []) => {
//   const realTask = task.replace(/\.md$/, "");
//   const fullPath = join(docsDirectory, `${realTask}.md`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   const { data, content } = matter(fileContents);

//   const items = {};

//   fields.forEach((field) => {
//     if (field === "task") {
//       items[field] = realTask;
//     }
//     if (field === "content") {
//       items[field] = content;
//     }

//     if (typeof data[field] !== "undefined") {
//       items[field] = data[field];
//     }
//   });

//   return items;
// };

// export const getAllDocs = (fields = []) => {
//   const tasks = getDocTasks();
//   const docs = tasks.map((task) => getDocByTask(task, fields));
//   return docs;
// };

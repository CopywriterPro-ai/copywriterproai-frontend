import { blogs } from '@/utils/blogs';
import path from 'path';
import * as fs from 'fs';

const blogDirectory = 'components/blogs/blogsList/';

export function getAllBlogIds() {
  return blogs.map(blog => {
    return {
      params: {
        blogId: blog.id,
      },
    };
  });
}

export function getBlogData(id) {
  const fullPath = path.join(process.cwd(), blogDirectory);
  const blog = fs.readFileSync(fullPath + `${id}.html`, 'utf8');
  const blogInfo = blogs.filter(blog => blog.id == id);
  const { title, description, tags, date, author } = blogInfo[0];
  
  return {
    title,
    description,
    blog,
    tags,
    date,
    author,
  };
}
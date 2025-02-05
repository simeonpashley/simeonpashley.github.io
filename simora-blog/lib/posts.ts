import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = `/Users/simeon_1/_sites/simeonpashley.github.io/_posts`; //path.join(process.cwd(), 'posts');

interface PostFrontMatter {
  title?: string;
  tags?: string[];
  categories?: string[];
  // add any other fields as needed
  [key: string]: unknown;
}

export interface PostData extends PostFrontMatter {
  slug: string;
  contentHtml: string;
}

function fixMalformedFrontMatter(fileContents: string): string {
  // If the file starts with a proper opening delimiter, try to fix the closing delimiter
  // This regex finds a closing delimiter '---' that is not on its own line.
  // It looks for any occurrence of '---' that is immediately preceded by a non-newline character.
  // Then it inserts a newline before it.
  return fileContents.replace(/(?<=[^\n])---/g, '\n---');
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  let fileContents = fs.readFileSync(fullPath, 'utf8');

  // Preprocess the file to fix the malformed front matter delimiter if needed
  fileContents = fixMalformedFrontMatter(fileContents);

  // Parse the post metadata section using gray-matter
  const matterResult = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Return with a type assertion to PostData
  return { slug, contentHtml, ...matterResult.data } as PostData;
}

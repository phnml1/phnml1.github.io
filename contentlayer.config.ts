// contentlayer.config.ts
import { FieldDefs, defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time';
const fields: FieldDefs = {
  title: { type: 'string', required: true },
  summary: { type: 'string', required: true },
  date: { type: 'date', required: true },
  tags: { type: 'list', required: true, of: { type: 'string' } },
  image: { type: 'string' },
  isFeatured: {type: 'string'},
};
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields,
  computedFields: {
    category: { type: 'string', resolve: (post) => `${post._raw.sourceFileDir}` },
    slug: {type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}`}
  },
  readingMinutes: {
    type: 'string',
    resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
  },
  wordCount: {
    type: 'number',
    resolve: (post) => post.body.raw.split(/\s+/gu).length,
  },
}))

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] })
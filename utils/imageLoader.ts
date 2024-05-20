'use client'
type imageLoaderType =  {
  src:string
  width: string
  quality: string
}
export default function myImageLoader({ src, width, quality }: imageLoaderType) {
  return `https://phnml1.github.io/my-blog/${src}?w=${width}&q=${quality || 75}`
}
const fs = require('fs');
const Parser = require('rss-parser');

const parser = new Parser();
const BLOG_RSS_URL = 'https://hoojjang.tistory.com/rss';

async function fetchBlogPosts() {
  const feed = await parser.parseURL(BLOG_RSS_URL);
  return feed.items.slice(0, 5).map((item, index) => {
    return `| ${index + 1} | [${item.title}](${item.link}) |`;
  }).join('\n');
}

async function updateReadme() {
  const blogPosts = await fetchBlogPosts();
  
  let readme = fs.readFileSync('README.md', 'utf-8');
  
  // 블로그 포스트 섹션을 삽입할 위치 찾기
  const insertPosition = readme.indexOf('![](./profile-3d-contrib/profile-green-animate.svg)');
  
  if (insertPosition !== -1) {
    const blogPostsSection = `
---
## 📕 Latest Blog Articles
| No. | 제목 |
|-----|------|
${blogPosts}

`;
    
    readme = readme.slice(0, insertPosition) + blogPostsSection + readme.slice(insertPosition);
    
    fs.writeFileSync('README.md', readme);
    console.log('README가 성공적으로 업데이트되었습니다');
  } else {
    console.log('README에서 삽입 지점을 찾을 수 없습니다');
  }
}

updateReadme();

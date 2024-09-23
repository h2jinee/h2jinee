import { readFileSync, writeFileSync } from 'node:fs';
import Parser from "rss-parser";

const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

const BLOG_RSS_URL = 'https://hoojjang.tistory.com/rss';

async function fetchBlogPosts() {
    try {
        const feed = await parser.parseURL(BLOG_RSS_URL);
        return feed.items.slice(0, 5).map((item, index) => {
            return `| ${index + 1} | [${item.title}](${item.link}) |`;
        }).join('\n');
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return '| - | 블로그 포스트를 가져오는 데 실패했습니다. |';
    }
}

async function updateReadme() {
    try {
        const blogPosts = await fetchBlogPosts();
        
        let readme = readFileSync('README.md', 'utf-8');
        
        const solvedAcStatsEnd = '</div>';
        const githubStatsStart = '### 📊 GitHub Stats';
        
        const solvedAcStatsEndIndex = readme.indexOf(solvedAcStatsEnd) + solvedAcStatsEnd.length;
        const githubStatsStartIndex = readme.indexOf(githubStatsStart);
        
        if (solvedAcStatsEndIndex !== -1 && githubStatsStartIndex !== -1) {
            const newSection = `

---
## 📕 Latest Blog Articles
| No. | Title |
|-----|-------|
${blogPosts}

---
`;
            readme = readme.slice(0, solvedAcStatsEndIndex) + newSection + readme.slice(githubStatsStartIndex);
            
            writeFileSync('README.md', readme, 'utf8');
            console.log('README가 성공적으로 업데이트되었습니다');
        } else {
            console.log('README에서 업데이트 지점을 찾을 수 없습니다');
        }
    } catch (error) {
        console.error('Error updating README:', error);
    }
}

updateReadme();

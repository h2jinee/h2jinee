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
        let posts = '';
        for (let i = 0; i < Math.min(feed.items.length, 10); i++) {
            const { title, link } = feed.items[i];
            posts += `| ${i + 1} | [${title}](${link}) |\n`;
        }
        if (feed.items.length === 0) {
            posts = '| - | 게시물이 없습니다. |\n';
        }
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return '| - | 블로그 포스트를 가져오는 데 실패했습니다. |\n';
    }
}

async function updateReadme() {
    try {
        const blogPosts = await fetchBlogPosts();
        
        let readme = readFileSync('README.md', 'utf-8');
        
        const startMarker = '### 📕 Latest Blog Posts';
        const endMarker = '### 📊 GitHub Stats';
        
        const startIndex = readme.indexOf(startMarker);
        const endIndex = readme.indexOf(endMarker);
        
        if (startIndex !== -1 && endIndex !== -1) {
            const newSection = `### 📕 Latest Blog Posts
| No. | Title |
|-----|-------|
${blogPosts}---
`;
            
            const updatedReadme = readme.slice(0, startIndex) + newSection + readme.slice(endIndex);
            
            writeFileSync('README.md', updatedReadme, 'utf8');
            console.log('README가 성공적으로 업데이트되었습니다');
        } else {
            console.log('README에서 업데이트 지점을 찾을 수 없습니다');
        }
    } catch (error) {
        console.error('Error updating README:', error);
    }
}

updateReadme();

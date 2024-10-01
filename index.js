import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

/**
 * README.MD content
 * @type {string}
 */
let text = `
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:faffc0,10:e1ffc0,30:c0ffde,75:c0fffd,100:c0e8ff&height=100&section=header&text=&fontSize=0" width="100%"/>

### Hi there 👋
---

### 🚀 About Me

- 🔭 I’ve been working as a backend developer since August 2020, with Spring as my primary framework.
- 🌱 I work on data structures and algorithm problems to enhance my coding interview skills, and I'm also studying CS topics.
- 💻 I'm continuously learning Java, Spring, and JPA to become a more proficient and deep-skilled developer.
- 👯 I'm looking for opportunities to contribute to open-source projects.
- 📫 You can reach me via [email](mailto:wjsgmlwls97@gmail.com).

---

### 🛠 Tech Stack

<div align="center">
  <img alt="Java" src="https://img.shields.io/badge/Java-007396.svg?&style=for-the-badge&logo=Java&logoColor=white"/>
  <img alt="Flutter" src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white"/>
  <img alt="Spring" src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img alt="Oracle" src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img alt="AWS" src="https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
  <img alt="Jenkins" src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"/>
</div>

---

### 🧩 Solved.ac Stats
<div align="center">
  <a href="https://solved.ac/wjsgmlwls97">
    <img src="http://mazassumnida.wtf/api/v2/generate_badge?boj=wjsgmlwls97" alt="Solved.ac Profile"/>
  </a>
</div>

---

### 📕 Latest Blog Posts
| No. | Title |
|-----|-------|
`;

// rss-parser instance
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // Fetch RSS feed
  const feed = await parser.parseURL("https://hoojjang.tistory.com/rss"); // Use your blog's RSS feed URL

  // Loop through up to 10 latest posts
  for (let i = 0; i < Math.min(feed.items.length, 10); i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `| ${i + 1} | [${title}](${link}) |\n`;
  }

  // If there are no blog posts
  if (feed.items.length === 0) {
    console.log("게시물이 없습니다.");
    text += `| - | 게시물이 없습니다. |\n`;
  }

  // Rest of the README content
  text += `
---

<div align="center">
  <a href="https://github.com/devxb/gitanimals">
    <img src="https://render.gitanimals.org/lines/h2jinee?pet-id=625173881033577834" width="1000" height="200" alt="GitAnimals Pet"/>
  </a>
</div>

<div align="center">
  <a href="https://hits.seeyoufarm.com">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fh2jinee&bg=23C0E8FF&text=23C0E8FF&logo=23E7E7E7" alt="Hits"/>
  </a>
</div>
`;

  // Write to README.md
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });
  console.log("업데이트 완료");
})();

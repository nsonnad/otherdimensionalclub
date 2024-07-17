const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read the YAML file
const yamlFilePath = path.join(__dirname, 'work.yml');
const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
const works = yaml.load(yamlContent);

// Directory to save the markdown files
const outputDir = path.join(__dirname, '../src/notes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to slugify titles
const slugify = (text) => {
  return text.toString().trim().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

// Convert each work to a markdown file
works.forEach(work => {
  const frontMatter = {
    title: work.title.trim(),
    date: new Date(work.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
    url: work.link,
    description: work.description.trim(), // Remove new line characters
    publication: work.publication,
    medium: work.medium,
    external: true
  };

  const markdownContent = `---
${Object.entries(frontMatter)
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---
`;

  const date = new Date(work.date);
  const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  const slug = slugify(work.title);
  const fileName = `${formattedDate}-${slug}.md`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, markdownContent, 'utf8');
});

console.log('Markdown files have been created successfully.');


const fs = require('fs');
const path = require('path');

const pbLines = fs
  .readFileSync(path.join(__dirname, 'src', 'param-builder.ts'))
  .toString()
  .split('\n');

const readmeLines = fs
  .readFileSync(path.join(__dirname, 'README.md'))
  .toString()
  .split('\n');

const comments = [];
let currentComment = null;

for (let i = 0; i < pbLines.length; i++) {
  if (currentComment && pbLines[i].includes('*/')) {
    comments.push(currentComment);
    currentComment = null;
    continue;
  }

  if (currentComment == null && pbLines[i].includes('/*')) {
    currentComment = pbLines[i];
    continue;
  }

  if (currentComment != null) {
    currentComment += `\n${pbLines[i]}`;
  }
}

const commentsWithExamples = comments.filter((c) => c.includes('@example'));

const transformers = [];

for (let i = 0; i < commentsWithExamples.length; i++) {
  const textLines = commentsWithExamples[i]
    .split('\n')
    .map((l) => l.trim().replace(/^[/*]+ {0,1}/, ''));

  let mode = 'description';
  let description = '';
  let example = '';
  let url = '';
  let functionName = '';

  for (let j = 0; j < textLines.length; j++) {
    if (
      textLines[j]
        .trim()
        .startsWith('@see {@link https://github.com/imgproxy/imgproxy')
    ) {
      mode = 'link';
    } else if (textLines[j].startsWith('@example')) {
      mode = 'example';
    } else if (mode !== 'description') {
      continue;
    }

    switch (mode) {
      case 'description':
        description += ` ${textLines[j]}`;
        break;
      case 'link':
        url = textLines[j].replace(/^.+(https\:\/\/[^}]+).+$/, '$1');
        break;
      case 'example':
        for (let k = j + 1; k < textLines.length; k++) {
          if (k !== j + 1 && textLines[k].includes('```')) {
            example += '\n```';
            break;
          }

          if (k === j + 2 && textLines[k].startsWith('pb()')) {
            functionName = textLines[k].replace(/^pb\(\)\.([^(]+).+$/, '$1');
          }

          example += `\n${textLines[k]}`;
        }
    }
  }

  if (description && url && example && functionName)
    transformers.push({ description, url, example, functionName });
}

const markdown = [];
for (let i = 0; i < transformers.length; i++) {
  markdown.push('');
  markdown.push(
    `### ${transformers[i].functionName} ([imgproxy docs](${transformers[i].url}))`,
  );
  markdown.push('');
  markdown.push(transformers[i].description.trim());
  markdown.push('');
  markdown.push('#### Example');
  markdown.push('');
  markdown.push(transformers[i].example.trim());
}

let newReadme = [];

for (let i = 0; i < readmeLines.length; i++) {
  newReadme.push(readmeLines[i]);

  if (readmeLines[i].startsWith('## Modifiers')) {
    break;
  }
}

newReadme.push(...markdown);

fs.writeFileSync('README.md', newReadme.join('\n'));

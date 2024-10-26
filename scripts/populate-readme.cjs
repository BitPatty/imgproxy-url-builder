const fs = require('fs');
const path = require('path');

const pbLines = fs
  .readFileSync(path.join(__dirname, '..', 'src', 'param-builder.ts'))
  .toString()
  .split('\n');

const readmeLines = fs
  .readFileSync(path.join(__dirname, '..', 'README.md'))
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
      textLines[j].trim().startsWith('See https://github.com/imgproxy/imgproxy')
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
        url = textLines[j].replace(/^.+(https\:\/\/[^ ]+).+$/, '$1');
        break;
      case 'example':
        for (let k = j + 1; k < textLines.length; k++) {
          if (k !== j + 1 && textLines[k].includes('```')) {
            example += '\n```';
            break;
          }

          if (!functionName && k >= j + 2 && textLines[k].startsWith('pb()')) {
            functionName = textLines[k].replace(/^pb\(\)\.([^(]+).+$/, '$1');
          }

          example += `\n${textLines[k]}`;
        }
    }
  }

  if (description && url && example && functionName)
    transformers.push({ description, url, example, functionName });
}

const sortedTransformers = transformers.sort((a, b) =>
  a.functionName.trim().toLowerCase() < b.functionName.trim().toLowerCase()
    ? -1
    : 1,
);

const toc = [];
const markdown = [];
for (let i = 0; i < sortedTransformers.length; i++) {
  toc.push(
    `- [${sortedTransformers[i].functionName}](#${sortedTransformers[
      i
    ].functionName.toLowerCase()}-imgproxy-docs)`,
  );
  markdown.push('');
  markdown.push(
    `### ${sortedTransformers[i].functionName} ([imgproxy docs](${sortedTransformers[i].url}))`,
  );
  markdown.push('');
  markdown.push(sortedTransformers[i].description.trim());
  markdown.push('');
  markdown.push('#### Example');
  markdown.push('');
  markdown.push(sortedTransformers[i].example.trim());
}

let newReadme = [];

for (let i = 0; i < readmeLines.length; i++) {
  newReadme.push(readmeLines[i]);

  if (readmeLines[i].startsWith('## Modifiers')) {
    break;
  }
}

newReadme.push('');
newReadme.push(...toc);
newReadme.push(...markdown);

fs.writeFileSync('README.md', newReadme.join('\n'));

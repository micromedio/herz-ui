import { exec } from 'child_process';
import fs from 'fs';

const APPEND_STRING = '// appendHere';

export default function (plop) {
  plop.setActionType('runPrettier', function (answers, config, plop) {
    try {
      config.paths.forEach((path) => {
        exec(`yarn prettier --write ${plop.renderString(path, answers)}`);
      });
      return 'Prettier ran successfully';
    } catch (error) {
      return error;
    }
  });

  // This action must be reviewed as soon as we have an export that use multiple lines
  // because it will break for that kind of export
  plop.setActionType('prepareToAppend', function (answers, _config, plop) {
    try {
      const indexData = fs.readFileSync('src/components/index.ts', 'utf8');
      const componentExport = plop.renderString(
        'export { default as {{pascalCase componentName}} } from "./{{pascalCase componentName}}/{{pascalCase componentName}}"',
        answers
      );
      const linesArray = indexData.toString().split('\n');

      const indexToPrepend = linesArray.findIndex((line) => {
        return (
          line.startsWith('export { default as ') && line > componentExport
        );
      });

      if (indexToPrepend === -1) {
        linesArray.push(APPEND_STRING);
      } else if (indexToPrepend === 0) {
        linesArray.unshift(APPEND_STRING);
      } else {
        linesArray[indexToPrepend - 1] = `\n${APPEND_STRING}`;
      }
      fs.writeFileSync('src/components/index.ts', linesArray.join('\n'));
      return 'Prepare to append ran successfully';
    } catch (error) {
      return error;
    }
  });

  plop.setActionType('cleanUp', function () {
    try {
      const indexData = fs.readFileSync('src/components/index.ts', 'utf8');
      const linesArray = indexData
        .toString()
        .split('\n')
        .filter((line) => !line.includes(APPEND_STRING));
      fs.writeFileSync('src/components/index.ts', linesArray.join('\n'));
      return 'Clean up ran successfully';
    } catch (error) {
      return error;
    }
  });

  // create your generators here
  plop.setGenerator('createAPIDoc', {
    description: 'create API doc page for a component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?',
      },
    ],
    actions: () => {
      const componentPath =
        'src/components/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx';
      const storyPath =
        'src/components/{{pascalCase componentName}}/{{pascalCase componentName}}.stories.tsx';
      const styleguidistPath =
        'src/components/{{pascalCase componentName}}/{{pascalCase componentName}}.md';

      const docusaurusApiPath =
        'website/docs/apis/{{pascalCase componentName}}.mdx';
      const docusaurusComponentPath =
        'website/docs/components/{{pascalCase componentName}}.mdx';

      return [
        {
          type: 'add',
          path: componentPath,
          templateFile: 'plop-templates/component.hbs',
        },
        {
          type: 'add',
          path: storyPath,
          templateFile: 'plop-templates/story.hbs',
        },
        {
          type: 'add',
          path: styleguidistPath,
          templateFile: 'plop-templates/styleguidist.hbs',
        },
        {
          type: 'add',
          path: docusaurusApiPath,
          templateFile: 'plop-templates/docs/api.hbs',
        },
        {
          type: 'add',
          path: docusaurusComponentPath,
          templateFile: 'plop-templates/docs/component.hbs',
        },
        {
          type: 'prepareToAppend',
        },
        {
          type: 'append',
          pattern: APPEND_STRING,
          path: 'src/components/index.ts',
          templateFile: 'plop-templates/entryPoint.hbs',
        },
        {
          paths: [
            componentPath,
            storyPath,
            styleguidistPath,
            docusaurusApiPath,
            docusaurusComponentPath,
            'src/components/index.ts',
          ],
          type: 'runPrettier',
        },
        {
          type: 'cleanUp',
        },
      ];
    },
  });
}

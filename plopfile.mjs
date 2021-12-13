export default function (plop) {
  // create your generators here
  plop.setGenerator('createAPIDoc', {
    description: 'create API doc page for a component',
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "What is the component name?",
      },
    ],
    actions: [{
      type: 'add',
      path: 'website/docs/apis/{{pascalCase componentName}}.mdx',
      templateFile: 'plop-templates/docs/api.hbs'
    }]
  });
};

export default {
  name: 'localeString',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule: any) => rule.required()
    },
    {
      name: 'ga',
      title: 'Irish',
      type: 'string',
      validation: (rule: any) => rule.required()
    }
  ]
};

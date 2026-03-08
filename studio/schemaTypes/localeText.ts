export default {
  name: 'localeText',
  title: 'Localized Long Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 6,
      validation: (rule: any) => rule.required()
    },
    {
      name: 'ga',
      title: 'Irish',
      type: 'text',
      rows: 6,
      validation: (rule: any) => rule.required()
    }
  ]
};

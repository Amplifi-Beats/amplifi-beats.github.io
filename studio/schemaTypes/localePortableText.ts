export default {
  name: 'localePortableText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'ga',
      title: 'Irish',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
};

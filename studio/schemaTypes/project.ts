export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slugEn',
      title: 'English Slug',
      type: 'slug',
      options: {
        source: 'title.en'
      },
      validation: (rule: any) => rule.required()
    },
    {
      name: 'slugGa',
      title: 'Irish Slug',
      type: 'slug',
      options: {
        source: 'title.ga'
      },
      validation: (rule: any) => rule.required()
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'localeText'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localePortableText'
    },
    {
      name: 'moduleName',
      title: 'Course Module',
      type: 'string',
      validation: (rule: any) => rule.required()
    },
    {
      name: 'techniques',
      title: 'Techniques',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'tools',
      title: 'Tools / Plugins',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
      validation: (rule: any) => rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'videoEmbedUrl',
      title: 'Video Embed URL (YouTube/Vimeo)',
      type: 'url'
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    },
    {
      name: 'soundcloudUrl',
      title: 'SoundCloud Track URL',
      description: 'Paste a SoundCloud track URL to embed the SoundCloud player (recommended over direct audio uploads).',
      type: 'url',
      validation: (rule: any) =>
        rule.uri({
          scheme: ['http', 'https']
        })
    },
    {
      name: 'translationStatus',
      title: 'Translation Status',
      type: 'string',
      options: {
        list: [
          { title: 'Complete', value: 'complete' },
          { title: 'Needs Irish', value: 'needs-irish' },
          { title: 'Needs English', value: 'needs-english' }
        ]
      },
      initialValue: 'complete'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 100
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'moduleName',
      media: 'coverImage'
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.subtitle
      };
    }
  }
};

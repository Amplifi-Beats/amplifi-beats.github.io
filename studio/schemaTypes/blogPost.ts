export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule: any) => rule.required()
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localeText',
      validation: (rule: any) => rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'localePortableText',
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule: any) => rule.required()
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'publishedAt',
      media: 'coverImage'
    }
  }
};

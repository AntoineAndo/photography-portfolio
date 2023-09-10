import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageContent',
  title: 'Image',
  type: 'document',
  fields: [
    defineField({
      name: 'imageField',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    // defineArrayMember({
    //   title: 'Caption',
    //   name: 'caption',
    //   type: 'string',
    // }),
  ],
})

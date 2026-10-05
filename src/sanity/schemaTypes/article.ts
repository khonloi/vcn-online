import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().error('A headline is required for all articles.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('A URL slug is required.'),
    }),
    defineField({
      name: 'author',
      title: 'Author / Byline',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) =>
        Rule.required().error('An author must be assigned for editorial attribution.'),
    }),
    defineField({
      name: 'category',
      title: 'Primary News Desk / Category',
      type: 'reference',
      to: { type: 'category' },
      validation: (Rule) => Rule.required().error('A primary news desk category is required.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Lead Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description:
            'Required for accessibility and Google News compliance. Describe the image objectively.',
        }),
        defineField({
          name: 'caption',
          title: 'Photo Caption & Credit',
          type: 'string',
          description: 'e.g. "Photo: Spencer Platt / Getty Images"',
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('A primary lead image is required for card feeds and SEO.'),
    }),
    defineField({
      name: 'isBreaking',
      title: 'Is Breaking News?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'breakingUntil',
      title: 'Breaking Status Expiration',
      type: 'datetime',
      description:
        'When breaking news banner should automatically decay back into standard chronological order.',
      hidden: ({ parent }) => !parent?.isBreaking,
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description:
        'A short summary used in card feeds and Google News snippets (max 250 characters).',
      validation: (Rule) =>
        Rule.max(250).warning(
          'Summaries longer than 250 characters will be truncated in card feeds.'
        ),
    }),
    defineField({
      name: 'takeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bulleted key takeaways displayed at the top of the article.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('A publication timestamp is required.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Alternative text for screen readers.',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});

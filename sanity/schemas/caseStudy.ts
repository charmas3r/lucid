import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta & Settings' },
    { name: 'visuals', title: 'Visuals' },
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The project/case study title',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the client or company',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief overview (2-3 sentences) shown on cards',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      description: 'What problem did the client face?',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      description: 'How did we solve the problem?',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      description: 'What services were delivered? (e.g., Web Design, SEO, Development)',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      description: 'Results and impact metrics',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "+342%", "4.8", "$67k"',
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Patient Bookings", "App Store Rating"',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      description: 'A quote from the client',
      group: 'content',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 3,
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
        },
        {
          name: 'role',
          title: 'Author Role/Title',
          type: 'string',
        },
      ],
    }),
    
    // === META GROUP ===
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Client industry (e.g., Healthcare, E-Commerce, SaaS)',
      group: 'meta',
      options: {
        list: [
          { title: 'Healthcare', value: 'Healthcare' },
          { title: 'Food & Beverage', value: 'Food & Beverage' },
          { title: 'Health & Fitness', value: 'Health & Fitness' },
          { title: 'Legal Services', value: 'Legal Services' },
          { title: 'Home Services', value: 'Home Services' },
          { title: 'Fashion', value: 'Fashion' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Education', value: 'Education' },
          { title: 'Real Estate', value: 'Real Estate' },
          { title: 'Non-Profit', value: 'Non-Profit' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Type of project for filtering',
      group: 'meta',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'E-Commerce', value: 'ecommerce' },
          { title: 'SEO & Marketing', value: 'seo' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'string',
      description: 'How long did the project take? (e.g., "8 weeks", "6 months")',
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this case study prominently on the site',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When was this case study published?',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
    
    // === VISUALS GROUP ===
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the case study (optional - gradient will be used if not set)',
      group: 'visuals',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    defineField({
      name: 'gradient',
      title: 'Card Gradient',
      type: 'string',
      description: 'CSS gradient for the card background (e.g., "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")',
      group: 'visuals',
      options: {
        list: [
          { title: 'Purple Violet', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { title: 'Teal Green', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
          { title: 'Pink Coral', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
          { title: 'Blue Cyan', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
          { title: 'Peach Gold', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
          { title: 'Mint Rose', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
          { title: 'Rose Pink', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
          { title: 'Lucid Blue', value: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)' },
          { title: 'Deep Navy', value: 'linear-gradient(135deg, #0A1A3F 0%, #1F4FD8 100%)' },
          { title: 'Steel Blue', value: 'linear-gradient(135deg, #3A6EA5 0%, #4DA3FF 100%)' },
        ],
      },
      initialValue: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});

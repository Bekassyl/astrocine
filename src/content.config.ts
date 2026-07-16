import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			name: z.string(),
			title: z.string(),
			experience: z
				.array(
					z.object({
						role: z.string(),
						institution: z.string(),
						period: z.string(),
						description: z.string(),
					}),
				)
				.optional(),
			education: z
				.array(
					z.object({
						degree: z.string(),
						institution: z.string(),
						period: z.string(),
						thesis: z.string().optional(),
						description: z.string().optional(),
					}),
				)
				.optional(),
		}),
});

const publications = defineCollection({
	loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			author: z.string(),
			pubDate: z.coerce.date(),
			journal: z.string(),
			external_url: z.string().url().optional(),
			description: z.string(),
			heroImage: z.string().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

export const collections = { blog, about, publications };

import type { Locale } from '../i18n';
import { sanityClient } from './client';

export interface Project {
  _id: string;
  title: string;
  slug: string;
  slugEn: string;
  slugGa: string;
  summary: string;
  description: unknown;
  moduleName: string;
  techniques: string[];
  tools: string[];
  projectDate: string;
  coverImageUrl?: string;
  imageUrls: string[];
  videoEmbedUrl?: string;
  audioUrl?: string;
  soundcloudUrl?: string;
  featured: boolean;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  slugEn: string;
  slugGa: string;
  excerpt: string;
  content: unknown;
  coverImageUrl?: string;
  publishedAt: string;
  featured: boolean;
}

function projectProjection(locale: Locale) {
  const slugField = locale === 'ga' ? 'slugGa' : 'slugEn';
  return `{
    _id,
    "title": title.${locale},
    "slug": ${slugField}.current,
    "slugEn": slugEn.current,
    "slugGa": slugGa.current,
    "summary": summary.${locale},
    "description": description.${locale},
    moduleName,
    techniques,
    tools,
    projectDate,
    "coverImageUrl": coalesce(coverImage.asset->url, coverImageUrl),
    "imageUrls": coalesce(images[].asset->url, imageUrls, []),
    videoEmbedUrl,
    "audioUrl": coalesce(audioFile.asset->url, audioUrl),
    soundcloudUrl,
    featured,
    order
  }`;
}

function blogProjection(locale: Locale) {
  const primarySlugField = locale === 'ga' ? 'slugGa' : 'slugEn';
  const fallbackSlugField = locale === 'ga' ? 'slugEn' : 'slugGa';
  return `{
    _id,
    "title": title.${locale},
    "slug": coalesce(${primarySlugField}.current, ${fallbackSlugField}.current),
    "slugEn": slugEn.current,
    "slugGa": slugGa.current,
    "excerpt": excerpt.${locale},
    "content": content.${locale},
    "coverImageUrl": coverImage.asset->url,
    publishedAt,
    featured
  }`;
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  if (!sanityClient) {
    return [];
  }

  const query = `*[_type == "project"] | order(order asc, projectDate desc) ${projectProjection(locale)}`;
  return sanityClient.fetch(query);
}

export async function getProjectBySlug(locale: Locale, slug: string): Promise<Project | null> {
  if (!sanityClient) {
    return null;
  }

  const slugField = locale === 'ga' ? 'slugGa.current' : 'slugEn.current';
  const query = `*[_type == "project" && ${slugField} == $slug][0] ${projectProjection(locale)}`;
  return sanityClient.fetch(query, { slug });
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  if (!sanityClient) {
    return [];
  }

  const query = `*[_type == "blogPost"] | order(publishedAt desc) ${blogProjection(locale)}`;
  return sanityClient.fetch(query);
}

export async function getBlogPostBySlug(locale: Locale, slug: string): Promise<BlogPost | null> {
  if (!sanityClient) {
    return null;
  }

  const primarySlugField = locale === 'ga' ? 'slugGa.current' : 'slugEn.current';
  const fallbackSlugField = locale === 'ga' ? 'slugEn.current' : 'slugGa.current';
  const query = `*[_type == "blogPost" && (${primarySlugField} == $slug || ${fallbackSlugField} == $slug)][0] ${blogProjection(locale)}`;
  return sanityClient.fetch(query, { slug });
}

export async function getBlogSlugPairs(): Promise<Array<{ slugEn?: string; slugGa?: string }>> {
  if (!sanityClient) {
    return [];
  }

  const query = `*[_type == "blogPost"]{ "slugEn": slugEn.current, "slugGa": slugGa.current }`;
  return sanityClient.fetch(query);
}

import { BlogPost } from '../types';

export interface ParsedMDX {
  metadata: Record<string, any>;
  content: string;
}

export const parseMDX = (source: string): ParsedMDX => {
  const pattern = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/;
  const match = source.match(pattern);

  if (!match) {
    return {
      metadata: {},
      content: source
    };
  }

  const frontmatterBlock = match[1];
  const content = match[2];

  const metadata: Record<string, any> = {};
  frontmatterBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // Handle arrays (e.g. tags: [a, b])
      if (value.startsWith('[') && value.endsWith(']')) {
        metadata[key.trim()] = value.slice(1, -1).split(',').map(s => s.trim());
      } else {
        metadata[key.trim()] = value;
      }
    }
  });

  return { metadata, content };
};

export const calculateReadingTime = (text: string): string => {
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return `${time} min read`;
};
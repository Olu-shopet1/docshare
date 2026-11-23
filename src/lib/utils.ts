import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Only allow web addresses (http/https) or in-page "#" links to be used as
 * link targets. Anything else (for example `javascript:` URLs typed into the
 * upload form) is replaced with "#" so it can't run code when clicked.
 */
export function safeHref(url: string): string {
  if (url.startsWith('#')) return url
  try {
    const { protocol } = new URL(url)
    return protocol === 'https:' || protocol === 'http:' ? url : '#'
  } catch {
    return '#'
  }
}

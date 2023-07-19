import type { H3Event } from 'h3'

import type { Feed, FeedOptions, Item, Author} from 'feed'
import type { Category } from 'feed/lib/typings'

import type { ParsedContent, QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

import type { FeedmeRSSOptions, FeedRSSRoute } from './types'

export interface FeedmeRSSContentOptions extends FeedmeRSSOptions {
  /**
   * The root key in ParsedContent. By default root is equals to object root
   */
  key?: string

  authors?: Author[]
  categories?: string[]
  feed?: FeedOptions
  item?: Partial<Item>

  baseUrl?: string
  query?: QueryBuilderParams
  content?: true
}

export interface FeedmeModuleContentOptions extends FeedmeRSSContentOptions {
}

export interface NitroFeedmeContentBeforeOptions {
  context: {
    event: H3Event
  }
  feed: {
    create: (options: FeedOptions) => Feed
    invoke: () => Feed | undefined
    feedme: FeedRSSContentOptions
    content: FeedmeModuleContentOptions
  }
}

export interface NitroFeedmeContentItemOptions {
  context: {
    event: H3Event
  }
  feed: {
    insert: (options: Item) => void
    invoke: () => Item | undefined
    parsed: ParsedContent
    feedme: FeedmeRSSContentOptions
    content: FeedmeModuleContentOptions
  }
}

export interface NitroFeedmeContentAfterOptions {
  context: {
    event: H3Event
  }
  feed: {
    invoke: () => Feed
    feedme: FeedmeRSSContentOptions
    content: FeedmeModuleContentOptions
  }
}

declare module 'nitropack' {
  interface NitroRuntimeHooks {
    [_: `feedme:handle:content:before[${string}]`]: (options: NitroFeedmeContentBeforeOptions) => void
    'feedme:handle:content:before': (options: NitroFeedmeContentBeforeOptions) => void

    [_: `feedme:handle:content:item[${string}]`]: (options: NitroFeedmeContentItemOptions) => void
    'feedme:handle:content:item': (options: NitroFeedmeContentItemOptions) => void

    [_: `feedme:handle:content:after[${string}]`]: (options: NitroFeedmeContentAfterOptions) => void
    'feedme:handle:content:after': (options: NitroFeedmeContentAfterOptions) => void
  }
}

export {}
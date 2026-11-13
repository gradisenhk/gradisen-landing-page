import { describe, expect, test } from 'vitest'
import en from '../locales/en.json'
import zhHK from '../locales/zh-HK.json'
import zhCN from '../locales/zh-CN.json'

function keys(value, prefix = '') {
  if (value === null || typeof value !== 'object') return [prefix]
  return Object.entries(value).flatMap(([key, child]) =>
    keys(child, prefix ? `${prefix}.${key}` : key)
  )
}

describe('locale files', () => {
  test('share the same key set', () => {
    const reference = keys(en).sort()
    expect(keys(zhHK).sort()).toEqual(reference)
    expect(keys(zhCN).sort()).toEqual(reference)
  })

  test('contain no em or en dashes', () => {
    for (const locale of [en, zhHK, zhCN]) {
      expect(JSON.stringify(locale)).not.toMatch(/[\u2013\u2014]/)
    }
  })
})

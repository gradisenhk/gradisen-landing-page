import { describe, expect, test } from 'vitest'
import { normalizeLanguage } from '../i18n'

describe('normalizeLanguage', () => {
  test.each([
    ['zh-CN', 'zh-CN'],
    ['zh-Hans', 'zh-CN'],
    ['zh-Hans-SG', 'zh-CN'],
    ['zh-SG', 'zh-CN'],
    ['zh-MY', 'zh-CN'],
    ['zh-HK', 'zh-HK'],
    ['zh-TW', 'zh-HK'],
    ['zh-Hant', 'zh-HK'],
    ['zh', 'zh-HK'],
    ['en', 'en'],
    ['en-GB', 'en'],
  ])('maps %s to %s', (input, expected) => {
    expect(normalizeLanguage(input)).toBe(expected)
  })

  test('leaves unsupported languages unchanged so detection can continue', () => {
    expect(normalizeLanguage('fr-FR')).toBe('fr-FR')
    expect(normalizeLanguage('ja-JP')).toBe('ja-JP')
  })
})

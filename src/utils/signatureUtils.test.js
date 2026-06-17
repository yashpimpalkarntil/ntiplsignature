import test from 'node:test'
import assert from 'node:assert'
import { getPhoneLink, getWebsiteLink, extractGoogleDriveId } from './signatureUtils.js'

test('signatureUtils helper tests', async (t) => {
  await t.test('getPhoneLink cleans and formats phone numbers', () => {
    assert.strictEqual(getPhoneLink('+91 83193 26163'), 'tel:+918319326163')
    assert.strictEqual(getPhoneLink('83193-26163'), 'tel:8319326163')
    assert.strictEqual(getPhoneLink(''), 'tel:')
    assert.strictEqual(getPhoneLink(null), 'tel:')
  })

  await t.test('getWebsiteLink formats website links properly', () => {
    assert.strictEqual(getWebsiteLink('www.netlabindia.com'), 'https://www.netlabindia.com')
    assert.strictEqual(getWebsiteLink('https://netlabindia.com'), 'https://netlabindia.com')
    assert.strictEqual(getWebsiteLink('http://example.com'), 'http://example.com')
    assert.strictEqual(getWebsiteLink(''), '')
    assert.strictEqual(getWebsiteLink(null), '')
  })

  await t.test('extractGoogleDriveId extracts ID from different URL formats', () => {
    // Standard URL format with file/d/
    assert.strictEqual(
      extractGoogleDriveId('https://drive.google.com/file/d/1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae/view?usp=drive_link'),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )
    
    // File/d/ format with edit suffix
    assert.strictEqual(
      extractGoogleDriveId('https://drive.google.com/file/d/1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae/edit'),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )

    // Docs.google.com format
    assert.strictEqual(
      extractGoogleDriveId('https://docs.google.com/file/d/1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae/edit'),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )

    // Open/UC with id param
    assert.strictEqual(
      extractGoogleDriveId('https://drive.google.com/open?id=1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )
    
    assert.strictEqual(
      extractGoogleDriveId('https://drive.google.com/uc?id=1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )

    // Already an ID
    assert.strictEqual(
      extractGoogleDriveId('1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )

    // Whitespace handling
    assert.strictEqual(
      extractGoogleDriveId('  1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae  '),
      '1DFU_JOCUFmYkEOpvivzTRqG60HcbSXae'
    )

    // Empty and null inputs
    assert.strictEqual(extractGoogleDriveId(''), '')
    assert.strictEqual(extractGoogleDriveId(null), '')
  })
})

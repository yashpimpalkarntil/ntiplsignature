/**
 * Clean phone link helper
 * @param {string} phoneStr 
 * @returns {string}
 */
export const getPhoneLink = (phoneStr) => {
  if (!phoneStr) return 'tel:'
  return 'tel:' + phoneStr.replace(/[^0-9+]/g, '')
}

/**
 * Clean website link helper
 * @param {string} webStr 
 * @returns {string}
 */
export const getWebsiteLink = (webStr) => {
  if (!webStr) return ''
  if (!/^https?:\/\//i.test(webStr)) {
    return 'https://' + webStr
  }
  return webStr
}

/**
 * Extract Google Drive file ID from a URL or return it directly if it's already an ID.
 * Supports various formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://docs.google.com/file/d/FILE_ID/edit
 * @param {string} input 
 * @returns {string}
 */
export const extractGoogleDriveId = (input) => {
  if (!input) return ''
  const trimmed = input.trim()
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (fileDMatch && fileDMatch[1]) {
      return fileDMatch[1]
    }
    const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idParamMatch && idParamMatch[1]) {
      return idParamMatch[1]
    }
  }
  return trimmed
}

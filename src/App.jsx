import { useState, useRef } from 'react'
import './App.css'

function App() {
  // Signature Fields State - Defaults to the user's exact input details
  const [name, setName] = useState('Ashish Sharma')
  const [designation, setDesignation] = useState('Assistant Manager Marketing')
  const [email, setEmail] = useState('yourmail@netlabindia.com')
  const [phone, setPhone] = useState('+91 83193 26163')
  const [website, setWebsite] = useState('www.netlabindia.com')
  const [imageID, setImageID] = useState('1pr8oe_h6chG-SEog5YBKXAPm6wGAsaht')

  // UI state
  const [activeTab, setActiveTab] = useState('rich') // 'rich' or 'html'
  const [toasts, setToasts] = useState([]) // Array of notification toasts
  const signatureRef = useRef(null)

  // Clean phone link helper
  const getPhoneLink = (phoneStr) => {
    return 'tel:' + phoneStr.replace(/[^0-9+]/g, '')
  }

  // Clean website link helper
  const getWebsiteLink = (webStr) => {
    if (!/^https?:\/\//i.test(webStr)) {
      return 'https://' + webStr
    }
    return webStr
  }

  // Generate the exact HTML string requested by the user
  const signatureHtml = `<div style="max-width: 400px; font-family: Arial, Helvetica, sans-serif; background: #ffffff; padding: 8px;">
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; border: none;">
    <tbody>
      <tr>
        <td style="width: 90px; text-align: center; vertical-align: top; padding-top: 6px; border: none;">
          <img src="https://lh3.googleusercontent.com/d/${imageID}" width="65" height="65" style="width: 65px; height: 65px; border-radius: 50%; border: 1.5px solid #888; display: block; margin: 0 auto 6px;" />
          <img src="https://www.netlabindia.com/wp-content/uploads/2019/12/NTIPL-ISO-Logo-150px.png" alt="Network Techlab" width="80" style="display: block; margin: 0 auto 4px; border: none;" />
          <img src="https://lh3.googleusercontent.com/d/10Qdrb46fYThBRAB4zbfc_lG7fCpbdgJu" width="75" height="40" style="display: block; margin: 0 auto; border: none;" />
        </td>
        <td style="width: 2px; background: #3f6fc7; border: none;"></td>
        <td style="padding-left: 12px; vertical-align: top; padding-top: 6px; border: none;">
          <div style="font-size: 22px; font-weight: bold; color: #002a78; line-height: 1.1;">${name}</div>
          <div style="font-size: 13px; font-weight: 600; color: #000; margin-top: 5px;">${designation}</div>
          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin: 10px 0; border: none;">
            <tbody><tr><td style="height: 2px; background: #4f7fd1; font-size: 0; line-height: 0; border: none;">&nbsp;</td></tr></tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 5px; border: none;">
            <tbody><tr>
              <td style="font-size: 14px; color: #002a78; padding-right: 6px; border: none;">Email</td>
              <td style="font-size: 11px; border: none;"><a href="mailto:${email}" style="color: #000; text-decoration: none;">${email}</a></td>
            </tr></tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 5px; border: none;">
            <tbody><tr>
              <td style="font-size: 14px; color: #002a78; padding-right: 6px; border: none;">Phone:</td>
              <td style="font-size: 11px; border: none;"><a href="${getPhoneLink(phone)}" style="color: #000; text-decoration: none;">${phone}</a></td>
            </tr></tbody>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" style="border: none;">
            <tbody><tr>
              <td style="font-size: 14px; color: #002a78; padding-right: 6px; border: none;">Website</td>
              <td style="font-size: 11px; border: none;"><a href="${getWebsiteLink(website)}" style="color: #1b64c6; text-decoration: underline;">${website}</a></td>
            </tr></tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;

  // Toast notification triggers
  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  // 1. Copy formatted rich-text directly (Best for copy pasting directly into Gmail/Outlook settings)
  const handleCopyRichText = async () => {
    try {
      const htmlBlob = new Blob([signatureHtml], { type: 'text/html' })
      // Use helper element to get clean plain text representation
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = signatureHtml
      const plainText = tempDiv.innerText || tempDiv.textContent || ''
      const textBlob = new Blob([plainText], { type: 'text/plain' })

      const item = new window.ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob,
      })

      await navigator.clipboard.write([item])
      addToast('Signature copied to clipboard as Rich Text!')
    } catch (err) {
      console.error('ClipboardItem writing failed. Attempting selection copy fallback.', err)
      // Fallback: select and copy element contents programmatically
      const copySuccess = handleSelectionCopy()
      if (copySuccess) {
        addToast('Signature copied to clipboard via fallback selection.')
      } else {
        addToast('Failed to copy rich text. Please copy HTML code directly.', 'error')
      }
    }
  }

  // Fallback selector method
  const handleSelectionCopy = () => {
    const element = signatureRef.current
    if (!element) return false
    
    const range = document.createRange()
    range.selectNode(element)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)

    try {
      const successful = document.execCommand('copy')
      window.getSelection().removeAllRanges()
      return successful
    } catch (err) {
      console.error('ExecCommand copy failed:', err)
      return false
    }
  }

  // 2. Copy raw HTML source code
  const handleCopyHtmlCode = async () => {
    try {
      await navigator.clipboard.writeText(signatureHtml)
      addToast('Raw HTML code copied to clipboard!')
    } catch (err) {
      addToast('Failed to copy HTML code.', 'error')
    }
  }

  // 3. Download HTML file directly
  const handleDownloadHtml = () => {
    try {
      const element = document.createElement('a')
      const file = new Blob([signatureHtml], { type: 'text/html' })
      element.href = URL.createObjectURL(file)
      element.download = `${name.replace(/\s+/g, '_')}_email_signature.html`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      addToast('HTML signature file downloaded!')
    } catch (err) {
      addToast('Failed to download HTML file.', 'error')
    }
  }

  // Reset fields to original Ashish Sharma values
  const handleReset = () => {
    setName('Ashish Sharma')
    setDesignation('Assistant Manager Marketing')
    setEmail('yourmail@netlabindia.com')
    setPhone('+91 83193 26163')
    setWebsite('www.netlabindia.com')
    setImageID('1pr8oe_h6chG-SEog5YBKXAPm6wGAsaht')
    addToast('Reset to original values')
  }

  return (
    <div className="app-container">
      {/* Premium Dashboard Header */}
      <header className="app-header">
        <div className="logo-container">
          <img src="https://www.netlabindia.com/wp-content/uploads/2019/12/NTIPL-ISO-Logo-150px.png" alt="NTIPL Logo" className="logo-img" />
          <h1 className="app-title">NTIPL Signature Hub</h1>
        </div>
        <p className="app-subtitle">
          Generate, preview, and copy pixel-perfect corporate email signatures conforming exactly to Netlab guidelines.
        </p>
      </header>

      {/* Main Workspace Layout */}
      <main className="app-workspace">
        
        {/* Left Panel: Inputs and Code Viewer */}
        <section className="glass-panel">
          <h2 className="panel-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
            Customize Details
          </h2>
          
          <div className="tag-container">
            <span className="tag accent">Netlab Standard V1.0</span>
            <span className="tag">Responsive Layout</span>
            <span className="tag">Isolated Inline Styles</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="form-input" 
                placeholder="Enter Full Name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input 
                type="text" 
                value={designation} 
                onChange={(e) => setDesignation(e.target.value)} 
                className="form-input"
                placeholder="Enter Job Title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="form-input"
                placeholder="Enter Email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="form-input"
                placeholder="Enter Phone Number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Website Domain</label>
              <input 
                type="text" 
                value={website} 
                onChange={(e) => setWebsite(e.target.value)} 
                className="form-input"
                placeholder="Enter Website Url"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Image ID (Google Drive)</label>
              <input 
                type="text" 
                value={imageID} 
                onChange={(e) => setImageID(e.target.value)} 
                className="form-input"
                placeholder="Enter Google Drive Image ID"
              />
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleCopyRichText}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy Signature (Rich Text)
            </button>
            <button className="btn btn-secondary" onClick={handleCopyHtmlCode}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Copy HTML Code
            </button>
            <button className="btn btn-secondary" onClick={handleDownloadHtml}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download HTML File
            </button>
            <button className="btn btn-secondary" onClick={handleReset} style={{ borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <polyline points="3 3 3 8 8 8"/>
              </svg>
              Reset Original Code
            </button>
          </div>

          {/* Interactive Code Viewer Tab Container */}
          <div className="tab-container">
            <div className="tab-header">
              <button 
                className={`tab-btn ${activeTab === 'rich' ? 'active' : ''}`}
                onClick={() => setActiveTab('rich')}
              >
                Copy Guide
              </button>
              <button 
                className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                Raw Source Code
              </button>
            </div>

            {activeTab === 'rich' ? (
              <div className="instructions-card">
                <h4 className="instructions-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  How to use this Signature:
                </h4>
                <ul className="instructions-list">
                  <li><strong>Gmail:</strong> Click the <em>Copy Signature (Rich Text)</em> button, go to Gmail settings &gt; General &gt; Signature, and paste (Ctrl+V) directly into the text box.</li>
                  <li><strong>Outlook / Office 365:</strong> Click <em>Copy Signature (Rich Text)</em>, open Outlook Signature settings, and paste (Ctrl+V) directly.</li>
                  <li><strong>Custom HTML:</strong> Click <em>Copy HTML Code</em> to copy raw inline styled HTML code for apps accepting manual HTML injection.</li>
                </ul>
              </div>
            ) : (
              <div className="code-container">
                <button className="copy-badge" onClick={handleCopyHtmlCode}>Copy</button>
                <div className="code-pre">{signatureHtml}</div>
              </div>
            )}
          </div>
        </section>

        {/* Right Panel: Simulated Email Client Preview */}
        <section className="glass-panel">
          <h2 className="panel-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Live Email Client Preview
          </h2>

          <div className="preview-envelope">
            {/* Fake Email client chrome */}
            <div className="envelope-header">
              <div className="envelope-row">
                <span className="envelope-label">To:</span>
                <span className="envelope-val">recipient@example.com</span>
              </div>
              <div className="envelope-row">
                <span className="envelope-label">Subject:</span>
                <span className="envelope-val" style={{ fontWeight: 600 }}>Official Netlab Corporate Communication</span>
              </div>
            </div>
            
            <div className="envelope-body">
              <div className="email-content-mock">
                <p style={{ marginBottom: '8px' }}>Dear Team,</p>
                <p>Please find the email signature attached below. This signature conforms 100% to our corporate identity and maintains all font layouts, images, and links exactly as designed.</p>
                <br />
                <p>Best regards,</p>
              </div>

              {/* RENDER AREA FOR SIGNATURE */}
              <div className="signature-render-wrap">
                <div 
                  ref={signatureRef}
                  id="signature-render-area"
                  dangerouslySetInnerHTML={{ __html: signatureHtml }} 
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Toast Alert Popups */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" style={{ borderColor: toast.type === 'error' ? '#ef4444' : 'var(--success)' }}>
            {toast.type === 'error' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

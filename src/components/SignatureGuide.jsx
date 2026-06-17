
function SignatureGuide() {
  return (
    <section className="glass-panel guide-panel">
      <h2 className="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Complete Setup & Installation Guide
      </h2>
      
      <div className="guide-steps-grid">
        {/* Step 1 */}
        <div className="guide-step-card">
          <div className="step-badge">1</div>
          <h3>1. Upload to Google Drive</h3>
          <p>
            Upload your professional profile photo to <strong>Google Drive</strong>. 
            We recommend a high-quality, compressed to 200KB or less, square aspect ratio image (JPEG or PNG format).
          </p>
        </div>

        {/* Step 2 */}
        <div className="guide-step-card">
          <div className="step-badge">2</div>
          <h3>2. Make Link Public</h3>
          <p>
            Right-click the image file in Google Drive, click <strong>Share</strong> ➔ <strong>Share</strong>. 
            Under <em>General access</em>, change from <strong>Restricted</strong> to <strong>"Anyone with the link"</strong>. 
            Click <strong>Copy link</strong>.
          </p>
          <div className="guide-alert-mini">
            <strong>Critical:</strong> If access is not set to "Anyone with the link", recipients will see a broken image icon.
          </div>
        </div>

        {/* Step 3 */}
        <div className="guide-step-card">
          <div className="step-badge">3</div>
          <h3>3. Fill Details & Copy</h3>
          <p>
            Fill in your Name, Designation, Phone, Email, and paste the copied Google Drive link into the <strong>Profile Image ID</strong> field above. 
            Verify your signature in the Live Preview and click <strong>Copy Signature (Rich Text)</strong>.
          </p>
        </div>
      </div>

      {/* Step 4: Installation Instructions */}
      <div className="email-config-container">
        <h3 className="config-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Step 4: Add to Your Email Client
        </h3>
        
        <div className="config-grid">
          {/* Outlook Card */}
          <div className="config-card">
            <div className="config-card-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="client-logo" style={{ marginRight: '4px' }}>
                <rect x="2" y="5" width="20" height="14" rx="2" fill="#0078d4" />
                <path d="M2 7l10 6 10-6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="2" y="9" width="8" height="8" rx="1.5" fill="#106ebe" stroke="#ffffff" strokeWidth="1" />
                <text x="4" y="15.5" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="Arial">O</text>
              </svg>
              <h4>Microsoft Outlook</h4>
            </div>
            <ol className="config-list">
              <li>Open <strong>Microsoft Outlook</strong> (Desktop app).</li>
              <li>Go to <strong>File</strong> ➔ <strong>Account Info</strong> ➔ <strong>Mail</strong> ➔ <strong>Compose</strong>.</li>
              <li>Verify that <strong>Compose messages in this format</strong> is set to <strong>HTML</strong>. If it is, proceed.</li>
              <li>Go to <strong>Signature</strong>.</li>
              <li>Click <strong>+ New signature</strong> and give it a name (e.g., <em>Official NTIPL</em>).</li>
              <li>Click inside the signature text editor box.</li>
              <li>Paste the signature from your clipboard (**Ctrl + V** on Windows, **Cmd + V** on Mac).</li>
              <li>Under <strong>Select default signatures</strong>, choose your new signature for:
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', fontSize: '0.85rem' }}>
                  <li><em>New messages</em></li>
                  <li><em>Replies/forwards</em></li>
                </ul>
              </li>
              <li>Click <strong>Save</strong> at the bottom of the page.</li>
            </ol>
          </div>


          {/* Zimbra Card */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="client-logo-zimbra">Z</div>
              <h4>Zimbra Mail</h4>
            </div>
            <ol className="config-list">
              <li>Log in to Zimbra, click the <strong>Preferences</strong> tab at the top.</li>
              <li>Select <strong>Signatures</strong> from the left sidebar and click <strong>Add Signature</strong>.</li>
              <li><strong>Crucial:</strong> Change the dropdown option on the top right of the editor from <strong>"Format as Plain Text"</strong> to <strong>"Format as HTML"</strong>.</li>
              <li>Click inside the editor text area and paste (**Ctrl+V** or **Cmd+V**).</li>
              <li>Set the signature as your default for new messages and replies/forwards, then click <strong>Save</strong>.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignatureGuide

import setupGuidePdf from '../assets/NTIPL_Email_Signature_Setup_Guide.pdf'

function GuideDownload() {
  return (
    <div className="glass-panel download-panel" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div className="download-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <polyline points="9 15 12 18 15 15"/>
          </svg>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem', marginTop: 0 }}>
            Official Setup Guide (PDF)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
            Download the official step-by-step PDF manual to read offline or share with colleagues.
          </p>
        </div>
      </div>
      <a 
        href={setupGuidePdf} 
        download="NTIPL_Email_Signature_Setup_Guide.pdf" 
        className="btn btn-primary"
        style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download PDF Manual
      </a>
    </div>
  )
}

export default GuideDownload

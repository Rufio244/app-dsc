import React, { useState } from 'react';
import axios from 'axios';

export default function DscDashboard() {
  const [rawText, setRawText] = useState('');
  const [docType, setDocType] = useState('PDF');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!rawText.trim()) return alert('Please enter some text or notes.');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/v1/documents/generate', {
        rawText,
        docType
      });
      setResult(res.data.content);
    } catch (err) {
      alert('Error generating document: ' + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DSC-Document.${docType.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif', padding: '24px', background: '#0f172a', color: '#f8fafc', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', background: 'linear-gradient(to right, #60a5fa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px 0' }}>
          APP DSC (Document Summary & Creation)
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>High-Performance AI-Powered Document Intelligence Engine</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px', fontSize: '14px', color: '#cbd5e1' }}>Input Raw Text / Notes / Data:</label>
          <textarea 
            rows="10"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
            placeholder="Paste your notes or unstructured data here..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' }}>Target Format:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['PDF', 'DOCX', 'Markdown'].map((type) => (
                <button
                  key={type}
                  onClick={() => setDocType(type)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                    background: docType === type ? '#2563eb' : '#334155',
                    color: '#fff',
                    transition: 'all 0.2s'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            {loading ? 'Processing with AI...' : 'Summarize & Create Document'}
          </button>
        </div>

        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0, marginBottom: '12px', color: '#cbd5e1' }}>Document Preview</h3>
            <div style={{ background: '#0f172a', border: '1px solid #475569', borderRadius: '8px', padding: '15px', height: '260px', overflowY: 'auto', fontSize: '13px', lineHeight: '1.6', color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
              {result || 'Your generated document summary and preview will appear here...'}
            </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={!result}
            style={{ width: '100%', marginTop: '16px', padding: '12px', background: result ? '#10b981' : '#475569', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: result ? 'pointer' : 'not-allowed' }}
          >
            Download Document
          </button>
        </div>
      </div>
    </div>
  );
}

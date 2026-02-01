// app/global-error.js
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
              ⚠️ Erreur Globale Application
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              {error.message || 'Une erreur inattendue s\'est produite'}
            </p>
            <button 
              onClick={reset}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
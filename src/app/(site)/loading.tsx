import React from 'react';

export default function Loading() {
  return (
    <div
      className="container"
      style={{
        paddingTop: 'var(--space-8)',
        paddingBottom: 'var(--space-16)',
        maxWidth: '1200px',
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading dispatch..."
    >
      {/* Top skeleton indicator */}
      <div
        style={{
          width: '180px',
          height: '24px',
          backgroundColor: 'var(--color-surface-muted)',
          borderRadius: '4px',
          marginBottom: 'var(--space-6)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />

      {/* Main hero grid skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-8)',
        }}
      >
        <div style={{ flex: '1' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: 'var(--color-surface-muted)',
              borderRadius: '4px',
              marginBottom: 'var(--space-4)',
            }}
          />
          <div
            style={{
              width: '75%',
              height: '32px',
              backgroundColor: 'var(--color-surface-muted)',
              borderRadius: '4px',
              marginBottom: 'var(--space-2)',
            }}
          />
          <div
            style={{
              width: '90%',
              height: '20px',
              backgroundColor: 'var(--color-surface-muted)',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                paddingBottom: 'var(--space-4)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--color-surface-muted)',
                  borderRadius: '4px',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: '90%',
                    height: '20px',
                    backgroundColor: 'var(--color-surface-muted)',
                    borderRadius: '4px',
                    marginBottom: 'var(--space-2)',
                  }}
                />
                <div
                  style={{
                    width: '50%',
                    height: '14px',
                    backgroundColor: 'var(--color-surface-muted)',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const providers = [
    { id: 'google', name: 'Google' },
    { id: 'github', name: 'GitHub' },
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sign In</h1>
      {providers.map((provider) => (
        <div key={provider.id} style={{ marginBottom: '20px' }}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              cursor: 'pointer',
            }}
          >
            {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

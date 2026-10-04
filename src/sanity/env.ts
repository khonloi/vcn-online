export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-08-25';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || (process.env.NODE_ENV === 'test' ? 'production' : undefined),
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || (process.env.NODE_ENV === 'test' ? 'test-project-id' : undefined),
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID. Please configure it in your environment or .env.local file.'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    throw new Error(errorMessage);
  }
  return v;
}

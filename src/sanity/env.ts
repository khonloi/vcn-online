export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-08-25';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '42t78ag6';

if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NODE_ENV === 'production' &&
  typeof window === 'undefined'
) {
  // Non-blocking warning during SSR/build so static page collection never crashes
  console.warn(
    '[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID was not detected in environment variables. Using default project ID.'
  );
}

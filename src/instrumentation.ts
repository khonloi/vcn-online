import type { Instrumentation } from 'next';

export async function register() {
  // Server-side initialization hook (e.g. Sentry, OpenTelemetry, Datadog)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Node.js runtime initialization
  }
}

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    message: err instanceof Error ? err.message : String(err),
    name: err instanceof Error ? err.name : 'UnknownError',
    path: request.path,
    method: request.method,
    routerKind: context.routerKind,
    routePath: context.routePath,
    routeType: context.routeType,
  };

  // Structured production-ready logging
  if (process.env.NODE_ENV === 'production') {
    console.error(JSON.stringify({ level: 'error', type: 'request_error', ...errorInfo }));
  } else {
    console.error('[Request Error Caught by Instrumentation]:', errorInfo);
  }
};

import { ErrorBoundary } from './error-boundary';
import { SupportForm } from './support-form';

export function SupportFormIsland() {
  return (
    <ErrorBoundary>
      <SupportForm />
    </ErrorBoundary>
  );
}

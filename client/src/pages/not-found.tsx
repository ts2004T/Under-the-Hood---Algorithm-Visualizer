import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md text-center px-4">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold font-display mb-4">404 Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <a className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}

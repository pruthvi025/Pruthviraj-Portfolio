import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-muted-foreground mb-8">Could not find the requested resource</p>
        <Link 
          href="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

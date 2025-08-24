import { MoviesProvider } from '@/contexts';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MoviesProvider>
      {children}
    </MoviesProvider>
  )
}

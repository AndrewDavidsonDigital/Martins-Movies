import { Fragment } from 'react';
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

import clsx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'

const NAVBAR_ITEMS = [
  {
    title: 'home',
    path: '/',
    href: '/',
  },
  {
    title: 'bio',
    path: '/bio',
    href: '/bio',
  },
  {
    title: 'posts',
    path: '/posts',
    href: '/posts',
  },
]

export default function Navigation({ className = '' }) {
  const { asPath } = useRouter()
  return (
    <Container as="header" className={clsx('my-4 flex', className)}>
      <nav className="mx-auto flex space-x-8">
        {NAVBAR_ITEMS.map(({ href, title }) => (
          <Link
            key={href + title}
            href={href}
            className="nav-button-a"
            {...(asPath === href && { 'aria-current': 'page' })}>
            {title}
          </Link>
        ))}
      </nav>
    </Container>
  )
}

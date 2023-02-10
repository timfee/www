/* eslint-disable @typescript-eslint/ban-types */

import clsx from 'clsx'
import type { ElementType } from 'react'

export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  as?: C
}

type ExtendableProps<ExtendedProps = {}, OverrideProps = {}> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>

type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritableElementProps<C, Props & AsProp<C>>

type ContainerProps<C extends ElementType> = PolymorphicComponentProps<C, Props>

type Props = {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const styles = {
  xs: 'mx-auto px-4 sm:px-6 md:max-w-xl md:px-4 lg:px-2',
  sm: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-2',
  md: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12',
  lg: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-5xl lg:px-8',
}

export function Container<C extends ElementType = 'div'>({
  size = 'sm',
  className,
  as,
  ...props
}: ContainerProps<C>) {
  const Component = as || 'div'
  return <Component className={clsx(styles[size], className)} {...props} />
}

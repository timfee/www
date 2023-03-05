import clsx from "clsx"
import type { ElementType } from "react"

export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  as?: C
}

type ExtendableProps<
  ExtendedProps = unknown,
  OverrideProps = unknown
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

type InheritableElementProps<
  C extends React.ElementType,
  Props = unknown
> = ExtendableProps<PropsOf<C>, Props>

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = unknown
> = InheritableElementProps<C, Props & AsProp<C>>

type ContainerProps<C extends ElementType> = PolymorphicComponentProps<C, Props>

type Props = {
  children: React.ReactNode
  size?: keyof typeof styles
}

const styles = {
  sm: "md:mx-auto mx-4 sm:mx-14 px-4 sm:px-6 max-w-2xl md:px-4 lg:px-2",
}

export default function Container<C extends ElementType = "div">({
  size = "sm",
  className,
  as,
  ...props
}: ContainerProps<C>): JSX.Element {
  const Component = as ?? "div"
  return <Component className={clsx(styles[size], className)} {...props} />
}

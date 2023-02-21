import type { ElementType } from "react"
import clsx from "clsx"

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
  size?: keyof typeof styles
}

const styles = {
  sm: "md:mx-auto mx-14 px-4 sm:px-6 max-w-2xl md:px-4 lg:px-2",
}

export function Container<C extends ElementType = "div">({
  size = "sm",
  className,
  as,
  ...props
}: ContainerProps<C>) {
  const Component = as || "div"
  return <Component className={clsx(styles[size], className)} {...props} />
}

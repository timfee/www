import {
  ComponentType,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react"
import useClosestHeading from "@/hooks/use-closest-heading"
import useDebounce from "@/hooks/use-debounce"
import useIntersectionObserver from "@/hooks/use-intersection-observer"

type PostContextType = {
  headerVisible?: boolean
  closestHeading?: HTMLElement
  articleRef?: React.RefObject<HTMLDivElement>
  breakpointRef?: React.RefObject<HTMLDivElement>
}

const PostContext = createContext<PostContextType>({ headerVisible: true })

function PostContextProvider({ children }: PropsWithChildren) {
  const articleRef = useRef<HTMLDivElement>(null)
  const breakpointRef = useRef<HTMLDivElement>(null)
  const headerObserver = useIntersectionObserver(breakpointRef, {})
  const headerVisible = useDebounce(headerObserver?.isIntersecting ?? true, 50)

  const closestHeading = useClosestHeading({
    articleRef,
  })

  return (
    <PostContext.Provider
      value={{ headerVisible, closestHeading, articleRef, breakpointRef }}>
      {children}
    </PostContext.Provider>
  )
}
export function withPostContext<P>(
  Component: ComponentType<P>
): FC<PropsWithChildren<P>> {
  function WrapperComponent(props: PropsWithChildren<P>) {
    return (
      <PostContextProvider>
        <Component {...props} />
      </PostContextProvider>
    )
  }

  WrapperComponent.displayName = `withPostContext(${
    Component.displayName || Component.name
  })`

  return WrapperComponent
}
export function usePostContext() {
  const context = useContext(PostContext)

  if (!context)
    throw new Error("usePostContext must be used within a PostContextProvider")

  return context
}

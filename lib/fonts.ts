import localFont from "next/font/local"

export const Serif = localFont({
  display: "swap",
  preload: true,
  variable: "--font-serif",
  src: [
    {
      path: "../fonts/serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/serif-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/serif-bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/serif-bold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
})

export const Sans = localFont({
  display: "swap",
  preload: true,
  variable: "--font-sans",
  src: [
    {
      path: "../fonts/sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/sans-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/sans-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/sans-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/sans-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/sans-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/sans-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/sans-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/sans-black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/sans-black-italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
})

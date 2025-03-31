"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { ThemeProvider } from "next-themes"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider enableSystem={false}>

    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
    </ThemeProvider>
  )
}

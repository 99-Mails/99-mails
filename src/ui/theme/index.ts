import { extendTheme } from '@chakra-ui/react'
import { accordionTheme } from './accordion';

export const theme = extendTheme({
  components: { Accordion: accordionTheme },
})

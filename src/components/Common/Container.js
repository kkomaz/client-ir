/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Box } from '@rebass/grid'

const Container = props => (
  <Box
    {...props}
    mx="auto"
    css={{
      maxWidth: '1024px',
      width: '100%',
    }}
  />
)

export default Container

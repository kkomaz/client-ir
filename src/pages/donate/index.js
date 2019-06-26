/** @jsx jsx */
import { css, jsx } from '@emotion/core'

function Donate() {
  return (
    <div
      css={css`
        min-height: 800px;
      `}
    >
      <iframe
        src="https://techrally.me"
        height="100%"
        width="100%"
        title="donation"
        scrolling="no"
      />
    </div>
  )
}

export default Donate

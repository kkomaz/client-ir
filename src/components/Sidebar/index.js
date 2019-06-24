/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  Icon,
  Menu,
  Layout,
} from 'antd';

const {
  Sider,
} = Layout

function IrSidebar() {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      css={css`
        background: inherit;
      `}
    >
      <Menu
        css={css`
          background: inherit;
        `}
        onClick={() => console.log('clicking')}
        defaultSelectedKeys={['1']}
      >
        <Menu.Item
          css={css`
            margin-top: 0 !important;
          `}
          key="1"
        >
          <Icon type="upload" />
          <span>Resize</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="file" />
          <span>My files</span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default IrSidebar

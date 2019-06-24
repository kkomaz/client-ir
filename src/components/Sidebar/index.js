/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  Icon,
  Menu,
  Layout,
} from 'antd';
import useReactRouter from 'use-react-router'

const {
  Sider,
} = Layout

function IrSidebar() {
  const { history } = useReactRouter();

  const onClick = (value) => {
    if (value.key === 'resize') {
      return history.push('/')
    }

    return history.push(`/${value.key}`)
  }

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
        onClick={onClick}
        defaultSelectedKeys={['resize']}
      >
        <Menu.Item
          css={css`
            margin-top: 0 !important;
          `}
          key="resize"
        >
          <Icon type="upload" />
          <span>Resize</span>
        </Menu.Item>
        <Menu.Item key="files">
          <Icon type="file" />
          <span>My files</span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default IrSidebar

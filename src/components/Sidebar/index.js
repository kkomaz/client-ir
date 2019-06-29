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
  const { history, location } = useReactRouter();

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
        defaultSelectedKeys={[
          (location.pathname === '/' || location.pathname === '/resize') ? 'resize' : location.pathname.substr(1)
        ]}
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
        {/*
          <Menu.Item key="premium">
            <Icon type="unlock" />
            <span>EZResize Premium</span>
          </Menu.Item>
        */}
        <Menu.Item key="donate">
          <Icon type="credit-card" />
          <span>Donate</span>
        </Menu.Item>
      </Menu>
      <a
        href="https://www.producthunt.com/posts/debut-3?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-debut-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=142830&theme=light"
          alt="debut - Welcome to a new era of social networking. | Product Hunt Embed"
          style={{ width: '90%', height: 54 }}
        />
      </a>
    </Sider>
  )
}

export default IrSidebar

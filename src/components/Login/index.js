/** @jsx jsx */
import { Component } from 'react'
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import {
  Avatar,
  Button,
  Card,
  Row,
  Col,
  Typography,
} from 'antd'
import Container from 'components/Common/Container'
import EZResize from 'assets/EZResize.png'
import polaroids from 'assets/polaroids.png'
import logo2 from 'assets/logo-2.png'

class Login extends Component {
  state = {
    loadingUser: false,
  }

  static propTypes = {
    loggingIn: PropTypes.bool.isRequired,
  }

  signIn = (e) => {
    const { userSession } = this.props

    if (e) {
      e.preventDefault()
    }
    userSession.redirectToSignIn()
    this.setState({ loadingUser: true })
  }

  render() {
    const { loadingUser } = this.state;
    const { loggingIn } = this.props

    if (loggingIn) {
      return (
        <div>Logging In...</div>
      )
    }

    return (
      <div>
        {
          loadingUser ? <div>Loading...</div> :
          <Container>
            <div
              className="login-blockstack"
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Card
                style={{
                  maxWidth: 700,
                  border: '2px solid #e8e8e8',
                }}
                cover={
                  <img
                    alt="example"
                    src={polaroids}
                  />
                }
              >
                <Row>
                  <Col span={24}>
                    <div
                      css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                      `}
                    >
                      <div
                        css={css`
                          margin-bottom: 2em;
                          text-align: center;
                        `}
                      >
                        <div>
                          <img src={EZResize} alt="logo" />
                          <Avatar src={logo2} alt="logo-2" size={64} />
                        </div>
                        <br />
                        <br />
                        <Typography.Text>
                          Simple, easy, resize tool.  Save locally or in your EZResize Account
                        </Typography.Text>
                      </div>
                      <div
                        css={css`
                          margin-bottom: 1em;
                        `}
                      >
                        <Button variant="contained" type="primary" onClick={this.signIn}>
                          Sign In With Blockstack
                        </Button>
                      </div>
                      <div>
                        <a
                          href="https://landing.debutapp.social"
                          rel="noopener noreferrer"
                          target="_blank"
                          css={css`
                            font-weight: 800;
                          `}
                        >
                          About EZResize
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </Container>
        }
      </div>
    );
  }
}

Login.propTypes = {
  userSession: PropTypes.object.isRequired,
}

export default Login;

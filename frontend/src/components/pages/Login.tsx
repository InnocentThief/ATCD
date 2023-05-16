import {
  Button,
  Card,
  ControlGroup,
  Divider,
  H2,
  H4,
  InputGroup,
  Intent,
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import { CancelablePromise, makeCancelablePromise } from '../../helpers/promise'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  private loginPromise: CancelablePromise<void> | undefined

  state = {
    isPending: false,
    username: '',
    password: '',
  }

  componentWillUnmount(): void {
    if (this.loginPromise) {
      this.loginPromise.cancel()
    }
  }

  render() {
    const {
      account: { currentAccount },
      language: { get },
    } = Context

    return (
      <Container>
        {!currentAccount && (
          <Form>
            <H4>{get('Login.Title')}</H4>
            <H2>
              <p />
            </H2>
            <ControlGroup fill={true} vertical={true}>
              <InputGroup
                leftIcon="person"
                placeholder={get('Login.Username')}
                value={this.state.username}
                onChange={this.updateUsername}
                onKeyPress={this.handleEnter}
              />
              <InputGroup
                leftIcon="lock"
                placeholder={get('Login.Password')}
                value={this.state.password}
                type="password"
                onChange={this.updatePassword}
                onKeyPress={this.handleEnter}
              />
              <H2>
                <p />
              </H2>
              <Button
                icon="log-in"
                text={get('Login.SignIn')}
                intent={Intent.PRIMARY}
                loading={this.state.isPending}
                onClick={this.login}
              />
              <H2>
                <p />
              </H2>
              <a href={`restpassword`}>{get('Login.ForgotPassword')}</a>
              <H2>
                <p />
              </H2>
              <Divider />
              <H2>
                <p />
              </H2>
              <Button
                icon="user"
                text={get('Login.SignUpNewAccount')}
                onClick={this.register}
              />
            </ControlGroup>
          </Form>
        )}
        {currentAccount && (
          <Form>
            <H4>{get('Login.Success')}</H4>
            <H2>
              <p />
            </H2>
            <Link to={{ pathname: '/account' }}>
              <Button
                icon="person"
                text={get('Login.ShowAccount')}
                intent={Intent.PRIMARY}
              />
            </Link>
          </Form>
        )}
      </Container>
    )
  }

  private handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.login()
    }
  }

  private updateUsername = (event: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState({ username: event.target.value })

  private updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState({ password: event.target.value })

  private login = async (): Promise<void> => {
    const { username, password } = this.state
    this.setState({ isPending: true })
    this.loginPromise = makeCancelablePromise(
      Context.auth.login({
        username: username,
        password: password,
      })
    )

    try {
      await this.loginPromise.promise
      this.setState({ isPending: false })
    } catch (error: any) {
      if (!error.isCanceled) {
        this.setState({ isPending: false })
      }
    }
  }

  register = () => {
    window.location.href = '/register'
  }
}

const Container = styled.div`
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 50px auto;
`

const Form = styled(Card)`
  display: grid;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  padding: 32px;
`

export default observer(Login)

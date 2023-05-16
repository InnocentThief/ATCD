import { Card, H5 } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { Link } from 'react-router-dom'

class Authors extends React.Component {
  async componentDidMount() {
    const {
      authors: { fetchAuthors },
    } = Context

    await fetchAuthors()
  }

  render() {
    const {
      authors: { loadedAuthors },
    } = Context

    return (
      <Container>
        {loadedAuthors.length > 0 &&
          loadedAuthors.map(a => (
            <AuthorCard key={a.authorKey}>
              <H5>
                <Link to={{ pathname: `mappers/${a.authorKey}` }}>
                  {a.displayName}
                </Link>
              </H5>
              <div>hallo hallo</div>
            </AuthorCard>
          ))}
      </Container>
    )
  }
}

const Container = styled(Vertical)`
  max-width: 1300px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 15px auto;
`

const AuthorCard = styled(Card)`
    display: grid;
    grid-template-columns: 2fr, 1fr, 1fr, 1fr, 1fr, 1fr
    margin-bottom: 6px;
`

export default observer(Authors)

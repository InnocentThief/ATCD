import { Button, Card, ControlGroup, H5, Icon } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { Link } from 'react-router-dom'
import { Tooltip2 } from '@blueprintjs/popover2'
import { formatDate } from '../../helpers/date'

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
        <AuthorList>
          {loadedAuthors.length > 0 &&
            loadedAuthors.map(a => (
              <AuthorCard key={a.authorKey}>
                <AuthorInfo vertical={true}>
                  <H5>
                    <Link to={{ pathname: `mappers/${a.authorKey}` }}>
                      {a.displayName}
                    </Link>
                  </H5>
                  <AuthorDetails>
                    <AuthorDetail>
                      <Tooltip2
                        content="Total Songs"
                        placement="top"
                        compact={true}
                      >
                        <Icon icon="music" />
                      </Tooltip2>
                      {a.totalSongs}
                    </AuthorDetail>
                    <AuthorDetail>
                      <Tooltip2
                        content="Avg BPM"
                        placement="top"
                        compact={true}
                      >
                        <Icon icon="dashboard" />
                      </Tooltip2>
                      {a.avgBpm}
                    </AuthorDetail>
                    <AuthorDetail>
                      <Tooltip2
                        content="Avg Duration"
                        placement="top"
                        compact={true}
                      >
                        <Icon icon="time" />
                      </Tooltip2>
                      {a.avgDuration}
                    </AuthorDetail>
                    <AuthorDetail>
                      <Tooltip2
                        content="First Song"
                        placement="top"
                        compact={true}
                      >
                        <Icon icon="drawer-left-filled" />
                      </Tooltip2>
                      {formatDate(a.firstPublished)}
                    </AuthorDetail>
                    <AuthorDetail>
                      <Tooltip2
                        content="Last Song"
                        placement="top"
                        compact={true}
                      >
                        <Icon icon="drawer-right-filled" />
                      </Tooltip2>
                      {formatDate(a.lastPublished)}
                    </AuthorDetail>
                  </AuthorDetails>
                </AuthorInfo>
                <AuthorInfo vertical={true}>
                  <Tooltip2
                    content="Generate author playlist"
                    placement="top"
                    compact={true}
                  >
                    <Button
                      minimal={true}
                      icon="list"
                      intent="primary"
                    />
                  </Tooltip2>
                </AuthorInfo>
              </AuthorCard>
            ))}
        </AuthorList>
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

const AuthorList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 6px;
  width: 100%;
`

const AuthorCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 35px;
  padding: 10px;
`

const AuthorInfo = styled(ControlGroup)`
  margin: 0px 6px;
`

const AuthorDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 6px;
  margin-top: 10px;
`

const AuthorDetail = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr;
`

export default observer(Authors)

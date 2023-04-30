import { Button, Card, Checkbox, ControlGroup, Divider, H5, Icon, InputGroup, Intent, Label, MultiSlider, NonIdealState, NonIdealStateIconSize, Spinner, Tag } from '@blueprintjs/core'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { observer } from 'mobx-react'
import { Tooltip2 } from '@blueprintjs/popover2'
import { Link } from 'react-router-dom'
import { ItemRendererProps, MultiSelect2 } from '@blueprintjs/select'
import { DateFormatProps, DateRange, TimePrecision } from "@blueprintjs/datetime";
import { DateRangeInput2 } from "@blueprintjs/datetime2";
import { CancelablePromise, makeCancelablePromise } from '../../helpers/promise'
import { format } from 'date-fns'

interface IState {
    searchText: string;
    published_range: DateRange;
}

class Songs extends React.Component<IState>{
    state: IState = {
        searchText: "",
        published_range: [null, null]
    }

    async componentDidMount() {
        const {
            songs: { fetchSongs }
        } = Context

        await fetchSongs({
            searchText: ""
        })
    }

    componentWillUnmount(): void {
        if (this.searchPromise) {
            this.searchPromise.cancel()
        }
    }

    private searchPromise: CancelablePromise<void> | undefined

    render() {
        const {
            songs: {
                loadedSongs,
                loadingSongs            
            },
            language: { get }
        } = Context

        const nonIdealStateDescription = (
            <div>
                Your search didn't match any songs.
                <br />
                Try searching for something else.
            </div>
        );

        const locales: { [localeCode: string]: Locale } = require("date-fns/locale");
        const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        // const [range, setRange] = React.useState<DateRange>([null, null]);
        // const handleRangeChange = (range: DateRange) => setRange(range);

        function maybeGetLocaleOptions(
            localeCode: string | undefined
          ): { locale: Locale } | undefined {
            if (localeCode == null || locales[localeCode] == null) return undefined;
            return { locale: locales[localeCode] };
          }

        return(
            <Container>
                <NonIdeal>
                    {loadingSongs ? (
                        <NonIdealState>
                            <Spinner />
                            Loading songs...
                        </NonIdealState>
                    ): loadedSongs.length === 0 && (
                        <NonIdealState
                            icon="search"  
                            iconSize={NonIdealStateIconSize.SMALL}
                            title="No search results"
                            description={nonIdealStateDescription}
                        />
                    )}
                </NonIdeal>
                {loadedSongs.length > 0 && (
                    <Ideal>
                        <SearchArea>
                            <ControlGroup>
                                <InputGroup 
                                    leftIcon="search"
                                    placeholder='Song name / Artist / Mapper' 
                                    fill={true}
                                    value={this.state.searchText}
                                    onChange={this.updateSearchText}
                                    onKeyPress={this.handleEnter}
                                />
                                <Button 
                                    text='Search' 
                                    intent={Intent.PRIMARY}
                                    onClick={this.search}
                                    />
                            </ControlGroup>
                                <SearchDetails>
                                    <Label>
                                        Exclude
                                        <MultiSelect2 placeholder='Select one or many' selectedItems={[]} tagRenderer={function (item: unknown): React.ReactNode {
                                            throw new Error('Function not implemented.')
                                        } } items={[]} itemRenderer={function (item: unknown, itemProps: ItemRendererProps<HTMLLIElement>): JSX.Element | null {
                                            throw new Error('Function not implemented.')
                                        } } onItemSelect={function (item: unknown, event?: React.SyntheticEvent<HTMLElement, Event> | undefined): void {
                                            throw new Error('Function not implemented.')
                                        } }                                            
                                        />
                                    </Label>
                                    <Label>
                                        Genre
                                        <MultiSelect2 placeholder='Select one or many' selectedItems={[]} tagRenderer={function (item: unknown): React.ReactNode {
                                            throw new Error('Function not implemented.')
                                        } } items={[]} itemRenderer={function (item: unknown, itemProps: ItemRendererProps<HTMLLIElement>): JSX.Element | null {
                                            throw new Error('Function not implemented.')
                                        } } onItemSelect={function (item: unknown, event?: React.SyntheticEvent<HTMLElement, Event> | undefined): void {
                                            throw new Error('Function not implemented.')
                                        } }                                            
                                        />
                                    </Label>
                                    <Label>
                                        Difficulty
                                        <MultiSelect2 placeholder='Select one or many' selectedItems={[]} tagRenderer={function (item: unknown): React.ReactNode {
                                            throw new Error('Function not implemented.')
                                        } } items={[]} itemRenderer={function (item: unknown, itemProps: ItemRendererProps<HTMLLIElement>): JSX.Element | null {
                                            throw new Error('Function not implemented.')
                                        } } onItemSelect={function (item: unknown, event?: React.SyntheticEvent<HTMLElement, Event> | undefined): void {
                                            throw new Error('Function not implemented.')
                                        } }                                            
                                        />
                                    </Label>
                                    <Label>
                                        Gem Speed
                                        <MultiSlider>
                                            <MultiSlider.Handle
                                                value={3}
                                                type='start'
                                                intentAfter={Intent.PRIMARY}
                                            />
                                            <MultiSlider.Handle
                                                value={8}
                                                type='end'
                                            />
                                        </MultiSlider>
                                    </Label>
                                    <Label>
                                        Published
                                        <DateRangeInput2
                                            formatDate={(date, localeCode) => 
                                                format(date, DATE_FORMAT, maybeGetLocaleOptions(localeCode) )
                                            }
                                            closeOnSelection={false}
                                            value={this.state.published_range}
                                            onChange={this.updateDateRange}
                                        />
                                    </Label>
                                </SearchDetails>
                        </SearchArea>
                        <SongList>
                            {loadedSongs.map(s=> (
                                <SongCard key={s.songKey} elevation={2}>
                                    <SongCardContent>
                                        <SongCardCover>
                                            <img src={s.coverUrl} height={100} width={100} alt='' />
                                        </SongCardCover>
                                        <SongCardSongInfo>
                                            <H5>
                                                <Link to={{ pathname: `songs/${s.songKey}` }}>{s.title} - {s.artist}</Link>
                                            </H5>
                                            <p>Mapped by <Link to={{ pathname: `mappers/${s.authorKey}` }}>{s.author}</Link></p>
                                            <SongCardGenreChoreographyInfo>
                                                <GenreTag round={true}>{s.genre}</GenreTag>
                                                <Divider />
                                                {s.choreographies.map(c => (
                                                    <ChoreographyTag key={c.choreographyKey}>
                                                        {c.choreographyType} ({c.displayName})
                                                    </ChoreographyTag>
                                                ))}
                                            </SongCardGenreChoreographyInfo>
                                        </SongCardSongInfo>
                                        <SongCardAdditionalInfo>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.atr}</SongCardAdditionalInfoValue>
                                                <Icon icon="key" onClick={()=>{}} />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.length}</SongCardAdditionalInfoValue>
                                                <Icon icon="time" />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.avgBpm}</SongCardAdditionalInfoValue>
                                                <Icon icon="dashboard" />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                {s.contentStrike && (
                                                    <Tooltip2 content="Content Strike" placement="top" compact={true}>
                                                        <Icon icon="lightning" color="red" />
                                                    </Tooltip2>
                                                )}
                                                {s.explicit && (
                                                    <Tooltip2 content="Explicit" placement="top" compact={true}>
                                                        <Icon icon="high-priority" color="darkorange" />
                                                    </Tooltip2>
                                                )}
                                                {s.challenge && (
                                                    <Tooltip2 content="Challenge" placement="top" compact={true}>
                                                        <Icon icon="clean" color="gold" />
                                                    </Tooltip2>
                                                )}
                                            </SongCardAdditionalInfoRow>
                                        </SongCardAdditionalInfo>
                                        <SongCardActions>
                                            <Tooltip2 content={get('Songs.Action.CopyAtr')} placement="top" compact={true}>
                                                    <Button minimal={true} icon="duplicate" intent='primary' onClick={() => this.copyATR(s.atr)} />
                                                </Tooltip2>
                                            <Tooltip2 content={get('Songs.Action.Preview')} placement="top" compact={true}>
                                                <Button minimal={true} icon="video" intent='primary' />
                                            </Tooltip2>
                                            <Tooltip2 content={get('Songs.Action.DownloadZip')} placement="top" compact={true}>
                                                <Button minimal={true} icon="download" intent='primary' />
                                            </Tooltip2>
                                        </SongCardActions>
                                    </SongCardContent>
                                </SongCard>
                            ))}
                        </SongList>
                    </Ideal>
                )}
            </Container>
        )
    }

    private copyATR = (atr: string) => {
        navigator.clipboard.writeText(`!atr ${atr}`)
    }

    private handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.search()
        }
    }

    private updateDateRange = ( range: DateRange) =>
        this.setState( { published_range: range })

    private updateSearchText = (event: React.ChangeEvent<HTMLInputElement>): void =>
        this.setState({ searchText: event.target.value})

    private search = async () : Promise<void> => {
        const { searchText } = this.state
        this.searchPromise = makeCancelablePromise (
            Context.songs.fetchSongs({
                searchText: searchText
            })
        )
    }

}

const Container = styled(Vertical)`
    max-width: 1300px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 15px auto;
`

const NonIdeal = styled.div`
    grid-area: nonideal;        
    max-height: 100%;
    display: flex;
    align-items: flex-start;
    gap: 50px;
`

const Ideal = styled.div`
    width: 100%;
`

const SearchArea = styled.div`
    display: grid;
    padding-bottom: 15px;
    width: 100%;
    background: #F6F7F9;
    .bp4-dark & {
       background: #343A42;
    }
    z-index: 9;
`

const SearchDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 0px 10px;
    width: 100%;
    margin-top: 20px;
`

const SongList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 6px;
    width: 100%;
`

const SongCard = styled(Card)`
    padding: 10px;
`

const SongCardContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const SongCardCover = styled.div`
    margin-right: 10px;
`

const SongCardSongInfo = styled.div`
    width: 100%;
`

const SongCardGenreChoreographyInfo = styled.div`
    display: flex;
    flex-direction: row;
`
const GenreTag = styled(Tag)`
    margin-right: 3px;
`

const ChoreographyTag = styled(Tag)`
    margin-left: 3px;
    margin-right: 3px;
`

const SongCardAdditionalInfo = styled.div`
    margin-right: 10px;
    width: 150px;
`

const SongCardAdditionalInfoRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
`

const SongCardAdditionalInfoValue = styled.div`
    margin-right: 10px;
`

const SongCardActions = styled.div`
    width: 30px;
`

export default observer(Songs)
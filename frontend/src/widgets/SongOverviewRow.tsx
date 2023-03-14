import { Button, Card, H5 } from "@blueprintjs/core"
import styled from "styled-components"
import { SongOverviewDto } from "../models/SongOverviewDto"

interface Props {
    item: SongOverviewDto
}

const SongOverviewRow = ({
    item: songItem
}: Props) => {

    return (
        <Card>
            <H5>
                {songItem.title}
            </H5>
            <Button text={`${songItem.title}`} />
        </Card>
    )
}

export default SongOverviewRow
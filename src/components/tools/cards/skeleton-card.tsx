import {FC} from "react";
import Card from "../../ui-kit/cards";
import {Skeleton} from "../skeleton";


export const SkeletonCard: FC = () => {
    return (
        <Card.Wrapper>
            <Card.ImageContainer>
                <Skeleton type={"image_card"}/>
                <Card.ChipContainer>
                    <Card.Chip extra={` min-width: 70px `}><Skeleton type={"text"}/></Card.Chip>
                    <Card.Chip extra={` min-width: 70px `}><Skeleton type={"text"}/></Card.Chip>
                    <Card.Chip extra={` min-width: 70px `}><Skeleton type={"text"}/></Card.Chip>
                </Card.ChipContainer>
            </Card.ImageContainer>
            <Card.Content>
                <Card.Title><Skeleton type={"title"}/></Card.Title>
                <Card.Text><Skeleton type={"text"}/></Card.Text>
                <Card.Text><Skeleton type={"text"}/></Card.Text>
            </Card.Content>
        </Card.Wrapper>
    )
}

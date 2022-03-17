import {FC, MouseEventHandler} from "react";
import Card from "../../ui-kit/cards";
import {Recipe} from "../../../services/api/recipes/types";
import {parseTimeToCard} from "../../../services/card-service";

type BaseCardProps = Omit<Recipe, 'id'> & { onClick?: MouseEventHandler };

export const BaseCard: FC<BaseCardProps> = ({ thumbnail, title, description, caloricity, cookTime, cuisine, onClick }) => {
    return (
        <Card.Wrapper onClick={onClick}>
            <Card.ImageContainer>
                <Card.Image src={thumbnail} alt={title}/>
                <Card.ChipContainer>
                    <Card.Chip>{parseTimeToCard(cookTime)}</Card.Chip>
                    <Card.Chip>{caloricity} kCal</Card.Chip>
                    <Card.Chip>{cuisine.title}</Card.Chip>
                </Card.ChipContainer>
            </Card.ImageContainer>
            <Card.Content>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Content>
        </Card.Wrapper>
    )
}

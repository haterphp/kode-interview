import {Dispatch, FC, SetStateAction} from "react";
import Modal from "react-modal";
import {theme} from "../../../constants/theme";
import * as _ from 'lodash'
import styled from "styled-components";
import CloseButton from "./inc/close-button";
import Typography from "../../ui-kit/typography";
import Control from "../../ui-kit/form";
import {useForm} from "react-hook-form";
import {ModalContent, ModalFooter} from "./inc/component";
import FilterRange from "./tools/filter-range";
import {Button} from "../../ui-kit/buttons";

type FilterModalProps = {
    control: [boolean, Dispatch<SetStateAction<boolean>>],
    formControl: any,
}

const FilterModalStyles = {
    overlay: {
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        inset: "unset",
        minWidth: 440,
        padding: "32px",
        boxShadow: "0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: _.get(theme, 'colors.base1')
    }
}

const CheckboxContainer = styled.div`
  padding: 15px 0;
`

const FilterModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const filtersCuisine = [
    "Caribbean",
    "Greek",
    "French",
    "Indian",
    "Chinese",
];

const FilterModal: FC<FilterModalProps> = ({ control: [open, setOpen], formControl }) => {


    const handlers = {
        close: (e: unknown) => setOpen(false)
    }

    return (
        <Modal
            isOpen={open}
            style={FilterModalStyles}
            onRequestClose={handlers.close}
        >
            <CloseButton onRequestClose={handlers.close} />
            <ModalContent>
                <Typography.H3>Filter</Typography.H3>
                <CheckboxContainer>
                    {
                        filtersCuisine.map((filter) => (
                            <Control.CheckboxControlled key={filter} control={formControl} name={"cuisine"} label={filter} />
                        ))
                    }
                </CheckboxContainer>
                <FilterRange/>
            </ModalContent>
            <FilterModalFooter>
                <Button variant={"outlined"}>Clear</Button>
                <Button variant={"filled"}>Show Recipes</Button>
            </FilterModalFooter>
        </Modal>
    )
}

export default FilterModal;

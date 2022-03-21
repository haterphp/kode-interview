import {Dispatch, FC, SetStateAction, useContext, useEffect} from "react";
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
import {FilterBody} from "../../../services/filter";
import {useEvent} from "../../../hooks/use-event";
import {EVENTS} from "../../../constants/app";
import {FilterContext} from "../layout/context";

type FilterModalProps = {
    control: [boolean, Dispatch<SetStateAction<boolean>>],
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

type FilterModalBody = Omit<FilterBody, 'title'>;

const FilterModal: FC<FilterModalProps> = ({ control: [open, setOpen] }) => {

    const {dispatch} = useEvent();
    const {filters, setSelectedFilters, selectedFilters} = useContext(FilterContext);
    const {control, handleSubmit, reset, formState: {isDirty}, setValue, resetField} = useForm<FilterModalBody>({ defaultValues: { cuisine: selectedFilters } })

    useEffect(() => {
        open && reset({
            cuisine: selectedFilters
        })
    }, [open])

    const handlers = {
        close: (e: unknown) => {
            resetField('cuisine');
            setOpen(false)
        },
        submit: (data: FilterModalBody) => {
            dispatch<FilterModalBody>(EVENTS.FILTER, data);
            setSelectedFilters(data.cuisine);
            setOpen(false);
        },
        clear: (e: unknown) => {
            // e.preventDefault();
            resetField('cuisine');
            setSelectedFilters(filters);
            dispatch<FilterModalBody>(EVENTS.FILTER, { cuisine: filters })
        }
    }

    return (
        <Modal
            isOpen={open}
            style={FilterModalStyles}
            onRequestClose={handlers.close}
        >
            <CloseButton onRequestClose={handlers.close} />
            <Control.Form onSubmit={handleSubmit(handlers.submit)}>
                <ModalContent>
                    <Typography.H3>Filter</Typography.H3>
                    <CheckboxContainer>
                        {
                            filters.map((filter) => (
                                <Control.CheckboxControlled key={filter} control={control} name={"cuisine"} label={filter} />
                            ))
                        }
                    </CheckboxContainer>
                    <FilterRange breakpoints={[ 100, 1200 ]} />
                </ModalContent>
                <FilterModalFooter>
                    { isDirty ? <Button variant={"outlined"} type={"button"} onClick={handlers.clear}>Clear</Button> : <span/>}
                    <Button variant={"filled"}>Show Recipes</Button>
                </FilterModalFooter>
            </Control.Form>
        </Modal>
    )
}

export default FilterModal;

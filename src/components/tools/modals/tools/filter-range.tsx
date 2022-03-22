import {FC, useState} from "react";
import {getTrackBackground, Range} from "react-range";
import styled from "styled-components";
import * as _ from 'lodash';
import {theme} from "../../../../constants/theme";
import Typography from "../../../ui-kit/typography";
import {Controller} from "react-hook-form";

type FilterRangeProps = {
    breakpoints: [number, number];
    control: any;
    name: string;
}

const RangeContainer = styled.div`
  padding-top: 32px;
`

const FilterRange: FC<FilterRangeProps> = ({ breakpoints: [min, max], control, name }) => {

    const handlers = {
        change: (onChange: (...event: any[]) => void) => (values: number[]) => {
            onChange([values[0], values[1]]);
        }
    }

    const basicProps = {
        step: 100,
        min,
        max,
    }

    return (
        <RangeContainer>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (<Range
                        {...basicProps}
                        values={value}
                        onChange={handlers.change(onChange)}
                        renderTrack={({props, children}) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: "36px",
                                    display: "flex",
                                    width: "100%"
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: "3px",
                                        width: "100%",
                                        background: getTrackBackground({
                                            values: value,
                                            colors: [_.get(theme, 'colors.shade20'), _.get(theme, 'colors.shade50'), _.get(theme, 'colors.shade20')],
                                            min,
                                            max
                                        }),
                                        alignSelf: "center"
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({index, props, isDragged}) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '12px',
                                    width: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: _.get(theme, 'colors.shade50'),
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        height: "38px",
                                        position: 'absolute',
                                        top: '-50px',
                                        minWidth: "38px",
                                        color: _.get(theme, 'colors.base1'),
                                        display: "flex",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 4px',
                                        fontSize: '12px',
                                        fontFamily: _.get(theme, 'fonts.footnote.family').join(', '),
                                        borderRadius: '50% 50% 0',
                                        backgroundColor: _.get(theme, 'colors.shade50'),
                                        transform: "rotate(45deg)",
                                    }}
                                >
                                    <div
                                        style={{
                                            transform: "rotate(-45deg)",
                                        }}
                                    >
                                        {value[index]}
                                    </div>
                                </div>
                            </div>
                        )}
                    />)
                }}
            />
            <Typography.Body>Calories, kCal</Typography.Body>
        </RangeContainer>
    )
}

export default FilterRange;

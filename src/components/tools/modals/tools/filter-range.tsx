import {FC, useState} from "react";
import {getTrackBackground, Range} from "react-range";
import styled from "styled-components";
import * as _ from 'lodash';
import {theme} from "../../../../constants/theme";

type FilterRangeProps = {
    breakpoints: [number, number]
}

const RangeContainer = styled.div`
  padding: 32px 0;
`

const FilterRange: FC<FilterRangeProps> = ({ breakpoints: [min, max] }) => {

    const [values, setValue] = useState<number[]>([min, max])

    const handlers = {
        change: (values: number[]) => setValue(values)
    }

    const basicProps = {
        step: 100,
        min,
        max,
        values,
        onChange: handlers.change
    }

    return (
        <RangeContainer>
            <Range
                {...basicProps}
                renderTrack={({ props, children }) => (
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
                                height: "5px",
                                width: "100%",
                                background: getTrackBackground({
                                    values,
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
                renderThumb={({ index, props, isDragged }) => (
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
                                position: 'absolute',
                                top: '-28px',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor: '#548BF4'
                            }}
                        >
                            {values[index].toFixed(1)}
                        </div>
                    </div>
                )}
            />
        </RangeContainer>
    )
}

export default FilterRange;

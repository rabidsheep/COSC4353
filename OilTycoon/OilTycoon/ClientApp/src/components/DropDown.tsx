import { FieldProps } from "formik";
import React, { useState } from "react";
import Select, { components } from "react-select";
import { OptionsType } from "react-select";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps extends FieldProps {
    options: OptionsType<Option>;
    isMulti?: boolean;
    className?: string;
    placeholder?: string;
    maxLength?: number;
    disabled?: boolean;
    onChange?: any;
    onBlur?: any;
    error: any;
    touched: any;
    opt: any;
    inputValue: any;
}

const { ValueContainer, Placeholder, Input } = components;

const CustomValueContainer = ({ children, ...props }: any) => {
    return (
        <ValueContainer {...props}>
            {React.Children.map(children, child =>
                child && child.type !== Placeholder ? child : null
            )}
            <div className="label-wrapper">
                <Placeholder {...props} isFocused={props.isFocused}>
                    {props.selectProps.placeholder}
                </Placeholder>
            </div>
        </ValueContainer>
    );
};

function removeLastWord(str: string) {
    var lastWhiteSpaceIndex = str.lastIndexOf(" ");
    return str.substring(0, lastWhiteSpaceIndex + 1);
}

export const DropDown = ({
    className,
    field,
    form,
    form: {touched, errors},
    disabled,
    options,
    maxLength,
    isMulti = false,
}: CustomSelectProps) => {

    let [focused, setFocus] = useState(false);
    const [input, setInput] = useState("");
    const [selected, setSelected] = React.useState([]);

    const handleChange = (s: any) => {
        setSelected({ ...s });
        setInput((input) => removeLastWord(input) + s.value);
        form.setFieldValue(field.name, (s as Option).value);
    };

    React.useLayoutEffect(() => {
        const inputEl = document.getElementById("state-input");
        if (!inputEl) return;
        // prevent input from being hidden after selecting
        inputEl.style.opacity = "1";
    }, [selected]);

    const onFocus = () => {
        form.setFieldTouched(field.name);
        setFocus(true);
    }

    const onBlur = (selected: any) => {
        setFocus(false);
    }

    const customStyles = {
        // overall menu css
        menu: (provided: any, state: any) => ({
            ...provided,
            width: '100%',
            height: 'auto',
            maxHeight: '200px',
            color: state.selectProps.menuColor,
            textAlign: 'left',
            zIndex: '3',
            borderRadius: '0px 0px 10px 10px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            marginTop: '0px',
        }),

        // css for indiividual dropdown list options
        option: (provided: any, state: any) => ({
            ...provided,
            paddingLeft: '0px',
            paddingRight: '0px',
            textAlign: 'center' as 'center',
            fontFamily: "tahoma",
            fontSize: '18px',
            height: '35px',
        }),

        // message if no options match input
        noOptionsMessage: (provided: any, state: any) => ({
            ...provided,
            padding: '5px 0px',
            width: '100%',
        }),

        // css for dropdown list
        menuList: (provided: any, state: any) => ({
            maxHeight: '200px',
            minHeight: 'auto',
            width: 'calc(100%)',
            marginTop: '0px',
            overflowY: 'scroll' as 'scroll',
            scrollbarWidth: 'none' as 'none',
        }),

        container: (provided: any, state: any) => ({
            fontFamily: 'inherit',
            fontSize: 'inherit',
            transition: "all 0.3s",
            borderBottom:
                errors.state && touched.state ?
                    '1px solid red' :
                    '1px solid gold',
            backgroundColor:
                errors.state && touched.state ?
                    'rgba(203, 173, 173, 0.5)' :
                    'transparent',
        }),

        control: (_: any, { selectProps: { width } }: any) => ({
            height: '30px',
            padding: '1px',
            display: 'table',
            width: '100%',
        }),

        input: (provided: any, state: any) => ({
            //clearing input field css
            transition: 'none',
        }),

        // selected option css
        singleValue: (provided: any, state: any) => {
            const fontFamily = 'tahoma';
            const fontSize = '18px';
            const position = 'absolute' as 'absolute';
            return { position, fontFamily, fontSize };
        },

        // container for selected option/input
        valueContainer: (provided: any, state: any) => ({
            display: 'table-cell',
            verticalAlign: 'middle',
            overflow: 'visible'
        }),

        // dropdown button css
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            padding: 0,
        }),

        // button container css
        indicatorsContainer: (provided: any, state: any) => ({
            ...provided,
            padding: '0',
            height: '100%',
            bottom: '0',
            right: '0',
            position: "absolute",
        }),

        indicatorSeparator: (provided: any, { isDisabled }: any) => ({
            ...provided,
            backgroundColor: 'hsl(0, 0%, 90%)',
            height: '100$'
        }),

        placeholder: (provided: any, state: any) => ({
            fontFamily: "tahoma",
            display: "table-cell",
            verticalAlign: "middle",
            margin: 0,
            color: "black",
            fontSize: (focused) || (input) ? '14px' : '18px',
            top: (focused) || (input) ? '-25px' : '0px',
            left: (focused) || (input) ? '-10px' : '0px',
            /*transform:
                (focused) || (input) ?
                    "scale(0.85) translateY(-35px) translateX(-20px)" :
                    "scale(1) translateY(0) translateX(0)",*/
            transition: "all 0.3s",
            padding: '1px',
        }),
    }

    return (
        <Select
            {...field}
            className={className}
            classNamePrefix="select"
            name={field.name}
            inputId="state-input"
            placeholder="State"
            options={options}
            isMulti={isMulti}
            isDisabled={disabled}
            styles={customStyles}
            inputValue={input}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onInputChange={(value: any, action: any) => {
                if (action.action === "input-change" && value.length <= maxLength!)
                    setInput(value);
                }}
            components={{
                ValueContainer: CustomValueContainer,
                SingleValue: () => null
            }}
        />
    );
};

export default DropDown;

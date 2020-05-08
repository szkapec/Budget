import React,{useMemo} from 'react'
import {InlineButton, RegularButton} from './Button.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Button({primary,variant, children, ...props}) {
    const { to } = props;
    const Component = useMemo(() => { //przekazujemy mu jako argument funkcje ktorej rezultat chcemy przypisac do zmiennej
        switch (variant) {
            case 'inline':
                return InlineButton
            case 'regular':
                return RegularButton
            default:
                return RegularButton
        }
    },[variant]); //kiedy zmieni sie variant dojdzie tylko wtedy do renderingu

    const content = useMemo(() => (
            <Component primary={primary} {...props}>
               {children}
           </Component>
    ),[props,children])
    
    return to? (
        <Link {...props}>
           {content}
        </Link>
    ) : (
        <>
            {content}
        </>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['inline', 'regular'])
}

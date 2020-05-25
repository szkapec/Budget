import React from 'react'
import { createPortal} from 'react-dom';
import {Wrapper, Content, CloseIcon} from './Modal.css';
import { useHistory } from 'react-router-dom';

export default function Modal({children}) {
    const history = useHistory();
    
    const handleClose = e => {
        // to nie potrzebne
        e.stopPropagation()
        history.goBack();
    }
    return createPortal(
        // co chcemy wstrzyknac
        <Wrapper onClick={handleClose}>
            <Content onClick={e=> e.stopPropagation()}>
                <CloseIcon onClick={handleClose}>&times;</CloseIcon>
                {/* to co przekarzemy do tego komponentu  */}
                {children}
            </Content>
        </Wrapper>,
        // ?gdzie wstrzyknac
        document.querySelector('#modal')
    )
}

import styled from 'styled-components';

export const Grid = styled.div`
    display: flex;
    /* //pierwsze dziecko naszego diva */
    section:nth-child(1){ 
        /* 4 jednostki miejsca */
        flex: 4;
    }
    section:nth-child(2){ 
        flex: 8;
}
`
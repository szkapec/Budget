import styled from 'styled-components';
import Wrapper from '../Wrapper/Wrapper';

//dzielenie styli komponentow w styledcomponents
export const NavigationWrapper = styled(Wrapper)`
    display: flex;
    align-content:space-between;
`

export const Container = styled.div`
    background-color: ${props => props.theme.colors.grey.light};
    display: flex;
    padding: ${({theme}) => theme.spacing.sm}px 0;
    justify-content: space-between;
`

export const List = styled.ul`
    display: flex;
`


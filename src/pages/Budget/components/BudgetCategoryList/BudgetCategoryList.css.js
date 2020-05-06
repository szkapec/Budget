import styled from 'styled-components';

export const Category = styled.div`
    border: 1px solid ${({theme})=> theme.colors.grey.dark};
    padding: 3px;
    display: flex;
    justify-content: space-between;
`
export const ParentCategory = styled(Category)`
   background-color: ${({theme})=> theme.colors.grey.normal}
`

export const CategoryItem = styled(Category)`
    background-color: ${({theme})=> theme.colors.grey.light}
`

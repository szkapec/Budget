export const fetchBudget = (id) => {
    const promise = fetch(`${process.env.REACT_APP_URL}/budgets/${id}/?_embed=transactions`)

    return promise;
}

export const fetchBudgetedCategories = (id) => {
    const promise = fetch(`${process.env.REACT_APP_URL}/budgets/${id}/budgetCategories`)

    return promise;
}

export const addTransaction = ({budgetId, data}) => {
    const promise = fetch(
        `${process.env.REACT_APP_URL}/budgets/${budgetId}/transactions`,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    )
    return promise;
}
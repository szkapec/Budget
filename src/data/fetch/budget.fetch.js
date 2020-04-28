export const fetchBudget = (id) => {
    const promise = fetch(`${process.env.REACT_APP_URL}/budgets/${id}/?_embed=transactions`)

    return promise;
}

export const fetchBudgetedCategories = (id) => {
    const promise = fetch(`${process.env.REACT_APP_URL}/budgets/${id}/budgetCategories`)

    return promise;
}
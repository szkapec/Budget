import React, {useMemo} from 'react'
import {  Form ,Field } from 'react-final-form';
import {groupBy} from 'lodash';
const required = value => (value ? undefined : 'Wymagane!')


export default function AddTransactionForm({categories, groupCategoriesBy , onSubmit = () => { }}) {
    console.log(categories)
    const groupCategories = groupCategoriesBy ? groupBy(categories, 'parentCategory.name') : null


    const categoryItem = useMemo(() => groupCategories ? (Object.entries(groupCategories)  //zwroci tablice ktora jest przypisana do konkretnej wartosci(klucza)
        .map(([parentName, categories]) => (
            <optgroup key={parentName} label={parentName}>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </optgroup>
    
        ))
        ) : categories.map(category => (
            <option  key={category.id}  value={category.id}>{category.name}</option>
        )) ,
        [groupCategories, categories]
    );



    return (
        <div>
        <Form
            onSubmit={onSubmit}
            // values posiada wszystkie wartosci wpisane w formularzu
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                
                <form onSubmit={handleSubmit}>
                    <Field name="description" validate={required}>
                        {({ input, meta }) => (
                        <div>
                            <label>Description</label>
                            <input {...input} type="text" placeholder="Description" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                    <Field name="amount" validate={required} parse={value => parseFloat(value,10)}>
                        {({ input, meta }) => (
                        <div>
                            <label>Amountt</label>
                            <input {...input} type="number" step="0.01" min="0"   placeholder="Amount" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}

                    </Field>
                    <Field name="categoryId" validate={required}>
                        {({ input, meta }) => (
                        <div>
                            <label>Cetegory</label>
                            <select {...input}>
                               {categoryItem}
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                    <Field name="date" validate={required}>
                        {({ input, meta }) => (
                        <div>
                            <label>Date</label>
                            <input {...input} type="date" placeholder="Date" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                    </Field>
                <div className="buttons">
                    <button type="submit" disabled={submitting}>
                    Submit
                    </button>
                    {/* Submiting to wszystkie wartosci zapisane w formularzu aa form to wiele metod ktorych można uzyc np wyslanie resetowanie batch blur change itd */}
                    <button type="button" onClick={form.reset} disabled={submitting || pristine}> 
                        Reset
                    </button>
                </div>

                </form>
            )}
            />
                </div>
    )
}

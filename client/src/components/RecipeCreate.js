import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormField from './FormField';
import IngredientField from './IngredientField';
import { createRecipe } from '../actions';

const CATEGORY_OPTIONS = [
  'beef',
  'chicken',
  'dessert',
  'lamb',
  'miscellaneous',
  'pasta',
  'pork',
  'seafood',
  'side',
  'starter',
  'vegan',
  'vegetarian',
  'breakfast',
  'goat'
];

function RecipeCreate({ createRecipe, history, match }) {
  const [formValues, setFormValues] = useState({ name: '', category: '', image: '', ingredients: [{ name: '', quantity: '' }], instructions: '' });

  function handleSubmit(e) {
    e.preventDefault();
    const { name, category, image, ingredients, instructions } = formValues;
    const imageData = new FormData();
    imageData.append('image', image);
    createRecipe({ name, category, imageData, ingredients, instructions,  collection: match.params.id }, history);
    setFormValues({ name: '', category: '', image: '', ingredients: [{ name: '', quantity: '' }], instructions: '' });
  };

  function handleChange(e) {
    setFormValues((formValues) => ({ ...formValues, [e.target.name] : e.target.value }));
  };

  function handleImageChange(e) {
    setFormValues((formValues) => ({ ...formValues, image: e.target.files[0] }))
  };

  function addIngredientField(e) {
    e.preventDefault();
    setFormValues((formValues) => {
      return { ...formValues, ingredients: [...formValues.ingredients, { name: '', quantity: '' }] };
    });
  };

  function handleIngredientChange(e) {
    const updatedIngredients = [...formValues.ingredients];
    updatedIngredients[e.target.dataset.idx][e.target.name] = e.target.value;
    setFormValues({...formValues, ingredients: updatedIngredients });
  };

  function removeIngredientField(idx) {
    const updatedIngredients = formValues.ingredients.filter((ingredient, i) => {
      return i !== idx;
    });
    setFormValues({ ...formValues, ingredients: updatedIngredients });
  };

  return (
    <>
      <h3 className="ui top attached header">Create recipe</h3>
      <div className="ui attached segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <FormField label="Recipe name" name="name" type="text" value={formValues.name} onChange={handleChange}/>
          <FormField label="Category" name="category" type="select" value={formValues.category} onChange={handleChange}>
            <option value=""></option>
            {CATEGORY_OPTIONS.map((category) => {
              return <option key={category} value={category}>{category}</option>
            })}
          </FormField>
          {formValues.ingredients.map((ingredient, i) => {
            return <IngredientField key={i} idx={i} onChange={handleIngredientChange} value={formValues.ingredients[i]} onRemove={removeIngredientField}/>
          })}
          <button className="ui button" onClick={addIngredientField}>Add ingredient</button>
          <FormField label="Instructions" name="instructions" type="textarea" onChange={handleChange} value={formValues.instructions}/>
          <FormField label="Upload Image" name="image" type="file" onChange={handleImageChange}/>
        <button className="ui submit button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default connect(null, { createRecipe })(RecipeCreate);
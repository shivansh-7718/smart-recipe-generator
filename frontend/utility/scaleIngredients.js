// utils/scaleIngredients.js
export function scaleIngredients(ingredients, baseServings, newServings) {
    const factor = newServings / baseServings;
  
    return ingredients.map(item => {
      // extract number at start (e.g. "2 cups flour")
      const match = item.match(/^(\d+(\.\d+)?)(.*)$/);
      if (!match) return item; // no number found
  
      let qty = parseFloat(match[1]);
      const unitAndName = match[3];
  
      // scale quantity
      let newQty = qty * factor;
  
      // round nicely (max 2 decimals)
      if (Number.isInteger(newQty)) {
        newQty = newQty.toString();
      } else {
        newQty = newQty.toFixed(2);
      }
  
      return `${newQty}${unitAndName}`;
    });
  }
  
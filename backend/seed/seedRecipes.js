// backend/seed/seedRecipes.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("../models/Recipe");

dotenv.config();

const recipes = [
  {
    name: "Tomato Onion Sabzi",
    description: "Simple Indian tomato-onion curry",
    ingredients: [{name:"tomato", quantity:"3"}, {name:"onion", quantity:"1"}, {name:"oil", quantity:"2 tbsp"}],
    rawIngredients: ["tomato","onion","oil","salt","turmeric"],
    steps: [
      "Heat oil in a pan over medium heat.",
      "Add finely chopped onions and sauté until golden brown.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric and salt to taste, mix well.",
      "Simmer for 5-7 minutes, stirring occasionally.",
      "Garnish with coriander leaves and serve hot."
    ],
    servings: 2,
    cookTimeMin: 20,
    difficulty: "Easy",
    nutrition: { calories: 180, protein_g: 3, carbs_g: 12, fat_g: 12 },
    dietary: ["vegetarian"],
    cuisine: "Indian",
    imageUrl:"https://i.ytimg.com/vi/C__UDXwC-kM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBoWv5F379x76Yn0cYpUM4XGmKVxQ"
  },
  {
    name: "Masala Omelette (egg optional - skip for veg)",
    description: "Quick masala omelette",
    ingredients: [{name:"egg", quantity:"2"},{name:"onion", quantity:"1"},{name:"tomato", quantity:"1"}],
    rawIngredients: ["egg","onion","tomato","salt","pepper"],
    steps: [
      "Crack eggs into a bowl and whisk thoroughly.",
      "Chop onion and tomato finely and mix with eggs.",
      "Add salt, pepper, and any desired spices.",
      "Heat a non-stick pan and add a little oil.",
      "Pour the egg mixture into the pan evenly.",
      "Cook until the bottom sets, flip carefully, and cook the other side.",
      "Serve hot with toast or as desired."
    ],
    servings: 1,
    cookTimeMin: 10,
    difficulty: "Easy",
    nutrition: { calories: 200, protein_g: 12, carbs_g: 5, fat_g: 15 },
    dietary: [],
    cuisine: "Indian",
    imageUrl:"https://maunikagowardhan.co.uk/wp-content/uploads/2012/09/Masala-Omelette-32.jpg"
  },
  {
    name: "Veg Fried Rice",
    ingredients: [{name:"rice", quantity:"2 cups"},{name:"carrot", quantity:"1"},{name:"peas", quantity:"1/2 cup"},{name:"soy sauce", quantity:"1 tbsp"}],
    rawIngredients: ["rice","carrot","peas","soy sauce","oil","garlic"],
    steps: [
      "Cook rice according to package instructions and let it cool.",
      "Heat oil in a pan and add chopped garlic.",
      "Add chopped carrots and peas, stir-fry for 3-4 minutes.",
      "Add the cooked rice to the pan and mix well.",
      "Pour in soy sauce and season with salt if needed.",
      "Stir everything together until heated through.",
      "Serve hot, optionally garnished with chopped spring onions."
    ],
    servings: 3,
    cookTimeMin: 25,
    difficulty: "Easy",
    nutrition: { calories: 320, protein_g: 8, carbs_g: 60, fat_g: 6 },
    dietary: ["vegetarian"],
    cuisine: "Chinese",
    imageUrl:"https://cookingfromheart.com/wp-content/uploads/2016/02/Veg-Fried-Rice-4-500x500.jpg"
  },
  {
    name: "Paneer Butter Masala",
    ingredients: [{name:"paneer", quantity:"200g"},{name:"tomato", quantity:"3"},{name:"cream", quantity:"2 tbsp"}],
    rawIngredients: ["paneer","tomato","cream","butter","spices"],
    steps: [
      "Chop paneer into cubes and set aside.",
      "Heat butter in a pan and sauté chopped onions until golden.",
      "Add pureed tomatoes and cook until oil separates.",
      "Add spices and mix well.",
      "Add paneer cubes and simmer for 5-7 minutes.",
      "Stir in cream and cook for another 2 minutes.",
      "Serve hot with naan or rice."
    ],
    servings: 3,
    cookTimeMin: 40,
    difficulty: "Medium",
    nutrition: { calories: 450, protein_g: 18, carbs_g: 20, fat_g: 30 },
    dietary: ["vegetarian"],
    cuisine: "Indian",
    imageUrl:"https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2.jpg"
  },
  {
    name: "Chickpea Curry",
    ingredients: [{name:"chickpeas", quantity:"1 cup"},{name:"onion", quantity:"1"},{name:"tomato", quantity:"2"}],
    rawIngredients: ["chickpeas","onion","tomato","garlic","spices"],
    steps: [
      "Soak chickpeas overnight or use canned chickpeas.",
      "Heat oil in a pan and sauté chopped onions until translucent.",
      "Add chopped tomatoes and cook until soft.",
      "Add garlic and spices, cook for 2 minutes.",
      "Add chickpeas and some water, simmer for 20-25 minutes.",
      "Adjust salt and spice levels as needed.",
      "Serve hot with rice or flatbread."
    ],
    servings: 4,
    cookTimeMin: 50,
    difficulty: "Medium",
    nutrition: { calories: 280, protein_g: 12, carbs_g: 40, fat_g: 6 },
    dietary: ["vegan","glutenfree"],
    cuisine: "Indian",
    imageUrl:"https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chickpea-curry-recipe.jpg"
  },
  {
    name: "Aloo Paratha",
    ingredients: [{name:"wheat flour", quantity:"2 cups"},{name:"potato", quantity:"2"},{name:"spices", quantity:"to taste"}],
    rawIngredients: ["wheat flour","potato","salt","oil","ghee"],
    steps: [
      "Boil potatoes until soft, then mash them.",
      "Add spices to the mashed potatoes and mix well.",
      "Make a soft dough using wheat flour and water.",
      "Divide dough into small balls and roll them flat.",
      "Place a portion of potato filling in the center and fold edges.",
      "Roll the stuffed dough into flat circles carefully.",
      "Cook on a hot pan with oil/ghee until golden on both sides."
    ],
    servings: 2,
    cookTimeMin: 30,
    difficulty: "Medium",
    nutrition: { calories: 350, protein_g: 6, carbs_g: 55, fat_g: 10 },
    dietary: ["vegetarian"],
    cuisine: "Indian",
    imageUrl:"https://pipingpotcurry.com/wp-content/uploads/2022/11/Aloo-Paratha-Piping-Pot-Curry.jpg"
  },
  {
    name: "Pasta Pomodoro",
    ingredients: [{name:"pasta", quantity:"200g"},{name:"tomato", quantity:"3"},{name:"garlic", quantity:"2 cloves"}],
    rawIngredients: ["pasta","tomato","garlic","olive oil","basil"],
    steps: [
      "Boil pasta in salted water until al dente, drain and set aside.",
      "Heat olive oil in a pan and sauté chopped garlic.",
      "Add chopped tomatoes and cook until soft.",
      "Season with salt and basil leaves.",
      "Add cooked pasta to the sauce and toss well.",
      "Simmer for 2-3 minutes to combine flavors.",
      "Serve hot with grated cheese if desired."
    ],
    servings: 2,
    cookTimeMin: 25,
    difficulty: "Easy",
    nutrition: { calories: 430, protein_g: 12, carbs_g: 70, fat_g: 8 },
    dietary: ["vegetarian"],
    cuisine: "Italian",
    imageUrl:"https://supermancooks.com/wp-content/uploads/2023/03/pasta-pomodoro-featured.jpg"
  },
  {
    name: "Tomato Soup",
    ingredients: [{name:"tomato", quantity:"4"},{name:"onion", quantity:"1"},{name:"cream", quantity:"1 tbsp"}],
    rawIngredients: ["tomato","onion","cream","salt","pepper"],
    steps: [
      "Chop tomatoes and onions finely.",
      "Heat oil in a pot and sauté onions until soft.",
      "Add tomatoes and cook until mushy.",
      "Blend the mixture until smooth.",
      "Return to pot, add water/stock, and simmer for 10 minutes.",
      "Stir in cream and adjust seasoning.",
      "Serve hot with bread or croutons."
    ],
    servings: 3,
    cookTimeMin: 30,
    difficulty: "Easy",
    nutrition: { calories: 120, protein_g: 2, carbs_g: 10, fat_g: 8 },
    dietary: ["vegetarian","glutenfree"],
    cuisine: "International",
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRBtXvHtJB-zKdO3G_Pw9kiZ9qNeCpm_7EqA&s"
  },
  {
    name: "Vegetable Curry",
    ingredients: [{name:"mixed vegetables", quantity:"2 cups"},{name:"onion", quantity:"1"}],
    rawIngredients: ["mixed vegetables","onion","tomato","garlic","spices"],
    steps: [
      "Chop all vegetables evenly.",
      "Heat oil in a pan and sauté chopped onions and garlic.",
      "Add tomatoes and cook until soft.",
      "Add vegetables and stir well.",
      "Add spices and cook covered until vegetables are tender.",
      "Adjust salt and spice levels.",
      "Serve hot with rice or chapati."
    ],
    servings: 3,
    cookTimeMin: 35,
    difficulty: "Easy",
    nutrition: { calories: 220, protein_g: 6, carbs_g: 30, fat_g: 8 },
    dietary: ["vegetarian","vegan"],
    cuisine: "Indian",
    imageUrl:"https://shwetainthekitchen.com/wp-content/uploads/2023/03/mixed-vegetable-curry.jpg"
  },
  {
    name: "Peanut Butter Sandwich",
    ingredients: [{name:"bread", quantity:"2 slices"},{name:"peanut butter", quantity:"2 tbsp"}],
    rawIngredients: ["bread","peanut butter"],
    steps: [
      "Take two slices of bread.",
      "Spread peanut butter evenly on one slice.",
      "Place the other slice on top.",
      "Press gently to combine.",
      "Cut into halves or triangles.",
      "Serve immediately or pack for later."
    ],
    servings: 1,
    cookTimeMin: 5,
    difficulty: "Easy",
    nutrition: { calories: 300, protein_g: 10, carbs_g: 32, fat_g: 14 },
    dietary: ["vegetarian"],
    cuisine: "International",
    imageUrl:"https://static01.nyt.com/images/2024/09/27/multimedia/AS-Griddled-PBJ-qljg/AS-Griddled-PBJ-qljg-googleFourByThree.jpg"
  },
  {
    name: "Oats Porridge",
    ingredients: [{name:"oats", quantity:"1/2 cup"},{name:"milk", quantity:"1 cup"}],
    rawIngredients: ["oats","milk","honey"],
    steps: [
      "Add oats and milk to a saucepan.",
      "Cook on medium heat while stirring constantly.",
      "Once thickened, add honey or sweetener.",
      "Continue cooking until desired consistency.",
      "Remove from heat and let it cool slightly.",
      "Serve warm in a bowl."
    ],
    servings: 1,
    cookTimeMin: 10,
    difficulty: "Easy",
    nutrition: { calories: 180, protein_g: 6, carbs_g: 28, fat_g: 3 },
    dietary: ["vegetarian"],
    cuisine: "International",
    imageUrl:"https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-04-Porridge%2FIMG_7918_R3"
  },
  {
    name: "Masala Dosa (quick)",
    ingredients: [{name:"dosa batter", quantity:"1 cup"},{name:"potato", quantity:"2"}],
    rawIngredients: ["dosa batter","potato","oil","mustard seeds"],
    steps: [
      "Boil and mash potatoes, add spices to make potato filling.",
      "Heat a non-stick pan and pour a ladle of dosa batter, spreading thin.",
      "Cook until edges lift slightly.",
      "Place potato filling in center of dosa.",
      "Fold dosa over the filling.",
      "Cook another 1-2 minutes until crispy.",
      "Serve hot with chutney or sambar."
    ],
    servings: 2,
    cookTimeMin: 30,
    difficulty: "Medium",
    nutrition: { calories: 220, protein_g: 5, carbs_g: 36, fat_g: 6 },
    dietary: ["vegetarian","glutenfree"],
    cuisine: "Indian",
    imageUrl:"https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg"
  },
  {
    name: "Lentil Soup (Dal)",
    ingredients: [{name:"lentils", quantity:"1 cup"},{name:"turmeric", quantity:"1 tsp"}],
    rawIngredients: ["lentils","turmeric","salt","garlic","onion"],
    steps: [
      "Rinse lentils thoroughly.",
      "Boil lentils with turmeric and water until soft.",
      "Heat oil in a pan, sauté chopped onions and garlic.",
      "Add sautéed mixture to cooked lentils.",
      "Simmer for 5-10 minutes, stirring occasionally.",
      "Adjust salt and spices as needed.",
      "Serve hot with a squeeze of lemon."
    ],
    servings: 4,
    cookTimeMin: 40,
    difficulty: "Easy",
    nutrition: { calories: 210, protein_g: 12, carbs_g: 30, fat_g: 4 },
    dietary: ["vegan","glutenfree"],
    cuisine: "Indian",
    imageUrl:"https://kindcooking.com/wp-content/uploads/2020/09/Depositphotos_186867868_s-2019.jpg"
  },
  {
    name: "Greek Salad",
    ingredients: [{name:"cucumber", quantity:"1"},{name:"tomato", quantity:"2"},{name:"feta", quantity:"50g"}],
    rawIngredients: ["cucumber","tomato","feta","olive oil","olive"],
    steps: [
      "Chop cucumber, tomatoes, and feta into bite-sized pieces.",
      "Mix all ingredients in a large bowl.",
      "Add olives and drizzle olive oil over the salad.",
      "Season with salt and pepper to taste.",
      "Toss gently to combine all flavors.",
      "Serve immediately chilled."
    ],
    servings: 2,
    cookTimeMin: 10,
    difficulty: "Easy",
    nutrition: { calories: 180, protein_g: 6, carbs_g: 8, fat_g: 12 },
    dietary: ["vegetarian","glutenfree"],
    cuisine: "Mediterranean",
    imageUrl:"https://www.thehungrybites.com/wp-content/uploads/2017/07/Authentic-Greek-salad-horiatiki-featured.jpg"
  },
  {
    name: "Vegetable Stir Fry",
    ingredients: [{name:"broccoli", quantity:"1 cup"},{name:"carrot", quantity:"1"},{name:"bell pepper", quantity:"1"}],
    rawIngredients: ["broccoli","carrot","bell pepper","soy sauce","garlic"],
    steps: [
      "Chop all vegetables into thin strips.",
      "Heat oil in a wok or pan.",
      "Add garlic and sauté for 30 seconds.",
      "Add vegetables and stir-fry for 4-5 minutes.",
      "Pour in soy sauce and toss evenly.",
      "Cook for another 1-2 minutes and remove from heat.",
      "Serve immediately with rice or noodles."
    ],
    servings: 2,
    cookTimeMin: 15,
    difficulty: "Easy",
    nutrition: { calories: 150, protein_g: 4, carbs_g: 18, fat_g: 6 },
    dietary: ["vegan"],
    cuisine: "Chinese",
    imageUrl:"https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-SQ.jpg"
  },
  {
    name: "Chana Chaat",
    ingredients: [{name:"chickpeas", quantity:"1 cup"},{name:"onion", quantity:"1"},{name:"tomato", quantity:"1"}],
    rawIngredients: ["chickpeas","onion","tomato","lemon","spices"],
    steps: [
      "Boil chickpeas until tender or use canned chickpeas.",
      "Chop onions and tomatoes finely.",
      "Mix chickpeas with chopped vegetables in a bowl.",
      "Add lemon juice and spices to taste.",
      "Toss everything well to combine.",
      "Serve chilled or at room temperature."
    ],
    servings: 2,
    cookTimeMin: 10,
    difficulty: "Easy",
    nutrition: { calories: 180, protein_g: 8, carbs_g: 30, fat_g: 2 },
    dietary: ["vegan","glutenfree"],
    cuisine: "Indian",
    imageUrl:"https://www.madhuseverydayindian.com/wp-content/uploads/2021/05/chana-chaat-with-yogurt.jpg"
  },
  {
    name: "Simple Salad",
    ingredients: [{name:"lettuce", quantity:"1 cup"},{name:"cucumber", quantity:"1"}],
    rawIngredients: ["lettuce","cucumber","olive oil","salt"],
    steps: [
      "Chop lettuce and cucumber into bite-sized pieces.",
      "Mix in a bowl and drizzle with olive oil.",
      "Season with a pinch of salt.",
      "Toss gently to combine.",
      "Serve immediately as a side dish."
    ],
    servings: 1,
    cookTimeMin: 5,
    difficulty: "Easy",
    nutrition: { calories: 60, protein_g: 1, carbs_g: 6, fat_g: 3 },
    dietary: ["vegan","glutenfree"],
    cuisine: "International",
    imageUrl:"https://www.joyfulhealthyeats.com/wp-content/uploads/2021/01/My-Go-to-Easy-Everyday-Salad-Recipe-web-8.jpg"
  },
  {
    name: "Rajma (Kidney Bean Curry)",
    ingredients: [{name:"kidney beans", quantity:"1 cup"},{name:"onion", quantity:"1"},{name:"tomato", quantity:"2"}],
    rawIngredients: ["kidney beans","onion","tomato","spices"],
    steps: [
      "Soak kidney beans overnight.",
      "Boil beans until soft.",
      "Heat oil in a pan and sauté chopped onions until golden.",
      "Add chopped tomatoes and spices, cook until tomatoes soften.",
      "Add boiled beans and simmer for 20-25 minutes.",
      "Adjust salt and seasoning as required.",
      "Serve hot with rice or roti."
    ],
    servings: 4,
    cookTimeMin: 90,
    difficulty: "Medium",
    nutrition: { calories: 320, protein_g: 15, carbs_g: 45, fat_g: 6 },
    dietary: ["vegetarian"],
    cuisine: "Indian",
    imageUrl:"https://shwetainthekitchen.com/wp-content/uploads/2020/12/Rajma-Masala.jpg"
  },
  {
    name: "Raita",
    ingredients: [{name:"yogurt", quantity:"1 cup"},{name:"cucumber", quantity:"1/2"}],
    rawIngredients: ["yogurt","cucumber","salt","cumin"],
    steps: [
      "Grate or finely chop cucumber.",
      "Mix cucumber with yogurt in a bowl.",
      "Add salt and roasted cumin powder to taste.",
      "Stir everything well.",
      "Chill in fridge if desired before serving.",
      "Serve as a side dish with meals."
    ],
    servings: 2,
    cookTimeMin: 5,
    difficulty: "Easy",
    nutrition: { calories: 90, protein_g: 5, carbs_g: 6, fat_g: 4 },
    dietary: ["vegetarian","glutenfree"],
    cuisine: "Indian",
    imageUrl:"https://veganpunks.com/wp-content/uploads/2021/02/Vegan-raita-6-768x960.jpg"
  }
];


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to Mongo for seeding");
    await Recipe.deleteMany({});
    console.log("Cleared Recipe collection");
    const created = await Recipe.insertMany(recipes);
    console.log(`Inserted ${created.length} recipes`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

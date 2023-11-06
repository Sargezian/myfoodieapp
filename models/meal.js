class Meal {
    constructor(
        id,
        categoryIds,
        name,
        mealtype,
        imageUrl,
        duration,
        ingredients,
        steps,
        rating
    ) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.name = name;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.steps = steps;
        this.duration = duration;
        this.mealtype = mealtype;
        this.rating = rating;
    }
}

export default Meal;


// tilføj description

// mealtype

// nutritional_content

class Meal {
    constructor(
        id,
        categoryIds,
        name,
        description,
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
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.steps = steps;
        this.duration = duration;
        this.mealtype = mealtype;
        this.rating = rating;
    }
}

export default Meal;


// nutritional_content

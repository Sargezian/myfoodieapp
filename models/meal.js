class Meal {
    constructor(
        id,
        categoryIds,
        name,
        affordability,
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
        this.affordability = affordability;
        this.rating = rating;
    }
}

export default Meal;

// tilføj rating

// tilføj description

// mealtype

// nutritional_content

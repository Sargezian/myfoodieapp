class Meal {
    constructor(
        id,
        categoryIds,
        name,
        affordability,
        complexity,
        imageUrl,
        duration,
        ingredients,
        steps,
    ) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.name = name;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.steps = steps;
        this.duration = duration;
        this.complexity = complexity;
        this.affordability = affordability;
    }
}

export default Meal;

// tilføj rating

// tilføj description

// mealtype

// nutritional_content

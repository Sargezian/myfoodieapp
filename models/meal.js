class Meal {
    constructor(
        id,
        categoryIds,
        name,
        description,
        meal_type,
        imageUrl,
        time_estimate,
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
        this.time_estimate = time_estimate;
        this.meal_type = meal_type;
        this.rating = rating;
    }
}

export default Meal;


// nutritional_content = {"calories:500","protein:12"}

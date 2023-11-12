class Meal {
    constructor(
        id,
        categoryIds,
        name,
        description,
        meal_type,
        imageUrl,
        time_estimate,
        nutritional_content,
        ingredients,
        steps,
        rating,
        review
    ) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.steps = steps;
        this.time_estimate = time_estimate;
        this.nutritional_content = nutritional_content;
        this.meal_type = meal_type;
        this.rating = rating;
        this.review = review;
    }
}

export default Meal;


// nutritional_content = {"calories:500","protein:12"}
// review: example 467 reviews



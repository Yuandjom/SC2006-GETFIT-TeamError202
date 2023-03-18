import FoodExercise from "../models/FoodExercise.js";

export const addFood = async (req, res) => {

    try {

    const { userid, date, name, calories, meal, measure, servings } = req.body;

    console.log(meal);

    //create food object (to be saved in the meal array)

    const foodData = {
        name: name, 
        meal: meal,
        calories: calories,
        measure: measure,
        servings: servings,
    }
    
    //add object to the meal array 
    
    //get foodExercise doc
    const createdFoodExercise = await FoodExercise.findOne({userId: userid, date: date});

    let updatedFoodExercise;

    switch (meal) {
        case "breakfast":
            //add meal to the meal array of the doc
            createdFoodExercise.breakfast.push(foodData);

            //update database
            updatedFoodExercise = await FoodExercise.findOneAndUpdate(
                {userId: userid, date: date},
                {breakfast: createdFoodExercise.breakfast},
            )

            break;
        case "lunch":
            //add meal to the meal array of the doc
            createdFoodExercise.lunch.push(foodData);

            //update database
            updatedFoodExercise = await FoodExercise.findOneAndUpdate(
                {userId: userid, date: date},
                {lunch: createdFoodExercise.lunch},
            )

            break;
        case "dinner":
            //add meal to the meal array of the doc
            createdFoodExercise.dinner.push(foodData);

            //update database
            updatedFoodExercise = await FoodExercise.findOneAndUpdate(
                {userId: userid, date: date},
                {dinner: createdFoodExercise.dinner},
            )

            break;
        default:
            break;
    }

    res.status(200).json(updatedFoodExercise);
    } catch (err) {
        console.log("error here");
        res.status(404).json({ message: err.message });
    }
}

export const getFoodExercise = async (req, res) => {

    try {
        const userid = req.query.userid;
        const date = req.query.date;

        console.log(userid);
        console.log(date);

        //get the doc
        const foodExerciseCount = await FoodExercise.find({userId: userid, date: date}).count();

        // if does not exists --> create one 
        if (foodExerciseCount === 0) {
            await FoodExercise.create({
                userId: userid,
                breakfast: [],
                lunch: [],
                dinner: [],
                exercise: [],
                date: date,
            })
        }

        const foodExercise = await FoodExercise.findOne({userId: userid, date: date});

        res.status(200).json(foodExercise);
    } catch (err) {
        console.log("error here");
        res.status(404).json({ message: err.message });
    }
}

export const addExercise = async (req, res) => {

    try {

    const { userid, date, name, calories, duration } = req.body;

    const exerciseData = {
        name: name, 
        calories: calories,
        duration: duration,
    }

    const foodExercise = await FoodExercise.findOne({userId: userid, date: date});

    foodExercise.exercise.push(exerciseData);

    const updatedFoodExercise = await FoodExercise.findOneAndUpdate(
        {userId: userid, date: date},
        {exercise: foodExercise.exercise},
        {new : true}
    )

    res.status(200).json(updatedFoodExercise);
    } catch (err) {
        console.log("error here");
        res.status(404).json({ message: err.message });
    }
}

export const deleteExercise = async (req, res) => {

    try {

        const {userid, date, name, duration} = req.body;
        
        const foodExercise = await FoodExercise.findOne({userId: userid, date: date});

        console.log(name);
        console.log(duration);

        for (let i=0; i<foodExercise.exercise.length; i++) {
            if (foodExercise.exercise[i].name === name && foodExercise.exercise[i].duration === duration) {
                foodExercise.exercise.splice(i, 1);
                break;
            }
        }

        console.log(foodExercise.exercise);

        const updatedFoodExercise = await FoodExercise.findOneAndUpdate(
            {userId: userid, date: date},
            {exercise: foodExercise.exercise},
            {new : true}
        )

        res.status(200).json(updatedFoodExercise);

    } catch (err) {
        console.log("error here");
        res.status(404).json({ message: err.message });
    }


    /*
    const foodExercise = await FoodExercise.updateOne(
        { userId: userid, date: date},
        { $pull : {'exercise':""} }
    )
    */

}
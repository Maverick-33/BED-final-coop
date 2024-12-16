import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from "../middleware/badRequestErrorHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.json(reviews);
});

router.post("/", auth, async (req, res, next) => {
  try {
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = await createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
} catch (error) {
  next(error) 
}
}, badRequestErrorHandler);

 
router.get("/:id", async (req, res, next) => {
  try {
  const { id } = req.params;
  const review = await getReviewById(id);
  console.log(review);
  res.status(200).json(review);
} catch (error) {
  next(error) 
}
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const review = await deleteReviewById(id);
  res.status(200).send({
      message: `Review with id ${id} successfully deleted`,
      review,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

router.put("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const { userId, propertyId, rating, comment } = req.body;
  const review = await updateReviewById(id, { userId, propertyId, rating, comment });
  res.status(200).send({
      review,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

export default router;

import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from "../middleware/badRequestErrorHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const amenities = await getAmenities();
  res.json(amenities);
});

router.post("/", auth, async (req, res, next) => {
  try {
  const { name } = req.body;
  const newAmenity = await createAmenity(name);
  res.status(201).json(newAmenity);
} catch (error) {
  next(error) 
}
}, badRequestErrorHandler);

router.get("/:id", async (req, res, next) => {
  try {
  const { id } = req.params;
  const amenity = await getAmenityById(id);
  res.status(200).json(amenity);
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const amenity = await deleteAmenityById(id);
    res.status(200).send({
      message: `Amenity with id ${id} successfully deleted`,
      amenity,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);


router.put("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const { name } = req.body;
  const amenity = await updateAmenityById(id, name);
  console.log("amenity:", amenity);
    res.status(200).send({
      amenity,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

export default router;

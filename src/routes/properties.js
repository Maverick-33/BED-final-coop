import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from "../middleware/badRequestErrorHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const { location, pricePerNight, amenities } = req.query
  const properties = await getProperties(location, pricePerNight, amenities);
  res.json(properties);
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
    const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error)
  }
}, badRequestErrorHandler);


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    res.status(200).json(property);
  } catch (error) {
    next(error)
  }
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyById(id);
    res.status(200).send({
      message: `Property with id ${id} successfully deleted`,
      property,
    });
  } catch (error) {
    next(error)
  }
}, notFoundErrorHandler);


router.put("/:id", auth, async (req, res, next) => {
  try {
    console.log("reg body:", req.body);
    const { id } = req.params;
    const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
    const property = await updatePropertyById(id, { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating });
    console.log("property:", property);
    res.status(200).send({
      property,
    });
  } catch (error) {
    next(error)
  }
}, notFoundErrorHandler);

export default router;



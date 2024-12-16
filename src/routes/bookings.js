import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from "../middleware/badRequestErrorHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req.query
  const bookings = await getBookings(userId);
  res.json(bookings);
});

router.post("/", auth, async (req, res, next) => {
  try {
  const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
  const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
  res.status(201).json(newBooking);
} catch (error) {
  next(error) 
}
}, badRequestErrorHandler);
 
router.get("/:id", async (req, res, next) => {
  try {
  const { id } = req.params;
  const booking = await getBookingById(id);
  console.log(booking);
  res.status(200).json(booking);
} catch (error) {
  next(error) 
}
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const booking = await deleteBookingById(id);
  res.status(200).send({
      message: `Booking with id ${id} successfully deleted`,
      booking,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

router.put("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
  const booking = await updateBookingById(id, { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus });
  res.status(200).send({
      booking,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

export default router;

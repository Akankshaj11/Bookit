import express, { Request, Response } from "express";
import Experience from "../models/experienceModel";
import { getExperiences, getExperienceById } from "../controllers/experienceController";

const router = express.Router();

// ✅ Get all experiences
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const experiences = await Experience.find();
//     res.json(experiences);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching experiences" });
//   }
// });

// // ✅ Get single experience by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const experience = await Experience.findById(req.params.id);
//     if (!experience)
//       return res.status(404).json({ message: "Experience not found" });
//     res.json(experience);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching experience details" });
//   }
// });


// experienceRoutes.ts
router.get("/", async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});

router.get("/:id", async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) return res.status(404).json({ message: "Not found" });
  res.json(exp);
});



// ✅ Add new experience
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, price, image, location, availableDates, timeSlots } = req.body;

    if (!title || !description || !price || !image || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExperience = new Experience({
      title,
      description,
      price,
      image,
      location,
      availableDates: availableDates || [],
      timeSlots: timeSlots || [],
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating experience" });
  }
});



export default router;

import { Request, Response } from "express";

const experiences = [
  { id: "1", title: "Malpe Beach", location: "Udupi", price: "999", description: "A serene beach with golden sands and calm waters." },
  { id: "2", title: "St. Mary's Island", location: "Udupi", price: "1299", description: "Famous for its unique hexagonal basalt rocks." },
];

export const getExperiences = (req: Request, res: Response) => {
  res.json(experiences);
};

export const getExperienceById = (req: Request, res: Response) => {
  const experience = experiences.find((e) => e.id === req.params.id);
  if (!experience) return res.status(404).json({ message: "Not found" });
  res.json(experience);
};

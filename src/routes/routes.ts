import { Router } from "express";
import LibraryController from "../controllers/library.controller";
import PublisherController from "../controllers/publisher.controller";

const router = Router();
const libraryController = new LibraryController();
const publisherController = new PublisherController();

router.get("/books", libraryController.get);
router.get("/book/:id", libraryController.getById);
router.post("/book", libraryController.post);
router.put("/book/:id", libraryController.put);
router.delete("/book/:id", libraryController.delete);

router.get("/publishers", publisherController.get);
router.get("/publisher/:id", publisherController.getById);
router.post("/publisher", publisherController.post);
router.put("/publisher/:id", publisherController.put);
router.delete("/publisher/:id", publisherController.delete);

export default router;

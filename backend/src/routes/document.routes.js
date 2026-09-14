import express from 'express';
import { handleDocumentCreation } from '../controllers/document.controller.js';

const router = express.Router();

router.post('/generate', handleDocumentCreation);

export default router;

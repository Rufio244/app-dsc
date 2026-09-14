import { summarizeAndFormatText } from '../services/ai.service.js';

export async function handleDocumentCreation(req, res) {
  try {
    const { rawText, docType } = req.body;

    if (!rawText) {
      return res.status(400).json({ success: false, error: 'Raw text input is required.' });
    }

    const formattedDocType = docType || 'PDF';
    const aiResult = await summarizeAndFormatText(rawText, formattedDocType);

    return res.status(200).json({
      success: true,
      documentType: formattedDocType,
      content: aiResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

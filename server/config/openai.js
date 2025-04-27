import dotenv from 'dotenv';
dotenv.config(); // ✅ Must load here first!

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export default openai;
const OpenAI = require('openai');

// @desc    Generate WhatsApp message via OpenAI
// @route   POST /api/ai/whatsapp
// @access  Private
const generateWhatsApp = async (req, res, next) => {
  try {
    const { name, branch, visitDate, budget, mobile, status } = req.body;

    // Use env key or body key
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      // Return a fallback message if no API key
      const fallback = generateFallbackMessage({ name, branch, visitDate, budget });
      return res.status(200).json({ success: true, message: fallback, isAI: false });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Generate a short professional WhatsApp follow-up message for this inquiry.
- Customer Name: ${name}
- Branch: ${branch}
- Visit Date: ${visitDate ? new Date(visitDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'To be scheduled'}
- Budget: ₹${budget ? budget.toLocaleString('en-IN') : 'Not specified'}
- Current Status: ${status || 'New'}

Instructions:
- Mention the customer's name
- Mention the branch
- Mention the visit date if available
- Mention the budget range
- Keep it under 80 words
- Be friendly and professional
- Include a WhatsApp-appropriate greeting
- End with a call to action
- Do NOT include subject lines`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });

    const message = completion.choices[0].message.content.trim();
    res.status(200).json({ success: true, message, isAI: true });
  } catch (error) {
    if (error.status === 401 || error.code === 'invalid_api_key') {
      const fallback = generateFallbackMessage(req.body);
      return res.status(200).json({ success: true, message: fallback, isAI: false });
    }
    next(error);
  }
};

function generateFallbackMessage({ name, branch, visitDate, budget }) {
  const date = visitDate
    ? new Date(visitDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'a convenient time';
  const budgetText = budget ? `₹${Number(budget).toLocaleString('en-IN')}` : 'your budget';

  return `Hi ${name || 'there'}! 👋 Thank you for your inquiry at *${branch || 'our branch'}*. We're excited to help you find the perfect option within ${budgetText}. Your visit is scheduled for *${date}*. Our team will be ready to assist you. Feel free to reach out anytime! 😊`;
}

module.exports = { generateWhatsApp };

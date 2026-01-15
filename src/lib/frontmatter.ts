// Simple browser-compatible frontmatter parser
export function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // No frontmatter, return content as-is
    return { data: {}, content };
  }

  const [, frontmatter, markdownContent] = match;
  const data: Record<string, any> = {};

  // Parse FAQ array first (special handling)
  // Format: faq:\n  - question: "..."\n    answer: "..."
  const faqLines = frontmatter.split('\n');
  const faqItems: Array<{ question: string; answer: string }> = [];
  let inFaqSection = false;
  let currentFaq: { question?: string; answer?: string } | null = null;

  for (let i = 0; i < faqLines.length; i++) {
    const line = faqLines[i];
    const trimmed = line.trim();

    if (trimmed === 'faq:') {
      inFaqSection = true;
      continue;
    }

    if (inFaqSection) {
      // Check if we've moved to a new top-level key (no indentation)
      if (trimmed && !line.startsWith(' ') && !line.startsWith('-') && trimmed.includes(':')) {
        break;
      }

      if (trimmed.startsWith('- question:')) {
        // Save previous FAQ if exists
        if (currentFaq && currentFaq.question && currentFaq.answer) {
          faqItems.push({ question: currentFaq.question, answer: currentFaq.answer });
        }
        // Extract question (handle quoted and unquoted)
        const questionMatch = trimmed.match(/question:\s*(.+)/);
        if (questionMatch) {
          let question = questionMatch[1].trim();
          // Remove quotes
          if ((question.startsWith('"') && question.endsWith('"')) ||
              (question.startsWith("'") && question.endsWith("'"))) {
            question = question.slice(1, -1);
          }
          currentFaq = { question };
        }
      } else if (trimmed.startsWith('answer:')) {
        if (currentFaq) {
          // Extract answer (handle quoted and unquoted)
          const answerMatch = trimmed.match(/answer:\s*(.+)/);
          if (answerMatch) {
            let answer = answerMatch[1].trim();
            // Remove quotes
            if ((answer.startsWith('"') && answer.endsWith('"')) ||
                (answer.startsWith("'") && answer.endsWith("'"))) {
              answer = answer.slice(1, -1);
            }
            currentFaq.answer = answer;
          }
        }
      }
    }
  }

  // Add last FAQ item
  if (currentFaq && currentFaq.question && currentFaq.answer) {
    faqItems.push({ question: currentFaq.question, answer: currentFaq.answer });
  }

  if (faqItems.length > 0) {
    data.faq = faqItems;
  }

  // Simple YAML parser for basic key-value pairs
  const lines = frontmatter.split('\n');
  for (const line of lines) {
    // Skip FAQ lines (already parsed above)
    if (line.trim().startsWith('faq:') || line.trim().startsWith('- question:') || line.trim().startsWith('answer:')) {
      continue;
    }
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();

    // Handle arrays FIRST (before quote removal)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent
        .split(',')
        .map(item => {
          const trimmedItem = item.trim();
          // Remove quotes from array items
          if ((trimmedItem.startsWith('"') && trimmedItem.endsWith('"')) ||
              (trimmedItem.startsWith("'") && trimmedItem.endsWith("'"))) {
            return trimmedItem.slice(1, -1);
          }
          return trimmedItem;
        })
        .filter(Boolean);
      continue; // Skip to next line
    }

    // Remove quotes if present (for non-array values)
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Handle FAQ array (special case)
    if (key === 'faq') {
      // FAQ will be parsed separately below
      continue;
    }
    // Handle boolean values
    else if (value === 'true') {
      data[key] = true;
    } else if (value === 'false') {
      data[key] = false;
    }
    // Handle numbers
    else if (!isNaN(Number(value)) && value !== '') {
      data[key] = Number(value);
    }
    // Default to string
    else {
      data[key] = value;
    }
  }

  return { data, content: markdownContent };
}

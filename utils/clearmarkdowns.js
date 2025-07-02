export function cleanMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1')     // Remove italics
    .replace(/^[-*] /gm, '• ')       // Convert bullets to •
    .replace(/^#{1,6}\s*/gm, '')     // Remove headers like ### or ##
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove inline code
    .replace(/---/g, '')             // Remove horizontal rules
    .trim();
}

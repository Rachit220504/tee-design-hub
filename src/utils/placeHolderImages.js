// This file creates placeholder images when actual images aren't available
// This helps avoid broken image links during development

export const generatePlaceholderImage = (text, bgColor, textColor, width = 500, height = 500) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  // Get the drawing context
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 24px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Wrap text if needed
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    const testWidth = ctx.measureText(testLine).width;
    
    if (testWidth > width - 40) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  // Draw the lines
  const lineHeight = 30;
  const startY = height / 2 - (lines.length * lineHeight) / 2;
  
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * lineHeight);
  });
  
  // Return data URL
  return canvas.toDataURL('image/png');
};

export const getProductImage = (id, title) => {
  // Try to get image from assets folder
  const colors = ['#3a86ff', '#ff006e', '#8338ec', '#fb5607', '#ffbe0b'];
  const colorIndex = parseInt(id.replace(/\D/g, '')) % colors.length;
  
  // Generate placeholder if needed
  return generatePlaceholderImage(
    title || 'Product Image', 
    colors[colorIndex], 
    '#ffffff'
  );
};

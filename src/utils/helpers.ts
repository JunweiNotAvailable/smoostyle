// Constants

export const constants = {
  appName: 'Smoostyle',
  databases: {
    users: 'smoostyle_users',
  }
}

// Functions

export const getRandomString = (length: number) => {
  return Array.from({ length }, () => Math.random() < 0.5 ? Math.random().toString(36).charAt(2) : Math.random().toString(36).charAt(2).toUpperCase()).join('');
}

export const toHex = (color: string) => {
  const [r, g, b, a] = color.match(/\d+(\.\d+)?/g)!.map(Number);
  const rgbHex = [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  const alphaHex = a !== undefined ? Math.round(a * 255).toString(16).padStart(2, '0') : '';
  return `#${rgbHex}${alphaHex}`;
}

export const toKebabCase = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const getParsedStyles = (styles: any) => {
  let { 
    widthUnit, heightUnit, width, height,
    top, left, right, bottom, topUnit, leftUnit, rightUnit, bottomUnit,
    ...parsedStyles 
  } = styles;
  parsedStyles = Object.fromEntries(Object.entries(parsedStyles).map(([key, value]) => [toKebabCase(key), typeof value === 'number' ? `${value}px` : value]));
  parsedStyles.width = widthUnit === 'auto' ? 'auto' : `${width}${widthUnit}`;
  parsedStyles.height = heightUnit === 'auto' ? 'auto' : `${height}${heightUnit}`;
  parsedStyles.top = `${top}${topUnit}`;
  parsedStyles.left = `${left}${leftUnit}`;
  parsedStyles.right = `${right}${rightUnit}`;
  parsedStyles.bottom = `${bottom}${bottomUnit}`;
  parsedStyles['font-weight'] = Number(parsedStyles['font-weight']);
  return parsedStyles;
}
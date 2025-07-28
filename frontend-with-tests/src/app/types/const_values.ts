


const languagesColors: Record<string, string> = {
  'javascript': '#f1e05a',
  'typescript': '#2b7489',
  'html': '#e34c26',
  'css': '#563d7c',
  'python': '#3572a5',
  'java': '#b07219',
  'c': '#555555',
  'c#': '#178600',
  'c++': '#f34b7d',
  'go': '#00add8',
  'php': '#4f5d95',
  'ruby': '#701516',
  'rust': '#dea584',
  'swift': '#ffac45',
  'kotlin': '#f18e33',
  'scala': '#dc322f'
};

const getLanguageColor = (language: string) => {
  let color = languagesColors[language.toLowerCase()];
  if (!color) {
    color = '#000000';
  }
  return color;
}

const styleDotLanguage = (language: string) => {
  return `
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${getLanguageColor(language)};
    margin-right: 4px;
  `
}


export { languagesColors, getLanguageColor, styleDotLanguage }

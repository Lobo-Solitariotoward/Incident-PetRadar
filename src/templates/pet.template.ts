export const generatePetEmailTemplate = (title: string, description: string, mapUrl: string): string => {
  return `
    <h1>${title}</h1>
    <p>${description}</p>
    <img src="${mapUrl}" alt="Map location" />
  `;
};

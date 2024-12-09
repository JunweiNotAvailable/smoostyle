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
// Environment variables
const config = {
  API_URL: process.env.VUE_APP_API_URL,
  API_KEY: process.env.VUE_APP_ACCESS_KEY
}

// AUTH

export const signIn = async (username: string, password: string) => {
  const res = await fetch(`${config.API_URL}/auth/signIn?key=${config.API_KEY}`, { method: 'POST', body: JSON.stringify({ username, password }) });
  if (!res.ok) {
    return { error: await res.json() };
  }
  return await res.json();
}

export const signUp = async (username: string, password: string, email: string) => {
  const res = await fetch(`${config.API_URL}/auth/signUp?key=${config.API_KEY}`, { method: 'POST', body: JSON.stringify({ username, password, email }) });
  if (!res.ok) {
    return { error: await res.json() };
  }
  return await res.json();
}

export const confirmSignUp = async (username: string, confirmationCode: string) => {
  const res = await fetch(`${config.API_URL}/auth/confirmSignUp?key=${config.API_KEY}`, { method: 'POST', body: JSON.stringify({ username, confirmationCode }) });
  if (!res.ok) {
    return { error: await res.json() };
  }
  return await res.json();
}


// DATABASE

export const getItem = async (tableName: string, id: string) => {
  const res = await fetch(`${config.API_URL}/data?tableName=${tableName}&id=${id}&key=${config.API_KEY}`);
  if (!res.ok) {
    return { error: await res.json() };
  }
  return await res.json();
}

export const uploadItem = async (tableName: string, item: any) => {
  const res = await fetch(`${config.API_URL}/data?tableName=${tableName}&key=${config.API_KEY}`, { method: 'POST', body: JSON.stringify({
    item: item
  }) });
  if (!res.ok) {
    return { error: await res.json() };
  }
  return await res.json();
}
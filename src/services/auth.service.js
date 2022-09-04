export const signInHandler = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://apptesting.docsumo.com/api/v1/eevee/login/`,
        {
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

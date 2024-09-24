const password = Math.random();
const config = {
    url: 'https://bookstore.demoqa.com',
    userID_fails: "c46cd683-fce2-4cc4-aba8",
    credentials: {
        userName: 'sveta',
        password: 'Qwerty12*'
      },
      credentials_registration: {
        userName: 'vova',
        password: `Qwerty${password}*`
      }
      
}
export default config;
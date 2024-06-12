import { signIn } from 'next-auth/react'

// declare global {
//   interface Window {
//     Telegram: any
//   }
// }

// interface TelegramResponse {
//   auth_date: number
//   first_name: string
//   hash: string
//   id: number
//   username: string
// }

// const YOUR_BOT_TOKEN = get from telegram
// https://api.telegram.org/botYOUR_BOT_TOKEN/getMe

export const useConnectTelegram = () => {
  // useEffect(() => {
  //   // Load the Telegram Login Widget script
  //   const script = document.createElement('script')
  //   script.src = 'https://telegram.org/js/telegram-widget.js?22'
  //   script.async = true
  //   document.body.appendChild(script)

  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

  const connect = () => {
    signIn('telegram')
    // Telegram login button click handler
    // window.Telegram.Login.auth(
    //   {
    //     bot_id: YOUR_BOT_ID, // Replace with your bot's ID
    //     request_access: true,
    //   },
    //   (user: TelegramResponse) => {
    //     console.log(user.id)
    //     // Handle the authenticated user information
    //     // You can send it to your backend server
    //   },
    // )
  }

  return {
    connect,
  }
}

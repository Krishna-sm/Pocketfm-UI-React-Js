
export const ContactImage = "https://images.unsplash.com/photo-1534536281715-e28d76689b4d"
export const TestImage = "https://djhonz7dexnot.cloudfront.net/89b51c7637b25ebe1d5b4abbb9d4eacada5dc176.jpeg"
export const localstorage_auth ="auth-token"


export const private_route = ['/profile', '/admin']
export const public_route = ['/login']


export const SearchUrl = (url: string) => process.env.NEXT_PUBLIC_BACKEND_URI + url



export const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};



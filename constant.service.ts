import { cookies } from "next/headers"
const cookieStore = cookies()

export const cookieData = (key ="auth-token") => cookieStore.get(key)?.value;

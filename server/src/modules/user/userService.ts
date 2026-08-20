import { create } from "axios"
import prisma from "../../lib/prisma"

export const userService=
{
create:async(name:string,email:string,hashPassword:string)=>
{
    const user =await prisma.user.create({
        data:{
            name,
            email,
            password:hashPassword
        }
    })
    return user
}


}
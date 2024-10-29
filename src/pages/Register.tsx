import { useState } from "react";
import { Link, Form } from "react-router-dom";
import { StatusResponses } from "../types";

import Swal from 'sweetalert2';


export default function Register() {

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const obj = Object.fromEntries(data);

        const sendData = await fetch('http://localhost:3000/users', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST', body: JSON.stringify(obj),
            credentials: "include"
        });
        const res: StatusResponses = await sendData.json()

        if (res.status !== 200) {
            setErrorMessage(res.message as string)
            return
        }

        setErrorMessage('')

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario registrado",
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
                window.location.href = '/'
            }
        });

    }

    return (
        <>

            <main className="grid place-content-center text-white bg-darkOne w-full h-full">

                <div className="flex flex-col w-full mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
                    <div className="text-xl font-bold text-[#6B7280] pb-8 ">Crea una cuenta </div>

                    <Form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="pb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                            <div className="relative text-darkThree"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span>
                                <input type="email" name="email" id="email" className="pl-12 mb-2 bg-gray-50 text-darkThree border focus:border-blue-500 border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" required />
                            </div>
                        </div>
                        <div className="pb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                            <div className="relative text-darkThree"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-asterisk"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M12 8v8"></path><path d="m8.5 14 7-4"></path><path d="m8.5 10 7 4"></path></svg></span>
                                <input type="password" name="password" id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-darkThree border focus:border-blue-500 border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" required minLength={4} autoComplete="new-password" />
                            </div>
                        </div>
                        <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Register</button>

                        {errorMessage && <div className="text-sm font-light text-[#FF0000] ">{errorMessage}</div>}

                        <div className="text-sm font-light text-[#6B7280] ">Ya tienes una cuenta? <Link to={'/'} className="font-medium text-[#4F46E5] hover:underline">Log In</Link>
                        </div>
                    </Form>
                </div>

            </main>

        </>
    )
}
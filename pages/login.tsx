import { getProviders, signIn } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'

export const Login = ({ providers }: any) => {
  return (
    <div className='w-full flex min-h-screen flex-col items-center justify-center bg-black text-white gap-6'>
      <Image src="/logo.png" width="150" height="150" alt={''} />
      {Object.values(providers).map((provider: any) => (
        <div className='flex flex-col gap-4' key={provider.id}>
          <button>Login with {provider.name}</button>
          <button className='p-4 bg-green-500 rounded-3xl' onClick={() => signIn(provider.id, { callbackUrl: "/" })}>Sign In</button>
        </div>
      ))}
      <button></button>
    </div>
  )
}

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    }
  }
}
import NotFoundImage from '../assets/not-found.svg'; 

function NotFound () {
  return (
    <>
      <div className='flex-col justify-center h-full'>
        <p className="text-center text-3xl font-bold">404: Staring Into the Abyss</p>
        <img src={NotFoundImage} alt='NotFound' className='size-96 m-auto mt-10 mb-10' />
        <p className="text-center text-lg">You’ve wandered too far and are now gazing into the void... and guess what? The void is awkwardly staring back. 👀</p>
        <p className="text-center text-lg">This page doesn’t exist, but if you listen closely, you might hear the whispers of lost URLs floating through the digital abyss. 🌌</p>
        <p className="text-center text-lg">Try going back before the void starts asking you existential questions. 🚪💨</p>
      </div>
    </>
  )
}

export default NotFound

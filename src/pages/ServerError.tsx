import ServerErrorImage from '../assets/server-error.svg';

function ServerError() {
  return (
    <>
      <div className='flex-col justify-center h-full'>
        <p className="text-center text-3xl font-bold">500: Smashing Bugs... Literally 🛠️🐛</p>
        <img src={ServerErrorImage} alt='ServerError' className='size-96 m-auto mt-10 mb-10' />
        <p className="text-center text-lg">Uh-oh! Something went wrong, but don’t worry—our top engineer is on it! 🔨😤</p>
        <p className="text-center text-lg">Unfortunately, his debugging technique involves a comically large hammer. Results may vary. 🤷‍♂️💥</p>
        <p className="text-center text-lg">In the meantime, try refreshing, coming back later, or sending us a tiny hammer emoji to show your support. 🔨❤️ </p>
      </div>
    </>
  )
}

export default ServerError

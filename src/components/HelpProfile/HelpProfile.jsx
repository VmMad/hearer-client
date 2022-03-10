


const HelpProfile = ({ user }) => {

   const { _id, email, username, contacts, studies, specialties, image } = user

   return (
      <>
         <img src={image} className="profileImg" />
         <h1>{username}</h1>
         <p>{email}</p>
         <p>{studies}</p>
         <p>{specialties}</p>
      </>


   )
}

export default HelpProfile



const HelpProfile = ({ user }) => {

   const { _id, email, username, contacts, studies, specialities, image } = user

   return (
      <>
         <div className="profileData">
            <h1>{username}</h1>
            <p>{email}</p>
            <p>{studies}</p>
            <p>{specialities}</p>
         </div>
      </>


   )
}

export default HelpProfile
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import tw from "tailwind-styled-components";
import Map from "./component/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

const NavbarWrapper = tw.div`
  flex justify-between p-2 bg-gray-800 text-white
`;

const NavbarLinks = tw.div`
  flex gap-2
`;

const NavbarLink = tw.a`
  cursor-pointer p-18
`;

const Footer = tw.footer`
  bg-gray-800 text-white p-4 text-center
`;

const FooterLink = tw.a`
  text-gray-300 hover:text-white mx-2 cursor-pointer
`;

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photourl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Pass an empty dependency array

  return (
    <>
      <Head>
        {/* Add your head content here */}
      </Head>

      <NavbarWrapper>
        <Link href="/login">
          <NavbarLink><b>RideRelay</b></NavbarLink>
        </Link>
        
        {/* ... existing code ... */}
        
        <Link href="/search">
          <NavbarLink>Ride</NavbarLink>
        </Link>
        
        <Link href="/reserve">
          <NavbarLink>Reserve</NavbarLink>
        </Link>

        <Link href="/login">
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photourl} onClick={() => signOut(auth)} />
          </Profile>
        </Link>
      </NavbarWrapper>

      <Wrapper>
        <div style={{ position: "relative" }}>
          <Image
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_2328,h_1416/v1613521692/assets/d9/ce6c00-32b0-4b93-9f0d-6f927d93da08/original/Rider_Home_bg_desktop2x.png"
            alt="Rider getting into car"
            role="presentation"
            aria-hidden="true"
            className="css-iYaXgS"
            width={1900}
            height={500}
          />
          <h1
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "80px", // Adjust the font size as needed
            }}
          >
            Moving around the world with  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RideRelay
          </h1>
        </div>
      </Wrapper>

      {/* ... existing code ... */}
      
      {/* {ActionButtons} */}
      <ActionButtons>
        <Link href="/search">
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
            Ride
          </ActionButton>
        </Link>

        <Link href="/search">
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Wheels
          </ActionButton>
        </Link>

        <Link href="/search">
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve
          </ActionButton>
        </Link>
      </ActionButtons>
	  
      {/* {InputButton} */}
      <InputButton>Where To?</InputButton>


      <Footer>
        <div>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </div>
        <div>
          &copy; {new Date().getFullYear()} RideRelay. All rights reserved.
        </div>
      </Footer>
    </>
  );
};

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const ActionItems = tw.div`
  flex-1 p-4
`;

const Header = tw.div`
  flex justify-between items-center
`;

const Profile = tw.div`
  flex items-center
`;

const Name = tw.div`
  mr-4 w-20 
`;

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer
`;

const ActionButtons = tw.div`
  flex 
`;

const ActionButton = tw.div`
  flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl cursor-pointer
`;

const ActionButtonImage = tw.img`
  h-3/5
`;

const InputButton = tw.div`
  h-15 bg-gray-200 text-xl p-4 flex items-center mt-8 mb-4
`;

export default Home;

import { useRouter } from "next/router";
import Image from "next/image";
import playersData from "../../source.json"; 
import '../../app/globals.css';

interface Player {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  city: string;
  country: string;
  position: string;
  avatar: string;
}

interface PlayerDetailProps {
  player: Player;
}

const PlayerDetail = ({ player }: PlayerDetailProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); 
  };

  if (!player) {
    return <p>Player tidak terdaftar</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-white flex items-center p-4 shadow-lg rounded-2xl w-180 h-60 m-4">
        <div className="profile mx-auto rounded-full mr-4">
          <Image
            src={player.avatar}
            alt={`${player.firstName} ${player.lastName}`}
            width={108}
            height={108}
            className="rectangle-icon rounded-lg"
          />
        </div>
        <div className="text-left flex-grow">
          <h2 className="text-lg font-semibold">
            {player.firstName} {player.lastName}
          </h2>
          <p className="text-gray-600" style={{ textTransform: "capitalize" }}>
            {player.position}
          </p>
          <div className="mt-2">
            <p className="text-gray-700">City : {player.city}</p>
            <p className="text-gray-700">Country : {player.country}</p>
            <p className="text-gray-700">Phone : {player.phoneNumber}</p>
            <p className="text-gray-700">Email : {player.email}</p>
          </div>
          <div className="mt-5 w-42">
            <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = playersData.map((player) => ({
    params: { username: player.username.toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const player = playersData.find((p) => p.username === username.toLowerCase());

  return {
    props: {
      player,
    },
  };
}

export default PlayerDetail;
